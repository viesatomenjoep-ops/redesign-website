"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <h1 className="text-3xl font-extrabold text-paper">{t.errorPage.title}</h1>
      <p className="mt-4 max-w-md text-muted">{t.errorPage.body}</p>
      <Button onClick={reset} variant="coral" size="lg" className="mt-8">
        {t.errorPage.retry}
      </Button>
    </div>
  );
}
