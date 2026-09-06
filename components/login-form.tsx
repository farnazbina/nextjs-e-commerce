"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); setError(null);
    try {
      const { error } = await createClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally { setIsLoading(false); }
  };

  return <><AuthHeading title="Welcome" subtitle="Please login here" /><form onSubmit={handleLogin} className="mt-7 space-y-5"><AuthInput label="Email address" id="email" type="email" value={email} onChange={setEmail} placeholder="alexa.williams@example.com" /><AuthInput label="Password" id="password" type="password" value={password} onChange={setPassword} /><div className="flex items-center justify-between gap-4"><label className="flex items-center gap-2 text-sm text-stone-600"><input type="checkbox" className="size-4 accent-[#c9747e]" />Remember me</label><Link href="/auth/forgot-password" className="text-sm text-[#c05f6b] hover:underline">Forgot password?</Link></div>{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={isLoading} className="min-h-12 w-full bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#a9535e] disabled:opacity-60">{isLoading ? "Logging in…" : "Login"}</button><Link href="/auth/sign-up" className="flex min-h-12 items-center justify-center border border-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-[#b85d68] hover:bg-[#fff6f7]">Register</Link></form></>;
}

export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="relative pr-10"><h1 className="font-serif text-3xl tracking-[-0.03em] text-stone-900">{title}</h1><p className="mt-1.5 text-xs text-stone-500">{subtitle}</p><Link href="/" aria-label="Close" className="absolute -right-1 -top-1 grid size-9 place-items-center text-stone-500 hover:text-stone-900"><FiX /></Link></div>;
}

export function AuthInput({ label, id, type = "text", value, onChange, placeholder }: { label: string; id: string; type?: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="block" htmlFor={id}><span className="mb-2 block text-xs text-stone-500">{label}</span><input id={id} type={type} required value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-h-11 w-full border border-stone-200 px-4 text-sm text-stone-900 outline-none transition focus:border-[#c9747e]" /></label>;
}
