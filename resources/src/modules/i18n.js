// i18n.js
import { createI18n } from "vue-i18n";
import en from "../../lang/en.json";

export default function createI18nInstance(Trans = null) {
    return createI18n({
        legacy: false,
        globalInjection: true,
        locale: Trans ? Trans.guessDefaultLocale() : "en",
        fallbackLocale: "en",
        messages: { en },
    });
}
