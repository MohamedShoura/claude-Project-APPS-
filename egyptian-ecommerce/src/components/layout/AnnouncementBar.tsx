"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function AnnouncementBar() {
  const { dict } = useLocale();
  const messages = [dict.announcement.offer, dict.announcement.delivery];

  return (
    <div className="overflow-hidden bg-neutral-900 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <div className="no-scrollbar flex items-center justify-center gap-8 overflow-x-auto px-4">
        {messages.map((m, i) => (
          <span key={i} className="whitespace-nowrap">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
