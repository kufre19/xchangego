import "../flowbite";
import "../modules/bootstrap";
import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import createPersistedState from "pinia-persistedstate";
import SecureLS from "secure-ls";

import App from "./Trading.vue";
import router from "./router";

import Toast from "vue-toastification";
import { useToast } from "vue-toastification";
import "@/scss/toast.scss";
import SmartTable from "vuejs-smart-table";
import VueVirtualScroller from "vue-virtual-scroller";

import VueLazyLoad from "../modules/vue3-lazyload/dist/index.mjs";
import VueQrcode from "@chenfengyuan/vue-qrcode";

import createI18nInstance from "@/modules/i18n";
import createTrans from "@/modules/translation";

const store = createPinia();
var ls = new SecureLS({ isCompression: false });
createPersistedState({
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
});

const app = createApp(App);
app.use(store);
const i18n = createI18nInstance();
const Trans = createTrans(i18n);
window.Trans = Trans;
app.use(i18n);

app.config.globalProperties.Tr = Trans;
app.use(router);
app.use(SmartTable);
app.use(VueVirtualScroller);
app.use(VueLazyLoad);
app.component(VueQrcode.name, VueQrcode);
app.config.globalProperties.window = window; // global definer
app.config.globalProperties.siteName = siteName;
app.config.globalProperties.cors = cors;
app.config.globalProperties.ext = reactive(ext);

app.mount("#app");

// Toast //
app.use(Toast, {
    hideProgressBar: true,
    closeOnClick: false,
    closeButton: false,
    icon: true,
    timeout: 2000,
    toastClassName: ["bg-light"],
    bodyClassName: [],
    transition: "Vue-Toastification__fade",
});
app.config.globalProperties.$toast = useToast();
window.$toast = useToast();
Trans.switchLanguage(Trans.guessDefaultLocale());
