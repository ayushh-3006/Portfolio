import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Enquiry, EnquiryStore, NewEnquiry } from "./types";

/**
 * Local JSON-file store.
 *
 * Exists so the whole flow — submit a form, see it appear in the admin panel —
 * works on a fresh clone with zero signups and zero configuration. That makes
 * the feature testable today and keeps the Supabase credentials off the
 * critical path during development.
 *
 * Not for production: serverless filesystems are ephemeral, so anything written
 * here on a deployed host disappears. `getStore()` only selects this when no
 * database is configured, and warns loudly when that happens outside dev.
 */
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

async function readAll(): Promise<Enquiry[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Enquiry[]) : [];
  } catch {
    // Missing or unreadable file simply means "no enquiries yet".
    return [];
  }
}

async function writeAll(enquiries: Enquiry[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(enquiries, null, 2), "utf8");
}

export const fileStore: EnquiryStore = {
  name: "local file (.data/enquiries.json)",

  async create(input: NewEnquiry): Promise<Enquiry> {
    const enquiry: Enquiry = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    const all = await readAll();
    all.unshift(enquiry);
    await writeAll(all);
    return enquiry;
  },

  async list(): Promise<Enquiry[]> {
    const all = await readAll();
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async setRead(id: string, read: boolean): Promise<void> {
    const all = await readAll();
    const match = all.find((item) => item.id === id);
    if (!match) return;
    match.read = read;
    await writeAll(all);
  },

  async remove(id: string): Promise<void> {
    const all = await readAll();
    await writeAll(all.filter((item) => item.id !== id));
  },
};
