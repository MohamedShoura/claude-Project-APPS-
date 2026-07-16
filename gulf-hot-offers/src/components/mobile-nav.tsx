'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePrefs } from './providers';
import { dict, t } from '@/i18n/dictionaries';

export function MobileNav() {
  const { locale } = usePrefs();
  const pathname = usePathname();
  const items: { href: string; label: string; icon: string }[] = [
    { href: '/', label: t(dict.nav.home, locale), icon: '🏠' },
    { href: '/deals', label: t(dict.nav.deals, locale), icon: '🔥' },
    { href: '/coupons', label: t(dict.nav.coupons, locale), icon: '🏷️' },
    { href: '/compare', label: t(dict.nav.compare, locale), icon: '⚖️' },
    { href: '/account', label: t(dict.nav.account, locale), icon: '👤' },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {items.map((it) => {
          const active = it.href === '/' ? pathname === '/' || /^\/(qa|sa|ae)$/.test(pathname) : pathname.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${active ? 'text-hot' : 'text-ink-muted'}`}>
              <span className="text-lg">{it.icon}</span>
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
