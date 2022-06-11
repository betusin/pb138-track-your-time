export function formatMonthLabel(date: Date, language: string) {
  return `${date.toLocaleString(language, {
    month: "short",
  })} ${date.getFullYear()}`;
}

export function formatDateLabel(date: Date, language: string) {
  return date.toLocaleString(language, {
    day: "numeric",
    month: "numeric",
  });
}
