import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./lang/en.json";
import * as sk from "./lang/sk.json";

const resources = {
  en: {
    translation: en,
  },
  sk: {
    translation: sk,
  },
};

export const supportedLanguages = {
  en: { nativeName: "English" },
  sk: { nativeName: "Slovensky" },
};

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "sk",
});

export default i18n;
