"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { getFaqItems } from "@/content/faq";
import { useI18n } from "@/components/i18n/locale-provider";

export function Faq() {
  const { locale, t } = useI18n();
  const faqItems = getFaqItems(locale);

  return (
    <Container width="narrow" id="faq" className="py-24">
      <Reveal className="mb-12 text-center">
        <Eyebrow tone="navy" className="mb-5">
          {t.faq.eyebrow}
        </Eyebrow>
        <h2 className="m-0 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-ink">
          {t.faq.title}
        </h2>
      </Reveal>

      <Accordion.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
        {faqItems.map((item, i) => (
          <Accordion.Item
            key={item.q}
            value={`item-${i}`}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="text-[15.5px] font-bold text-ink">{item.q}</span>
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-paper text-navy">
                  <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                  <Minus className="hidden h-4 w-4 group-data-[state=open]:block" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pb-6">
              <p className="m-0 text-[14.5px] leading-relaxed text-muted-ink">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
}
