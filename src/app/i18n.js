import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { languages, fallbackLng } from "@/constants/language";

export const initI18next =  async () => {
  const i18nInstance = createInstance()
  await i18nInstance.use(initReactI18next)
    .use(
      resourcesToBackend((language, namespace) =>
        import(`./i18n/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // lng: locale,
      fallbackLng,
      supportedLngs: languages,
      defaultNS: "default",
      fallbackNS: "default",
      ns: ['default'],
      preload: typeof window === "undefined" ? languages : [],
    });
  return i18nInstance;
};

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
