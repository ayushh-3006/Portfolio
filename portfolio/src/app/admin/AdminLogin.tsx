"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

/**
 * Password gate.
 *
 * The password is never in this repo — it comes from ADMIN_PASSWORD in the
 * server environment, which you set. Failed attempts are throttled server-side.
 */
export function AdminLogin() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-faint font-mono text-[11px] tracking-[0.2em] uppercase">
          Admin
        </p>
        <h1 className="mt-4 text-[1.75rem] font-medium tracking-tight">
          Enquiries
        </h1>
        <p className="text-muted mt-2 text-[14px]">
          Enter your admin password to continue.
        </p>

        <form action={formAction} className="mt-8">
          <label
            htmlFor="admin-password"
            className="text-muted mb-2 block text-[13px] font-medium"
          >
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            aria-describedby={state.error ? "admin-error" : undefined}
            className="border-hairline bg-surface text-ink focus:border-accent w-full rounded-xl border px-4 py-3.5 text-[15px] transition-colors focus:outline-none"
          />

          {state.error && (
            <p
              id="admin-error"
              role="alert"
              className="mt-3 text-[13px] text-red-400"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-accent-solid hover:bg-accent mt-5 h-12 w-full rounded-full text-[15px] font-medium text-white transition-colors disabled:opacity-60"
          >
            {pending ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
