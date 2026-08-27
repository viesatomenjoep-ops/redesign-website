import "server-only";
import { z } from "zod";

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
/** 1 day — comfortably inside Google's 30-day content cache limit. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

const authorSchema = z.object({
  displayName: z.string().optional(),
  uri: z.string().url().optional(),
  photoUri: z.string().url().optional(),
});

const reviewSchema = z.object({
  name: z.string().optional(),
  rating: z.number().optional(),
  text: z.object({ text: z.string().optional() }).optional(),
  originalText: z.object({ text: z.string().optional() }).optional(),
  relativePublishTimeDescription: z.string().optional(),
  publishTime: z.string().optional(),
  authorAttribution: authorSchema.optional(),
});

const placeSchema = z.object({
  rating: z.number().optional(),
  userRatingCount: z.number().optional(),
  googleMapsUri: z.string().url().optional(),
  reviews: z.array(reviewSchema).optional(),
});

export type GoogleReview = {
  id: string;
  author: string;
  authorPhotoUrl?: string;
  authorUrl?: string;
  rating: number;
  text?: string;
  relativeTime?: string;
};

export type GoogleReviewsData = {
  rating: number;
  count: number;
  mapsUrl?: string;
  /** Up to 5 — a hard Google Places API limit. */
  reviews: GoogleReview[];
};

/**
 * Fetches the Google Business listing's rating, total review count and up to 5
 * reviews via the Places API (New). Returns null on any failure so callers can
 * fall back to the curated set. Cached for 1 day (tag: "google-reviews").
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=nl&regionCode=NL`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
      },
    );

    if (!res.ok) {
      console.warn(`[google-reviews] ${res.status} ${res.statusText}`);
      return null;
    }

    const parsed = placeSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.warn("[google-reviews] unexpected response shape");
      return null;
    }

    const place = parsed.data;

    const reviews: GoogleReview[] = (place.reviews ?? [])
      .map((r, i): GoogleReview | null => {
        const author = r.authorAttribution?.displayName?.trim();
        if (!author) return null;
        const text = (r.text?.text ?? r.originalText?.text)?.trim();
        return {
          id: r.name ?? `review-${i}`,
          author,
          authorPhotoUrl: r.authorAttribution?.photoUri,
          authorUrl: r.authorAttribution?.uri,
          rating: typeof r.rating === "number" ? r.rating : 5,
          text: text || undefined,
          relativeTime: r.relativePublishTimeDescription,
        };
      })
      .filter((r): r is GoogleReview => r !== null);

    return {
      rating: typeof place.rating === "number" ? place.rating : 5,
      count:
        typeof place.userRatingCount === "number" ? place.userRatingCount : reviews.length,
      mapsUrl: place.googleMapsUri,
      reviews,
    };
  } catch (err) {
    console.warn("[google-reviews] fetch failed", err);
    return null;
  }
}
