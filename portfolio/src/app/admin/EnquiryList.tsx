"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useTransition } from "react";
import type { Enquiry } from "@/lib/enquiries/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { deleteEnquiry, markRead } from "./actions";

type Filter = "all" | "unread";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Meta({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-faint font-mono text-[10px] tracking-[0.16em] uppercase">
        {label}
      </dt>
      <dd className="text-ink mt-1 text-[14px]">{value}</dd>
    </div>
  );
}

export function EnquiryList({ enquiries }: { enquiries: Enquiry[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const unreadCount = useMemo(
    () => enquiries.filter((item) => !item.read).length,
    [enquiries],
  );

  const visible = useMemo(
    () => (filter === "unread" ? enquiries.filter((e) => !e.read) : enquiries),
    [enquiries, filter],
  );

  if (enquiries.length === 0) {
    return (
      <div className="border-hairline rounded-2xl border border-dashed px-6 py-16 text-center">
        <p className="text-ink text-[17px] font-medium">No enquiries yet.</p>
        <p className="text-muted mt-2 text-[14px]">
          Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(["all", "unread"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] transition-colors",
              filter === option
                ? "border-accent bg-accent/12 text-ink"
                : "border-hairline text-muted hover:text-ink",
            )}
          >
            {option === "all"
              ? `All (${enquiries.length})`
              : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <ul className="border-hairline space-y-3" role="list">
        {visible.map((enquiry) => {
          const isOpen = openId === enquiry.id;
          return (
            <li
              key={enquiry.id}
              className={cn(
                "border-hairline bg-surface/50 overflow-hidden rounded-2xl border transition-colors",
                !enquiry.read && "border-accent/40",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : enquiry.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {!enquiry.read && (
                      <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                    )}
                    <span className="text-ink text-[15px] font-medium">
                      {enquiry.name}
                    </span>
                    {enquiry.company && (
                      <span className="text-muted text-[13px]">
                        {enquiry.company}
                      </span>
                    )}
                    {enquiry.locale !== "en" && (
                      <span className="border-hairline text-faint rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                        {enquiry.locale}
                      </span>
                    )}
                  </span>
                  <span className="text-muted mt-1.5 block truncate text-[13px]">
                    {enquiry.message}
                  </span>
                </span>
                <span className="text-faint shrink-0 font-mono text-[10px] whitespace-nowrap">
                  {formatDate(enquiry.createdAt)}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="overflow-hidden"
                  >
                    <div className="border-hairline border-t px-5 py-5">
                      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <Meta label="Email" value={enquiry.email} />
                        <Meta label="Phone" value={enquiry.phone} />
                        <Meta label="Budget" value={enquiry.budget} />
                        <Meta label="Timeline" value={enquiry.timeline} />
                      </dl>

                      <p className="text-faint mt-6 font-mono text-[10px] tracking-[0.16em] uppercase">
                        Message
                      </p>
                      <p className="text-ink mt-2 text-[15px] leading-relaxed whitespace-pre-wrap">
                        {enquiry.message}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <a
                          href={`mailto:${enquiry.email}?subject=${encodeURIComponent("Re: your project enquiry")}`}
                          className="bg-accent-solid hover:bg-accent rounded-full px-4 py-2 text-[13px] font-medium text-white transition-colors"
                        >
                          Reply by email
                        </a>
                        {enquiry.phone && (
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-hairline text-muted hover:text-ink rounded-full border px-4 py-2 text-[13px] transition-colors"
                          >
                            WhatsApp
                          </a>
                        )}
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() =>
                            startTransition(() =>
                              markRead(enquiry.id, !enquiry.read),
                            )
                          }
                          className="border-hairline text-muted hover:text-ink rounded-full border px-4 py-2 text-[13px] transition-colors disabled:opacity-50"
                        >
                          Mark as {enquiry.read ? "unread" : "read"}
                        </button>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => {
                            // Deletion is permanent — the store has no undo.
                            if (
                              window.confirm(
                                `Delete the enquiry from ${enquiry.name}? This cannot be undone.`,
                              )
                            ) {
                              startTransition(() => deleteEnquiry(enquiry.id));
                            }
                          }}
                          className="ml-auto rounded-full px-4 py-2 text-[13px] text-red-400/80 transition-colors hover:text-red-400 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
