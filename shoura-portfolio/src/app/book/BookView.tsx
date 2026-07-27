"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/sections/BookingForm";

const benefits = [
  { en: "Tailored, no-obligation proposal", ar: "عرض مخصص دون التزام" },
  { en: "Response within one business day", ar: "رد خلال يوم عمل واحد" },
  { en: "Flexible delivery formats", ar: "صيغ تنفيذ مرنة" },
  { en: "Trusted across the GCC & beyond", ar: "موثوق عبر الخليج وخارجه" },
];

function BookFormWithParams() {
  const params = useSearchParams();
  const program = params.get("program") ?? undefined;
  return <BookingForm defaultProgram={program} />;
}

export function BookView() {
  const { t, tl } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("section.booking.eyebrow")}
        title={tl({ en: "Book a Consultation", ar: "احجز استشارة" })}
        subtitle={tl({
          en: "Tell us about your goals and we'll craft a tailored proposal for training or consulting.",
          ar: "أخبرنا بأهدافك وسنعدّ لك عرضًا مخصصًا للتدريب أو الاستشارات.",
        })}
        crumbs={[{ label: t("cta.book") }]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            {/* Benefits */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                  {tl({
                    en: "What happens next?",
                    ar: "ماذا يحدث بعد ذلك؟",
                  })}
                </h2>
                <ul className="mt-6 space-y-4">
                  {benefits.map((b) => (
                    <li key={b.en} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-gold-500"
                        aria-hidden
                      />
                      <span className="text-sm text-charcoal-600">{tl(b)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-gradient-burgundy p-6 text-white">
                  <p className="text-sm leading-relaxed text-white/85">
                    {tl({
                      en: "\"Every corporate program is fully customized to your industry, team and objectives.\"",
                      ar: "«كل برنامج مؤسسي مصمم بالكامل حسب قطاعك وفريقك وأهدافك.»",
                    })}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="card-base p-6 md:p-8">
                <Suspense fallback={<div className="h-64" />}>
                  <BookFormWithParams />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
