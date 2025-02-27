import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "react-native-localize";

// Import language JSON files
import en from "./locales/en.json";
import cn from "./locales/cn.json";

const resources = { en: { translation: en }, cn: { translation: cn },  };

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locales = Localization.getLocales();
    callback(locales[0]?.languageCode || "cn");
  },
  init: () => {},
  cacheUserLanguage: () => {},
  
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "cn",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
