import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin session handling.
 *
 * Deliberately dependency-free: a signed cookie is the whole requirement here,
 * and an auth library would add a large surface for a single-user panel.
 *
 * Design notes:
 * - The password is never stored in this repo. It comes from ADMIN_PASSWORD,
 *   which you set yourself in `.env.local` and in your host's environment.
 * - The cookie holds an expiry plus an HMAC of it, signed with ADMIN_SECRET.
 *   It carries no secret, so reading it tells an attacker nothing, and it
 *   cannot be forged without the secret.
 * - Comparisons use timingSafeEqual so a wrong password can't be discovered a
 *   character at a time by measuring response times.
 */

const COOKIE_NAME = "ayush_admin";
const SESSION_HOURS = 12;

function getSecret(): string | null {
  const secret = process.env.ADMIN_SECRET;
  // A short secret is worse than none, because it looks like security.
  if (!secret || secret.length < 16) return null;
  return secret;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Constant-time string compare that tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    // Still burn a comparison so length alone isn't a timing oracle.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export type AdminConfigState =
  | { ok: true; reason?: never }
  | { ok: false; reason: "no-password" | "no-secret" };

/** Whether the admin panel is usable at all. Surfaced as setup instructions. */
export function getAdminConfigState(): AdminConfigState {
  if (!process.env.ADMIN_PASSWORD) return { ok: false, reason: "no-password" };
  if (!getSecret()) return { ok: false, reason: "no-secret" };
  return { ok: true };
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export async function createSession(): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;

  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  // A nonce makes each session token unique even within the same millisecond.
  const payload = `${expiresAt}.${randomBytes(12).toString("hex")}`;
  const value = `${payload}.${sign(payload, secret)}`;

  const jar = await cookies();
  jar.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
  return true;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;

  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const parts = raw.split(".");
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  const payload = `${expiresAt}.${nonce}`;
  if (!safeEqual(signature, sign(payload, secret))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && Date.now() < expiry;
}

/**
 * In-memory throttle on failed logins.
 *
 * Resets when the server restarts, which is fine — it exists to make online
 * password guessing impractical, not to be an audit log.
 */
const attempts = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function registerFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
    return;
  }
  entry.count += 1;
}

export function isRateLimited(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
