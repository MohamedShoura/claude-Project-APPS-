"use client";

import { useState } from "react";
import { Linkedin, Link2, Check, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** X (Twitter) glyph — lucide has no X-brand icon. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="h-4 w-4" />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-charcoal-500">
        {t("blog.share")}:
      </span>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("blog.share")} — ${link.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition hover:border-burgundy-600 hover:bg-burgundy-50 hover:text-burgundy-700"
          >
            {link.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition hover:border-burgundy-600 hover:bg-burgundy-50 hover:text-burgundy-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
