import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/motion/typewriter";
import { reviews, featuredTestimonial } from "@/content/reviews";
import { site } from "@/lib/site";
import type { Review } from "@/content/schema";

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5 text-star" aria-label="5 van 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-line bg-white p-6">
      <Stars />
      {review.text ? (
        <p className="m-0 line-clamp-5 text-[13.5px] leading-relaxed text-[#3E4A5F]">
          {review.text}
        </p>
      ) : (
        <p className="m-0 text-[13.5px] italic text-muted-ink/70">Beoordeeld met 5 sterren</p>
      )}
      <div className="mt-auto flex items-center gap-2.5 border-t border-[#EEEBE2] pt-3.5">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#E9E5DA] text-[11px] font-bold text-muted-ink">
          {review.author.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="text-[12px] font-semibold text-[#6B7688]">{review.author}</span>
          {review.meta ? (
            <span className="text-[10.5px] text-[#B4B0A4]">{review.meta}</span>
          ) : null}
        </span>
      </div>
    </article>
  );
}

export function Reviews() {
  return (
    <Container width="content" id="testimonial" className="py-20">
      <Reveal className="mx-auto mb-7 max-w-[640px] text-center">
        <p className="eyebrow mb-4 text-navy">Klantbeoordelingen</p>
        <h2 className="m-0 text-[clamp(1.875rem,3.8vw,2.75rem)] font-extrabold text-ink">
          Vijf sterren, van iedereen die ons beoordeelde
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-ink">
          We tonen ze allemaal, niet alleen de mooiste.
        </p>
      </Reveal>

      <div className="mb-7 flex flex-wrap items-center justify-center gap-3.5">
        <span className="text-[19px] font-extrabold text-ink">
          {site.rating.value.toLocaleString("nl-NL")}
        </span>
        <span className="flex gap-0.5 text-star">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span className="text-[13.5px] text-muted-ink">{site.rating.count} Google reviews</span>
      </div>

      <Carousel
        ariaLabel="Klantbeoordelingen"
        slideClassName="basis-full sm:basis-1/2 nav:basis-1/3"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.author} review={review} />
        ))}
      </Carousel>

      <Reveal className="mx-auto mt-16 max-w-[820px] text-center">
        <p className="m-0 mb-6 text-[clamp(1.375rem,2.8vw,2rem)] font-semibold leading-normal tracking-[-0.01em] text-ink">
          &ldquo;
          <Typewriter text={featuredTestimonial.quote} speed={16} onView as="span" />
          &rdquo;
        </p>
        <div className="flex items-center justify-center gap-3.5">
          <span className="h-px w-9 bg-[#C9C4B4]" />
          <span className="eyebrow text-[11px] text-[#8A8676]">{featuredTestimonial.label}</span>
          <span className="h-px w-9 bg-[#C9C4B4]" />
        </div>
      </Reveal>

      {/* TODO(content): the prototype also has an "Achter de schermen" photo
          carousel here — omitted until real photos are supplied. */}
    </Container>
  );
}
