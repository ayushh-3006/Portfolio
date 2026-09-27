export type Enquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  budget: string | null;
  timeline: string | null;
  /** Which language the visitor was reading when they submitted. */
  locale: string;
  read: boolean;
};

export type NewEnquiry = Omit<Enquiry, "id" | "createdAt" | "read">;

/**
 * Storage contract.
 *
 * Both the hosted (Supabase) and local (JSON file) implementations satisfy this,
 * so the API route and the admin panel never know or care which one is running.
 * Swapping to a different free-tier database later means writing one new file.
 */
export interface EnquiryStore {
  readonly name: string;
  create(enquiry: NewEnquiry): Promise<Enquiry>;
  list(): Promise<Enquiry[]>;
  setRead(id: string, read: boolean): Promise<void>;
  remove(id: string): Promise<void>;
}
