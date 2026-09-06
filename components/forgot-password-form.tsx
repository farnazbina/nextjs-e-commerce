"use client";

import { AuthHeading, AuthInput } from "./login-form";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState(""); const [error, setError] = useState<string | null>(null); const [success, setSuccess] = useState(false); const [isLoading, setIsLoading] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setIsLoading(true); setError(null); try { const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/update-password` }); if (error) throw error; setSuccess(true); } catch (error: unknown) { setError(error instanceof Error ? error.message : "An error occurred"); } finally { setIsLoading(false); } };
  if (success) return <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#f7dfe2] text-2xl text-[#c9747e] ring-8 ring-[#fcf2f3]">✓</div><h1 className="mt-7 font-serif text-3xl text-stone-900">Check your email</h1><p className="mt-3 text-sm leading-6 text-stone-500">We sent password reset instructions to your registered email address.</p><Link href="/auth/login" className="mt-7 flex min-h-12 items-center justify-center bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-white">Back to login</Link></div>;
  return <><AuthHeading title="Forgot password" subtitle="Enter your registered email address and we’ll send a reset link." /><form onSubmit={submit} className="mt-7 space-y-5"><AuthInput label="Email address" id="reset-email" type="email" value={email} onChange={setEmail} placeholder="alexa.williams@example.com" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={isLoading} className="min-h-12 w-full bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-60">{isLoading ? "Sending…" : "Send link"}</button></form></>;
}
