/**
 * Canonical domain types for podcast episodes.
 * Shared between GROQ projections (server), API routes, and UI components.
 */

/** A single timestamped transcript segment. Drives sync UI + future embeddings. */
export interface TranscriptSegment {
  /** Segment start time in seconds (float). */
  start: number;
  /** Segment end time in seconds (float). */
  end: number;
  text: string;
}

export type EpisodeMediaType = 'audio' | 'video';

export interface PodcastEpisode {
  _id: string;
  episodeNumber: number | null;
  mediaType: EpisodeMediaType | null;
  /** External embed URL (YouTube / Vimeo). Present when mediaType === 'video'. */
  videoUrl: string | null;
  /** Sanity-hosted MP4 asset URL. Present when mediaType === 'video'. */
  videoFileUrl: string | null;
  /** Sanity-hosted audio asset URL. Present when mediaType === 'audio'. */
  audioUrl: string | null;
  /** Locale-resolved at query time. */
  title: string | null;
  description: string | null;
  /**
   * Legacy plain-text transcript (locale-resolved).
   * Will be superseded by structured segments once the Whisper pipeline lands.
   */
  transcript: string | null;
  imageUrl: string | null;
}

/** Type guard for mediaType values coming back from untyped CMS data. */
export function isEpisodeMediaType(value: unknown): value is EpisodeMediaType {
  return value === 'audio' || value === 'video';
}
