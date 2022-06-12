import { useTranslation } from "react-i18next";

export const dateTimeFormat = "HH:mm - dd. MM. yyyy";
export const dateTimeMask = "__:__ - __. __. ____";

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

export function formatDayLabel(date: Date, language: string) {
  return date.toLocaleString(language, {
    weekday: "short",
  });
}

export function useDateTimeFormatter(): (date: Date) => string {
  const { i18n } = useTranslation();
  return (date: Date) => {
    return date.toLocaleTimeString(i18n.resolvedLanguage, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
}
