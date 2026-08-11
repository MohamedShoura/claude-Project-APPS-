"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";

export function Newsletter() {
  const { dict } = useLocale();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    trackEvent("generate_lead", { method: "newsletter" });
    setSubmitted(true);
    setValue("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="rounded-3xl bg-gold-50 px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{dict.newsletter.title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">{dict.newsletter.subtitle}</p>
        {submitted ? (
          <p className="mt-6 font-bold text-brand-700">{dict.newsletter.success}</p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={dict.newsletter.placeholder}
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white hover:bg-neutral-800"
            >
              <Send size={15} />
              {dict.newsletter.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
