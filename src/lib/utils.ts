import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function normalizeTags(tags: any): string[] {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    return tags.split(",").map((t) => t.trim());
  }
  return [];
}
export const getImageUrl = (attachmentId: string | null) => {
  if (!attachmentId) return "/fallback.png";

  return `https://sgp.cloud.appwrite.io/v1/storage/buckets/question-attachment/files/${attachmentId}/view?project=69bfb9f100214bf4d0bf`;
};