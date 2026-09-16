import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/motion/typewriter";
import { ReviewCard, type DisplayReview } from "@/components/marketing/review-card";
import { getCuratedReviews, getFeaturedTestimonial } from "@/content/reviews";
import { getGoogleReviews } from "@/lib/google-reviews";
import { site } from "@/lib/site";
import { htmlLang, type Locale } from "@/lib/i18n";
import { getDictionary, interpolate } from "@/lib/dictionaries";

function curatedToDisplay(locale: Locale): DisplayReview[] {
  return getCuratedReviews(locale).map((r, i) => ({
    id: `curated-${i}`,
    author: r.author,
    rating: 5,
    text: r.text,
    meta: r.meta,
  }));
}

export async function Reviews({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const featuredTestimonial = getFeaturedTestimonial(locale);
  const live = await getGoogleReviews();

  const rating = live?.rating ?? site.rating.value;
  const count = live?.count ?? site.rating.count;
  const cards: DisplayReview[] =
    live && live.reviews.length > 0
      ? live.reviews.map((r) => ({
          id: r.id,
          author: r.author,
          authorPhotoUrl: r.authorPhotoUrl,
          authorUrl: r.authorUrl,
          rating: r.rating,
          text: r.text,
          meta: r.relativeTime,
        }))
      : curatedToDisplay(locale);

  return (
    <Container width="content" id="testimonial" className="py-20">
      <Reveal className="mx-auto mb-7 max-w-[640px] text-center">
        <p className="eyebrow mb-4 text-navy">{t.reviews.eyebrow}</p>
        <h2 className="m-0 text-[clamp(1.875rem,3.8vw,2.75rem)] font-extrabold text-ink">
          {t.reviews.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-ink">{t.reviews.lede}</p>
      </Reveal>

      <div className="mb-7 flex flex-wrap items-center justify-center gap-3.5">
        <span className="text-[19px] font-extrabold text-ink">
          {rating.toLocaleString(htmlLang[locale], {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </span>
        <span className="flex gap-0.5 text-star">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span className="text-[13.5px] text-muted-ink">
          {interpolate(t.reviews.googleReviews, { count })}
        </span>
        {live?.mapsUrl ? (
          <a
            href={live.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-semibold text-navy underline underline-offset-2 hover:text-coral"
          >
            {t.reviews.viewOnGoogle}
          </a>
        ) : null}
      </div>

      <Carousel
        ariaLabel={t.reviews.carouselLabel}
        slideClassName="basis-full sm:basis-1/2 nav:basis-1/3"
      >
        {cards.map((review) => (
          <ReviewCard key={review.id} review={review} />
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
    </Container>
  );
}
