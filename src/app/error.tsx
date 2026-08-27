"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <h1 className="text-3xl font-extrabold text-paper">Er ging iets mis</h1>
      <p className="mt-4 max-w-md text-muted">
        Probeer het opnieuw. Blijft het misgaan, mail ons dan gerust direct.
      </p>
      <Button onClick={reset} variant="coral" size="lg" className="mt-8">
        Opnieuw proberen
      </Button>
    </div>
  );
}
