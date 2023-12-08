import { nextTick } from "vue";

const createTrans = (i18n) => ({
    get defaultLocale() {
        return "en";
    },

    get supportedLocales() {
        return [
            "ar",
            "bn",
            "de",
            "en",
            "es",
            "fa",
            "fr",
            "hi",
            "hu",
            "id",
            "it",
            "ja",
            "ko",
            "nb",
            "nl",
            "pl",
            "pt",
            "ru",
            "th",
            "tr",
            "uk",
            "ur",
            "vi",
            "zh",
        ];
    },

    get currentLocale() {
        return i18n.global.locale.value;
    },

    set currentLocale(newLocale) {
        i18n.global.locale.value = newLocale;
    },

    async switchLanguage(newLocale) {
        if (!this.isLocaleSupported(newLocale)) {
            // Use 'this' instead of 'Trans'
            newLocale = VUE_APP_I18N_FALLBACK_LOCALE || "en";
        }

        try {
            await this.loadLocaleMessages(newLocale);
            this.currentLocale = newLocale;
            document.querySelector("html").setAttribute("lang", newLocale);
            localStorage.setItem("user-locale", newLocale);
        } catch (error) {
            console.log(error);
        }
    },

    async loadLocaleMessages(locale) {
        if (!i18n.global.availableLocales.includes(locale)) {
            const { default: messages } = await import(
                `../../lang/${locale}.json`
            );
            i18n.global.setLocaleMessage(locale, messages);
        }

        return nextTick();
    },

    isLocaleSupported(locale) {
        return this.supportedLocales.includes(locale); // Use 'this' instead of 'Trans'
    },

    getUserLocale() {
        const locale =
            window.navigator.language ??
            window.navigator.userLanguage ??
            this.defaultLocale;

        return {
            locale,
            localeNoRegion: locale.split("-")[0],
        };
    },

    getPersistedLocale() {
        const persistedLocale = localStorage.getItem("user-locale");

        if (this.isLocaleSupported(persistedLocale)) {
            return persistedLocale;
        } else {
            return null;
        }
    },

    guessDefaultLocale() {
        const userPersistedLocale = this.getPersistedLocale(); // Use 'this' instead of 'Trans'
        if (userPersistedLocale) {
            return userPersistedLocale;
        }

        const userPreferredLocale = this.getUserLocale(); // Use 'this' instead of 'Trans'

        if (this.isLocaleSupported(userPreferredLocale.locale)) {
            // Use 'this' instead of 'Trans'
            return userPreferredLocale.locale;
        }

        if (this.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            // Use 'this' instead of 'Trans'
            return userPreferredLocale.localeNoRegion;
        }

        return this.defaultLocale; // Use 'this' instead of 'Trans'
    },

    async routeMiddleware(to, _from, next) {
        const paramLocale = to.params.locale;

        if (!this.isLocaleSupported(paramLocale)) {
            return next(this.guessDefaultLocale());
        }

        await this.switchLanguage(paramLocale);

        return next();
    },

    i18nRoute(to) {
        return {
            ...to,
            params: {
                locale: this.currentLocale,
                ...to.params,
            },
        };
    },
});

export default createTrans;
