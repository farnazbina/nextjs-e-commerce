"use client";

import { AuthHeading, AuthInput } from "./login-form";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [isLoading, setIsLoading] = useState(false); const router = useRouter();
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setIsLoading(true); setError(null); try { const { error } = await createClient().auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/` } }); if (error) throw error; router.push("/auth/sign-up-success"); } catch (error: unknown) { setError(error instanceof Error ? error.message : "An error occurred"); } finally { setIsLoading(false); } };
  return <><AuthHeading title="Create new account" subtitle="Please enter your details" /><form onSubmit={submit} className="mt-7 space-y-4"><AuthInput label="Name" id="name" value={name} onChange={setName} placeholder="Alexa Williams" /><AuthInput label="Email address" id="signup-email" type="email" value={email} onChange={setEmail} placeholder="alexa.williams@example.com" /><AuthInput label="Password" id="signup-password" type="password" value={password} onChange={setPassword} /><label className="flex items-center gap-2 text-xs text-stone-600"><input type="checkbox" required className="size-4 accent-[#c9747e]" />I agree to the Terms &amp; Conditions</label>{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={isLoading} className="min-h-12 w-full bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#a9535e] disabled:opacity-60">{isLoading ? "Creating account…" : "Register"}</button><Link href="/auth/login" className="flex min-h-12 items-center justify-center border border-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-[#b85d68]">Login</Link></form></>;
}
