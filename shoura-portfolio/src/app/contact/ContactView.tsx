"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { contact } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/sections/BookingForm";

export function ContactView() {
  const { t, tl } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("section.contact.eyebrow")}
        title={tl({ en: "Let's Work Together", ar: "لنعمل معًا" })}
        subtitle={tl({
          en: "Reach out to discuss corporate training, consulting or a speaking engagement. We typically respond within one business day.",
          ar: "تواصل معنا لمناقشة التدريب المؤسسي أو الاستشارات أو المحاضرات. نرد عادةً خلال يوم عمل واحد.",
        })}
        crumbs={[{ label: t("nav.contact") }]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-6">
                <InfoCard icon={<Mail className="h-5 w-5" />} title={t("contact.email")}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-charcoal-600 transition hover:text-burgundy-700"
                  >
                    {contact.email}
                  </a>
                </InfoCard>

                <InfoCard icon={<Phone className="h-5 w-5" />} title={t("contact.phone")}>
                  <ul className="space-y-1.5">
                    {contact.phones.map((p) => (
                      <li key={p.country.en} className="text-charcoal-600">
                        <span className="font-medium text-charcoal-800">
                          {tl(p.country)}:
                        </span>{" "}
                        <a
                          href={`tel:${p.value.replace(/\s/g, "")}`}
                          className="transition hover:text-burgundy-700"
                          dir="ltr"
                        >
                          {p.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </InfoCard>

                <InfoCard icon={<MapPin className="h-5 w-5" />} title={t("contact.offices")}>
                  <ul className="space-y-1.5">
                    {contact.offices.map((o) => (
                      <li key={o.city.en} className="text-charcoal-600">
                        <span className="font-medium text-charcoal-800">
                          {tl(o.city)}
                        </span>{" "}
                        — {tl(o.org)}
                      </li>
                    ))}
                  </ul>
                </InfoCard>

                <InfoCard icon={<Clock className="h-5 w-5" />} title={t("contact.hours")}>
                  <p className="text-charcoal-600">{tl(contact.workingHours)}</p>
                </InfoCard>

                {/* Social + WhatsApp */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {t("contact.whatsapp")}
                  </a>
                  <div className="flex gap-2">
                    <SocialIcon href={contact.social.linkedin} label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </SocialIcon>
                    <SocialIcon href={contact.social.instagram} label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </SocialIcon>
                    <SocialIcon href={contact.social.youtube} label="YouTube">
                      <Youtube className="h-4 w-4" />
                    </SocialIcon>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="card-base p-6 md:p-8">
                <SectionHeading
                  eyebrow={t("section.booking.eyebrow")}
                  title={tl({ en: "Send a Message", ar: "أرسل رسالة" })}
                  align="start"
                />
                <div className="mt-8">
                  <BookingForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burgundy-50 text-burgundy-600">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          {title}
        </h3>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition hover:border-burgundy-600 hover:bg-burgundy-50 hover:text-burgundy-700"
    >
      {children}
    </a>
  );
}
