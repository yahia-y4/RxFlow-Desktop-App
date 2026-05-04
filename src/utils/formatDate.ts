export function formatDate(date: string, locale = "en-US"): string {
  return new Date(date).toLocaleDateString(locale);
}