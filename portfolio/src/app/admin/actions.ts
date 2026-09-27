"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {
  clearAttempts,
  createSession,
  destroySession,
  isAuthenticated,
  isRateLimited,
  registerFailedAttempt,
  verifyPassword,
} from "@/lib/adminAuth";
import { getStore } from "@/lib/enquiries/store";

export type LoginState = { error?: string };

async function clientKey(): Promise<string> {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const key = await clientKey();

  if (isRateLimited(key)) {
    return { error: "Too many attempts. Wait 15 minutes and try again." };
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    registerFailedAttempt(key);
    // Same message regardless of cause: never confirm which part was wrong.
    return { error: "Incorrect password." };
  }

  const created = await createSession();
  if (!created) {
    return { error: "ADMIN_SECRET is not set on the server." };
  }

  clearAttempts(key);
  revalidatePath("/admin");
  return {};
}

export async function logout(): Promise<void> {
  await destroySession();
  revalidatePath("/admin");
}

/**
 * Every mutation re-checks the session itself.
 *
 * Server actions are individually addressable endpoints — a caller can invoke
 * one directly without ever rendering the page. Guarding only the page would
 * leave these wide open.
 */
export async function markRead(id: string, read: boolean): Promise<void> {
  if (!(await isAuthenticated())) return;
  await getStore().setRead(id, read);
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (!(await isAuthenticated())) return;
  await getStore().remove(id);
  revalidatePath("/admin");
}
