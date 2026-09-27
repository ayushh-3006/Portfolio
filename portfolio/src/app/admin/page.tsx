import type { Metadata } from "next";
import { getAdminConfigState, isAuthenticated } from "@/lib/adminAuth";
import { getStore, isDatabaseConfigured } from "@/lib/enquiries/store";
import { logout } from "./actions";
import { AdminLogin } from "./AdminLogin";
import { EnquiryList } from "./EnquiryList";

export const metadata: Metadata = {
  title: "Enquiries",
  // Never let this page into an index, even by accident.
  robots: { index: false, follow: false, nocache: true },
};

/** Always render fresh — a cached admin page would show stale enquiries. */
export const dynamic = "force-dynamic";

function SetupNotice({ reason }: { reason: "no-password" | "no-secret" }) {
  const missing = reason === "no-password" ? "ADMIN_PASSWORD" : "ADMIN_SECRET";

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-20">
      <p className="text-faint font-mono text-[11px] tracking-[0.2em] uppercase">
        Setup required
      </p>
      <h1 className="mt-4 text-[1.75rem] font-medium tracking-tight">
        The admin panel isn&rsquo;t configured yet.
      </h1>
      <p className="text-muted mt-4 leading-relaxed">
        <code className="text-ink">{missing}</code> is missing from the server
        environment. Add both values to <code>.env.local</code> (and to your
        host&rsquo;s environment variables when you deploy), then restart.
      </p>

      <pre className="border-hairline bg-surface text-muted mt-6 overflow-x-auto rounded-xl border p-4 font-mono text-[12px] leading-relaxed">
        {`ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=<32+ random characters>`}
      </pre>

      <p className="text-faint mt-4 text-[13px]">
        Generate a secret with{" "}
        <code className="text-muted">openssl rand -hex 32</code>. Choose the
        password yourself — it is never stored in the repository.
      </p>
    </div>
  );
}

export default async function AdminPage() {
  const config = getAdminConfigState();
  if (!config.ok) return <SetupNotice reason={config.reason} />;

  if (!(await isAuthenticated())) return <AdminLogin />;

  const enquiries = await getStore().list();
  const usingDatabase = isDatabaseConfigured();
  const unread = enquiries.filter((item) => !item.read).length;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <header className="mb-10 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-faint font-mono text-[11px] tracking-[0.2em] uppercase">
            Admin
          </p>
          <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight">
            Enquiries
          </h1>
          <p className="text-muted mt-2 text-[14px]">
            {enquiries.length} total
            {unread > 0 && ` · ${unread} unread`}
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="border-hairline text-muted hover:text-ink rounded-full border px-4 py-2 text-[13px] transition-colors"
          >
            Sign out
          </button>
        </form>
      </header>

      {!usingDatabase && (
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-5 py-4">
          <p className="text-[14px] font-medium text-amber-300">
            Using local file storage
          </p>
          <p className="text-muted mt-1.5 text-[13px] leading-relaxed">
            Enquiries are being written to <code>.data/enquiries.json</code> on
            this machine. That works for testing, but serverless hosting wipes
            the filesystem — set <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> before taking real enquiries.
          </p>
        </div>
      )}

      <EnquiryList enquiries={enquiries} />
    </div>
  );
}
