export function formatMonthLabel(date: Date, language: string) {
  return `${date.toLocaleString(language, {
    month: "short",
  })} ${date.getFullYear()}`;
}
