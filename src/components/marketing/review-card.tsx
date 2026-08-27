import Image from "next/image";
import { Star } from "lucide-react";

export type DisplayReview = {
  id: string;
  author: string;
  authorPhotoUrl?: string;
  authorUrl?: string;
  rating: number;
  text?: string;
  /** "2 maanden geleden" (live) or "3 reviews" (curated) */
  meta?: string;
};

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="mb-3 flex gap-0.5 text-star" aria-label={`${filled} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < filled ? "h-3 w-3 fill-current" : "h-3 w-3 fill-current opacity-25"}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: DisplayReview }) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-line bg-white p-6">
      <Stars rating={review.rating} />
      {review.text ? (
        <p className="m-0 line-clamp-5 text-[13.5px] leading-relaxed text-[#3E4A5F]">
          {review.text}
        </p>
      ) : (
        <p className="m-0 text-[13.5px] italic text-muted-ink/70">Beoordeeld met 5 sterren</p>
      )}
      <div className="mt-auto flex items-center gap-2.5 border-t border-[#EEEBE2] pt-3.5">
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#E9E5DA] text-[11px] font-bold text-muted-ink">
            {review.author.charAt(0)}
          </span>
        )}
        <span className="flex min-w-0 flex-col">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[12px] font-semibold text-[#6B7688] hover:text-coral"
            >
              {review.author}
            </a>
          ) : (
            <span className="truncate text-[12px] font-semibold text-[#6B7688]">{review.author}</span>
          )}
          {review.meta ? <span className="text-[10.5px] text-[#B4B0A4]">{review.meta}</span> : null}
        </span>
      </div>
    </article>
  );
}
