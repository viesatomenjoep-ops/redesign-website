"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  /** "audit" adds the optional website field and different copy. */
  variant?: "default" | "audit";
  onSuccess?: () => void;
  className?: string;
};

const fieldBase =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink outline-none placeholder:text-muted-ink/70 focus-visible:border-coral";

export function ContactForm({ variant = "default", onSuccess, className }: ContactFormProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema) as Resolver<ContactInput>,
    defaultValues: { name: "", email: "", message: "", website: "", company: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? t.contactForm.genericError);
      }
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : t.contactForm.genericError);
    }
  });

  if (status === "success") {
    return (
      <div className={cn("rounded-xl bg-paper-2 p-6 text-center", className)}>
        <p className="text-lg font-extrabold text-ink">{t.contactForm.successTitle}</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">
          {t.contactForm.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-3", className)}>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">{t.contactForm.nameLabel}</span>
        <input
          className={fieldBase}
          placeholder={t.contactForm.namePlaceholder}
          {...register("name")}
        />
        {errors.name && <span className="text-xs text-coral">{errors.name.message}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">{t.contactForm.emailLabel}</span>
        <input
          className={fieldBase}
          type="email"
          placeholder={t.contactForm.emailPlaceholder}
          {...register("email")}
        />
        {errors.email && <span className="text-xs text-coral">{errors.email.message}</span>}
      </label>

      {variant === "audit" && (
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-bold text-ink">{t.contactForm.websiteLabel}</span>
          <input
            className={fieldBase}
            placeholder={t.contactForm.websitePlaceholder}
            {...register("website")}
          />
        </label>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">{t.contactForm.messageLabel}</span>
        <textarea
          className={cn(fieldBase, "min-h-[120px] resize-y")}
          placeholder={
            variant === "audit"
              ? t.contactForm.messagePlaceholderAudit
              : t.contactForm.messagePlaceholder
          }
          rows={4}
          {...register("message")}
        />
        {errors.message && <span className="text-xs text-coral">{errors.message.message}</span>}
      </label>

      {serverError && <p className="text-sm text-coral">{serverError}</p>}

      <Button type="submit" variant="navy" className="mt-1 w-full" disabled={status === "submitting"}>
        {status === "submitting"
          ? t.contactForm.submitting
          : variant === "audit"
            ? t.booking.requestAudit
            : t.contactForm.submit}
      </Button>
    </form>
  );
}
