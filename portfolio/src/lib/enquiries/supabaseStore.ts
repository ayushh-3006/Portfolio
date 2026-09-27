import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Enquiry, EnquiryStore, NewEnquiry } from "./types";

/**
 * Supabase (Postgres) store — the production backend.
 *
 * Uses the service-role key, which bypasses row-level security. That is correct
 * here and only here: this module is server-only, the key never reaches the
 * browser, and the table's RLS policy denies all public access so a leaked anon
 * key can't read anyone's enquiries. See `supabase/schema.sql`.
 */
const TABLE = "enquiries";

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  budget: string | null;
  timeline: string | null;
  locale: string;
  read: boolean;
};

function toEnquiry(row: Row): Enquiry {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    message: row.message,
    budget: row.budget,
    timeline: row.timeline,
    locale: row.locale,
    read: row.read,
  };
}

export function createSupabaseStore(
  url: string,
  serviceKey: string,
): EnquiryStore {
  const client: SupabaseClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return {
    name: "Supabase",

    async create(input: NewEnquiry): Promise<Enquiry> {
      const { data, error } = await client
        .from(TABLE)
        .insert({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          message: input.message,
          budget: input.budget,
          timeline: input.timeline,
          locale: input.locale,
        })
        .select()
        .single();

      if (error) throw new Error(`Supabase insert failed: ${error.message}`);
      return toEnquiry(data as Row);
    },

    async list(): Promise<Enquiry[]> {
      const { data, error } = await client
        .from(TABLE)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) throw new Error(`Supabase select failed: ${error.message}`);
      return (data as Row[]).map(toEnquiry);
    },

    async setRead(id: string, read: boolean): Promise<void> {
      const { error } = await client.from(TABLE).update({ read }).eq("id", id);
      if (error) throw new Error(`Supabase update failed: ${error.message}`);
    },

    async remove(id: string): Promise<void> {
      const { error } = await client.from(TABLE).delete().eq("id", id);
      if (error) throw new Error(`Supabase delete failed: ${error.message}`);
    },
  };
}
