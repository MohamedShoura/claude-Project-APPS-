"use client";

import { useState } from "react";
import { UserCircle2 } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

export function AuthForms() {
  const { dict } = useLocale();
  const login = useAuthStore((s) => s.login);
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    login({ name: loginEmail.split("@")[0], email: loginEmail, phone: "" });
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;
    login({ name, email, phone });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <UserCircle2 size={48} className="mx-auto text-brand-600" />
      <div className="mt-6 flex rounded-xl bg-neutral-100 p-1">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors",
              tab === t ? "bg-white text-brand-700 shadow-sm" : "text-neutral-500"
            )}
          >
            {t === "login" ? dict.account.login : dict.account.register}
          </button>
        ))}
      </div>

      {tab === "login" ? (
        <form onSubmit={handleLogin} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder={dict.account.email}
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="password"
            placeholder={dict.account.password}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <button type="submit" className="w-full rounded-xl bg-brand-700 py-3 text-sm font-extrabold text-white hover:bg-brand-800">
            {dict.account.login}
          </button>
          <p className="text-center text-xs text-neutral-500">
            {dict.account.noAccount}{" "}
            <button type="button" onClick={() => setTab("register")} className="font-bold text-brand-700">
              {dict.account.createAccount}
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="mt-6 space-y-3">
          <input
            placeholder={dict.account.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="email"
            placeholder={dict.account.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <input
            placeholder={dict.account.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="password"
            placeholder={dict.account.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <button type="submit" className="w-full rounded-xl bg-cta-500 py-3 text-sm font-extrabold text-white hover:bg-cta-600">
            {dict.account.createAccount}
          </button>
          <p className="text-center text-xs text-neutral-500">
            {dict.account.haveAccount}{" "}
            <button type="button" onClick={() => setTab("login")} className="font-bold text-brand-700">
              {dict.account.login}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
