import { fileStore } from "./fileStore";
import { createSupabaseStore } from "./supabaseStore";
import type { EnquiryStore } from "./types";

/**
 * Picks the storage backend from the environment.
 *
 * Supabase when credentials exist, local JSON file otherwise. Nothing else in
 * the app branches on this — the API route and the admin panel both just call
 * `getStore()`.
 */
let cached: EnquiryStore | null = null;

export function getStore(): EnquiryStore {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    cached = createSupabaseStore(url, serviceKey);
  } else {
    if (process.env.NODE_ENV === "production") {
      // Loud, because on a serverless host this silently loses every enquiry.
      console.warn(
        "[enquiries] No SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY set. " +
          "Falling back to the local file store, which does NOT persist on " +
          "serverless hosting. Configure Supabase before taking real enquiries.",
      );
    }
    cached = fileStore;
  }

  return cached;
}

/** True when a real database is configured. Surfaced in the admin panel. */
export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export type { Enquiry, NewEnquiry } from "./types";
