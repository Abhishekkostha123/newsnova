import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return "";
  return format(date, "MMM dd, yyyy");
}

export function formatDateFull(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return "";
  return format(date, "MMMM dd, yyyy 'at' hh:mm a");
}

export function timeAgo(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return "";
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + "…";
}

export function generateExcerpt(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return truncate(text, maxLength);
}

export function extractHeadings(
  html: string
): Array<{ id: string; text: string; level: number }> {
  const regex = /<h([2-4])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[2-4]>/gi;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[3]
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .trim();
    const id =
      match[2] ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.newsnova.online";
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "NewsNova";
