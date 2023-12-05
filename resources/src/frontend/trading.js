// Third-party modules
import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import createPersistedState from "pinia-persistedstate";
import SecureLS from "secure-ls";
import Toast from "vue-toastification";
import SmartTable from "vuejs-smart-table";
import VueVirtualScroller from "vue-virtual-scroller";
import VueLazyLoad from "@/modules/vue3-lazyload/dist/index.mjs";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { useToast } from "vue-toastification";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// Styles
import "vue-toastification/dist/index.css";
import "swiper/swiper-bundle.min.css";
import "@/scss/toast.scss";

// App components
import App from "./Trading.vue";
import router from "./router";
import createI18nInstance from "@/modules/i18n";
import createTrans from "@/modules/translation";

// Flowbite and Bootstrap
import "@/flowbite";
import "@/modules/bootstrap";

// Pinia state management
const store = createPinia();
const ls = new SecureLS({ isCompression: false });
createPersistedState({
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
});

const app = createApp(App);

// Global properties
app.config.globalProperties.window = window;
app.config.globalProperties.siteName = siteName;
app.config.globalProperties.cors = cors;
app.config.globalProperties.ext = reactive(ext);

// Use plugins
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
app.use(FloatingVue)
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
app.component(VueQrcode.name, VueQrcode);
app.config.globalProperties.$toast = useToast();
window.$toast = useToast();

// Intercept axios responses
window.axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (401 === error.response.status || 419 === error.response.status) {
            // window.location.reload();
        }

        return Promise.reject(error);
    }
);

app.mount("#trade");
Trans.switchLanguage(Trans.guessDefaultLocale());
