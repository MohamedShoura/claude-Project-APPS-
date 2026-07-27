"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { programs } from "@/data/programs";
import { formEndpoint } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Localized } from "@/i18n/types";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions: { value: string; label: Localized }[] = [
  { value: "corporate-training", label: { en: "Corporate Training", ar: "تدريب مؤسسي" } },
  { value: "private-training", label: { en: "Private Training", ar: "تدريب خاص" } },
  { value: "ai-consulting", label: { en: "AI Consulting", ar: "استشارات ذكاء اصطناعي" } },
  { value: "marketing-consulting", label: { en: "Marketing Consulting", ar: "استشارات تسويق" } },
  { value: "sales-consulting", label: { en: "Sales Consulting", ar: "استشارات مبيعات" } },
  { value: "speaking", label: { en: "Speaking Engagement", ar: "محاضرة" } },
  { value: "partnership", label: { en: "Partnership", ar: "شراكة" } },
  { value: "other", label: { en: "Other", ar: "أخرى" } },
];

const deliveryOptions: { value: string; label: Localized }[] = [
  { value: "in-house", label: { en: "In-house", ar: "داخل المؤسسة" } },
  { value: "online", label: { en: "Online Live", ar: "أونلاين مباشر" } },
  { value: "public", label: { en: "Public Workshop", ar: "ورشة عامة" } },
  { value: "executive", label: { en: "Executive Session", ar: "جلسة تنفيذية" } },
];

interface Props {
  defaultProgram?: string;
}

export function BookingForm({ defaultProgram }: Props) {
  const { t, tl } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = (data: FormData) => {
    const next: Record<string, boolean> = {};
    const required = ["fullName", "email", "service"];
    for (const field of required) {
      if (!String(data.get(field) ?? "").trim()) next[field] = true;
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = true;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!validate(data)) return;

    setStatus("loading");
    try {
      if (formEndpoint) {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Built-in mock handler — replace by setting NEXT_PUBLIC_FORM_ENDPOINT.
        await new Promise((r) => setTimeout(r, 900));
        // eslint-disable-next-line no-console
        console.info("Lead submission (mock):", Object.fromEntries(data));
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-green-100 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-green-600" aria-hidden />
        <p className="mt-4 max-w-md text-green-800">{t("form.success")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          {t("cta.getInTouch")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.fullName")} name="fullName" required error={errors.fullName} errorText={t("form.required")} />
        <Field label={t("form.company")} name="company" optional={t("form.optional")} />
        <Field label={t("form.jobTitle")} name="jobTitle" optional={t("form.optional")} />
        <Field label={t("form.country")} name="country" optional={t("form.optional")} />
        <Field
          label={t("form.email")}
          name="email"
          type="email"
          required
          error={errors.email}
          errorText={t("form.invalidEmail")}
        />
        <Field label={t("form.phone")} name="phone" type="tel" optional={t("form.optional")} />

        <SelectField label={t("form.service")} name="service" required error={errors.service} errorText={t("form.required")} placeholder={t("form.select")}>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {tl(o.label)}
            </option>
          ))}
        </SelectField>

        <SelectField label={t("form.program")} name="program" placeholder={t("form.select")} defaultValue={defaultProgram}>
          {programs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {tl(p.title)}
            </option>
          ))}
        </SelectField>

        <Field label={t("form.participants")} name="participants" type="number" optional={t("form.optional")} />

        <SelectField label={t("form.deliveryFormat")} name="deliveryFormat" placeholder={t("form.select")}>
          {deliveryOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {tl(o.label)}
            </option>
          ))}
        </SelectField>

        <Field label={t("form.preferredDate")} name="preferredDate" type="date" optional={t("form.optional")} className="sm:col-span-2" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          {t("form.message")}{" "}
          <span className="text-xs font-normal text-charcoal-400">({t("form.optional")})</span>
        </label>
        <textarea id="message" name="message" rows={4} className="input-base resize-none" />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
          {t("form.error")}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {t("form.sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            {t("form.submit")}
          </>
        )}
      </button>
    </form>
  );
}

/* ------------------------------ Fields ------------------------------ */
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: string;
  error?: boolean;
  errorText?: string;
  className?: string;
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  error,
  errorText,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-charcoal-700">
        {label}
        {required && <span className="text-burgundy-600"> *</span>}
        {optional && (
          <span className="text-xs font-normal text-charcoal-400"> ({optional})</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={error || undefined}
        className={`input-base ${error ? "border-red-400 focus:ring-red-200" : ""}`}
      />
      {error && errorText && (
        <p className="mt-1 text-xs text-red-600">{errorText}</p>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  placeholder: string;
  defaultValue?: string;
  children: React.ReactNode;
}

function SelectField({
  label,
  name,
  required,
  error,
  errorText,
  placeholder,
  defaultValue,
  children,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-charcoal-700">
        {label}
        {required && <span className="text-burgundy-600"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        aria-invalid={error || undefined}
        className={`input-base ${error ? "border-red-400 focus:ring-red-200" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      {error && errorText && (
        <p className="mt-1 text-xs text-red-600">{errorText}</p>
      )}
    </div>
  );
}
