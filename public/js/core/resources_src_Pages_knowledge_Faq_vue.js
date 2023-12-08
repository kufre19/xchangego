"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_knowledge_Faq_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  // component list
  components: {},
  // component data
  data: function data() {
    return {
      categories: []
    };
  },
  // custom methods
  methods: {
    goBack: function goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    fetchCategories: function fetchCategories() {
      var _this = this;

      this.$http.get("/user/knowledge/faq").then(function (response) {
        _this.categories = response.data.categories;
      })["catch"](function (error) {});
    },
    search: function search() {
      this.$router.push("/knowledge/faq/" + this.$refs.search.value)["catch"](function (err) {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (err.name !== "NavigationDuplicated" && !err.message.includes("Avoided redundant navigation to current location")) {
          // But print any other errors to the console
          logError(err);
        }
      });
    }
  },
  // on component created
  created: function created() {},
  // on component mounted
  mounted: function mounted() {
    this.fetchCategories();
  },
  // on component destroyed
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.faq-search[data-v-222a8607] {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.faq-search .faq-search-input .input-group[data-v-222a8607]:focus-within {\n    box-shadow: none;\n}\n.faq-contact .faq-contact-card[data-v-222a8607] {\n    background-color: rgba(186, 191, 199, 0.12);\n}\n@media (min-width: 992px) {\n.faq-search .card-body[data-v-222a8607] {\n        padding: 8rem !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n.faq-search .card-body[data-v-222a8607] {\n        padding: 6rem !important;\n}\n}\n@media (min-width: 768px) {\n.faq-search .faq-search-input .input-group[data-v-222a8607] {\n        width: 576px;\n        margin: 0 auto;\n}\n.faq-navigation[data-v-222a8607] {\n        height: 550px;\n}\n}\n", "",{"version":3,"sources":["webpack://./resources/src/Pages/knowledge/Faq.vue"],"names":[],"mappings":";AAgPA;IACA,sBAAA;IACA,sDAAA;AACA;AACA;IACA,gBAAA;AACA;AAEA;IACA,2CAAA;AACA;AAEA;AACA;QACA,wBAAA;AACA;AACA;AACA;AACA;QACA,wBAAA;AACA;AACA;AACA;AACA;QACA,YAAA;QACA,cAAA;AACA;AACA;QACA,aAAA;AACA;AACA","sourcesContent":["<template>\n    <div>\n        <section id=\"faq-search-filter\">\n            <div\n                class=\"card faq-search\"\n                style=\"background-image: url('images/banner/banner.png')\"\n            >\n                <div class=\"card-body text-center\">\n                    <!-- main title -->\n                    <h2 class=\"text-primary\">\n                        {{ $t(\"Let's answer some questions\") }}\n                    </h2>\n\n                    <!-- subtitle -->\n                    <p class=\"card-text mb-2\">\n                        {{\n                            $t(\n                                \"or choose a category to quickly find the help you need\"\n                            )\n                        }}\n                    </p>\n\n                    <!-- search input -->\n                    <form class=\"faq-search-input\" @submit.prevent=\"search()\">\n                        <div class=\"input-group input-group-merge\">\n                            <div class=\"input-group-text\">\n                                <i class=\"bi bi-search\"></i>\n                            </div>\n                            <input\n                                type=\"text\"\n                                class=\"form-control\"\n                                placeholder=\"Search faq...\"\n                                ref=\"search\"\n                            />\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </section>\n        <!--/ Knowledge base Jumbotron -->\n\n        <!-- Knowledge base -->\n        <section id=\"faq-tabs\">\n            <!-- vertical tab pill -->\n            <div class=\"row\">\n                <div class=\"col-lg-3 col-md-4 col-sm-12\">\n                    <div\n                        class=\"faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0\"\n                    >\n                        <!-- pill tabs navigation -->\n                        <ul\n                            class=\"nav nav-pills nav-left flex-column\"\n                            role=\"tablist\"\n                        >\n                            <!-- payment -->\n                            <li\n                                class=\"nav-item\"\n                                v-for=\"(faqs, index) in categories\"\n                                :key=\"index\"\n                            >\n                                <a\n                                    class=\"nav-link\"\n                                    :class=\"faqs.id == 1 ? 'active' : ''\"\n                                    :id=\"faqs.id\"\n                                    data-bs-toggle=\"pill\"\n                                    :href=\"'#faq-category-' + faqs.id\"\n                                    aria-expanded=\"true\"\n                                    role=\"tab\"\n                                >\n                                    <i\n                                        data-feather=\"credit-card\"\n                                        class=\"font-medium-3 me-1\"\n                                    ></i>\n                                    <span class=\"fw-bold\">{{\n                                        faqs.category\n                                    }}</span>\n                                </a>\n                            </li>\n                        </ul>\n\n                        <!-- FAQ image -->\n                        <img\n                            src=\"images/illustration/faq-illustrations.svg\"\n                            class=\"img-fluid d-none d-md-block\"\n                            alt=\"demand img\"\n                        />\n                    </div>\n                </div>\n\n                <div class=\"col-lg-9 col-md-8 col-sm-12\">\n                    <!-- pill tabs tab content -->\n                    <div class=\"tab-content\">\n                        <div\n                            v-for=\"(faqs, index) in categories\"\n                            :key=\"index\"\n                            class=\"tab-pane\"\n                            :class=\"faqs.id == 1 ? 'active' : ''\"\n                            :id=\"'faq-category-' + faqs.id\"\n                            role=\"tabpanel\"\n                            :aria-labelledby=\"faqs.category\"\n                            aria-expanded=\"false\"\n                        >\n                            <!-- icon and header -->\n                            <div class=\"d-flex align-items-center\">\n                                <div\n                                    class=\"avatar avatar-tag bg-light-primary me-1\"\n                                >\n                                    <i class=\"font-medium-4 bi bi-info-lg\"></i>\n                                </div>\n                                <div>\n                                    <h4 class=\"mb-0\">{{ faqs.category }}</h4>\n                                </div>\n                            </div>\n\n                            <!-- frequent answer and question  collapse  -->\n                            <div\n                                v-for=\"(faq, indexx) in faqs.faq_questions\"\n                                :key=\"indexx\"\n                                class=\"accordion accordion-margin mt-2\"\n                                :id=\"'#faq-question-' + faq.id\"\n                            >\n                                <div class=\"card accordion-item\">\n                                    <h2\n                                        class=\"accordion-header\"\n                                        :id=\"faq.category_id + faq.id\"\n                                    >\n                                        <button\n                                            class=\"accordion-button collapsed\"\n                                            data-bs-toggle=\"collapse\"\n                                            role=\"button\"\n                                            :data-bs-target=\"\n                                                '#faq-question-' + faq.id\n                                            \"\n                                            :aria-controls=\"\n                                                '#faq-question-' + faq.id\n                                            \"\n                                            aria-expanded=\"false\"\n                                        >\n                                            {{ faq.question }}\n                                        </button>\n                                    </h2>\n\n                                    <div\n                                        :id=\"'faq-question-' + faq.id\"\n                                        class=\"collapse accordion-collapse\"\n                                        :aria-labelledby=\"\n                                            faq.category_id + faq.id\n                                        \"\n                                        :data-bs-parent=\"'#faq' + faq.id\"\n                                    >\n                                        <div class=\"accordion-body text-dark\">\n                                            {{ faq.answer }}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <!-- / frequently asked questions tabs pills -->\n\n        <!-- contact us -->\n        <section class=\"faq-contact\">\n            <div class=\"row mt-5 pt-75\">\n                <div class=\"col-12 text-center\">\n                    <h2>{{ $t(\"You still have a question\") }}?</h2>\n                    <p class=\"mb-3\">\n                        {{\n                            $t(\n                                \"If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!\"\n                            )\n                        }}\n                    </p>\n                </div>\n            </div>\n        </section>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: [],\n    // component list\n    components: {},\n\n    // component data\n    data() {\n        return {\n            categories: [],\n        };\n    },\n\n    // custom methods\n    methods: {\n        goBack() {\n            window.history.length > 1\n                ? this.$router.go(-1)\n                : this.$router.push(\"/\");\n        },\n        fetchCategories() {\n            this.$http\n                .get(\"/user/knowledge/faq\")\n                .then((response) => {\n                    this.categories = response.data.categories;\n                })\n                .catch((error) => {});\n        },\n        search() {\n            this.$router\n                .push(\"/knowledge/faq/\" + this.$refs.search.value)\n                .catch((err) => {\n                    // Ignore the vuex err regarding  navigating to the page they are already on.\n                    if (\n                        err.name !== \"NavigationDuplicated\" &&\n                        !err.message.includes(\n                            \"Avoided redundant navigation to current location\"\n                        )\n                    ) {\n                        // But print any other errors to the console\n                        logError(err);\n                    }\n                });\n        },\n    },\n\n    // on component created\n    created() {},\n\n    // on component mounted\n    mounted() {\n        this.fetchCategories();\n    },\n\n    // on component destroyed\n    destroyed() {},\n};\n</script>\n<style scoped>\n.faq-search {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.faq-search .faq-search-input .input-group:focus-within {\n    box-shadow: none;\n}\n\n.faq-contact .faq-contact-card {\n    background-color: rgba(186, 191, 199, 0.12);\n}\n\n@media (min-width: 992px) {\n    .faq-search .card-body {\n        padding: 8rem !important;\n    }\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n    .faq-search .card-body {\n        padding: 6rem !important;\n    }\n}\n@media (min-width: 768px) {\n    .faq-search .faq-search-input .input-group {\n        width: 576px;\n        margin: 0 auto;\n    }\n    .faq-navigation {\n        height: 550px;\n    }\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_222a8607_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_222a8607_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_222a8607_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/Pages/knowledge/Faq.vue":
/*!***********************************************!*\
  !*** ./resources/src/Pages/knowledge/Faq.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Faq.vue?vue&type=template&id=222a8607&scoped=true& */ "./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true&");
/* harmony import */ var _Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Faq.vue?vue&type=script&lang=js& */ "./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js&");
/* harmony import */ var _Faq_vue_vue_type_style_index_0_id_222a8607_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& */ "./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "222a8607",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/knowledge/Faq.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Faq.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_222a8607_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=style&index=0&id=222a8607&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_222a8607_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Faq.vue?vue&type=template&id=222a8607&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Faq.vue?vue&type=template&id=222a8607&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("section", { attrs: { id: "faq-search-filter" } }, [
      _c(
        "div",
        {
          staticClass: "card faq-search",
          staticStyle: {
            "background-image": "url('images/banner/banner.png')",
          },
        },
        [
          _c("div", { staticClass: "card-body text-center" }, [
            _c("h2", { staticClass: "text-primary" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.$t("Let's answer some questions")) +
                  "\n                "
              ),
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "card-text mb-2" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(
                    _vm.$t(
                      "or choose a category to quickly find the help you need"
                    )
                  ) +
                  "\n                "
              ),
            ]),
            _vm._v(" "),
            _c(
              "form",
              {
                staticClass: "faq-search-input",
                on: {
                  submit: function ($event) {
                    $event.preventDefault()
                    return _vm.search()
                  },
                },
              },
              [
                _c("div", { staticClass: "input-group input-group-merge" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("input", {
                    ref: "search",
                    staticClass: "form-control",
                    attrs: { type: "text", placeholder: "Search faq..." },
                  }),
                ]),
              ]
            ),
          ]),
        ]
      ),
    ]),
    _vm._v(" "),
    _c("section", { attrs: { id: "faq-tabs" } }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-lg-3 col-md-4 col-sm-12" }, [
          _c(
            "div",
            {
              staticClass:
                "faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0",
            },
            [
              _c(
                "ul",
                {
                  staticClass: "nav nav-pills nav-left flex-column",
                  attrs: { role: "tablist" },
                },
                _vm._l(_vm.categories, function (faqs, index) {
                  return _c("li", { key: index, staticClass: "nav-item" }, [
                    _c(
                      "a",
                      {
                        staticClass: "nav-link",
                        class: faqs.id == 1 ? "active" : "",
                        attrs: {
                          id: faqs.id,
                          "data-bs-toggle": "pill",
                          href: "#faq-category-" + faqs.id,
                          "aria-expanded": "true",
                          role: "tab",
                        },
                      },
                      [
                        _c("i", {
                          staticClass: "font-medium-3 me-1",
                          attrs: { "data-feather": "credit-card" },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "fw-bold" }, [
                          _vm._v(_vm._s(faqs.category)),
                        ]),
                      ]
                    ),
                  ])
                }),
                0
              ),
              _vm._v(" "),
              _c("img", {
                staticClass: "img-fluid d-none d-md-block",
                attrs: {
                  src: "images/illustration/faq-illustrations.svg",
                  alt: "demand img",
                },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-9 col-md-8 col-sm-12" }, [
          _c(
            "div",
            { staticClass: "tab-content" },
            _vm._l(_vm.categories, function (faqs, index) {
              return _c(
                "div",
                {
                  key: index,
                  staticClass: "tab-pane",
                  class: faqs.id == 1 ? "active" : "",
                  attrs: {
                    id: "faq-category-" + faqs.id,
                    role: "tabpanel",
                    "aria-labelledby": faqs.category,
                    "aria-expanded": "false",
                  },
                },
                [
                  _c("div", { staticClass: "d-flex align-items-center" }, [
                    _vm._m(1, true),
                    _vm._v(" "),
                    _c("div", [
                      _c("h4", { staticClass: "mb-0" }, [
                        _vm._v(_vm._s(faqs.category)),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _vm._l(faqs.faq_questions, function (faq, indexx) {
                    return _c(
                      "div",
                      {
                        key: indexx,
                        staticClass: "accordion accordion-margin mt-2",
                        attrs: { id: "#faq-question-" + faq.id },
                      },
                      [
                        _c("div", { staticClass: "card accordion-item" }, [
                          _c(
                            "h2",
                            {
                              staticClass: "accordion-header",
                              attrs: { id: faq.category_id + faq.id },
                            },
                            [
                              _c(
                                "button",
                                {
                                  staticClass: "accordion-button collapsed",
                                  attrs: {
                                    "data-bs-toggle": "collapse",
                                    role: "button",
                                    "data-bs-target": "#faq-question-" + faq.id,
                                    "aria-controls": "#faq-question-" + faq.id,
                                    "aria-expanded": "false",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(faq.question) +
                                      "\n                                    "
                                  ),
                                ]
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "collapse accordion-collapse",
                              attrs: {
                                id: "faq-question-" + faq.id,
                                "aria-labelledby": faq.category_id + faq.id,
                                "data-bs-parent": "#faq" + faq.id,
                              },
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "accordion-body text-dark" },
                                [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(faq.answer) +
                                      "\n                                    "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]),
                      ]
                    )
                  }),
                ],
                2
              )
            }),
            0
          ),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("section", { staticClass: "faq-contact" }, [
      _c("div", { staticClass: "row mt-5 pt-75" }, [
        _c("div", { staticClass: "col-12 text-center" }, [
          _c("h2", [_vm._v(_vm._s(_vm.$t("You still have a question")) + "?")]),
          _vm._v(" "),
          _c("p", { staticClass: "mb-3" }, [
            _vm._v(
              "\n                    " +
                _vm._s(
                  _vm.$t(
                    "If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!"
                  )
                ) +
                "\n                "
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-text" }, [
      _c("i", { staticClass: "bi bi-search" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar avatar-tag bg-light-primary me-1" },
      [_c("i", { staticClass: "font-medium-4 bi bi-info-lg" })]
    )
  },
]
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX2tub3dsZWRnZV9GYXFfdnVlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0xBLGlFQUFlO0VBQ2ZBLFNBREE7RUFFQTtFQUNBQyxjQUhBO0VBS0E7RUFDQUMsSUFOQSxrQkFNQTtJQUNBO01BQ0FDO0lBREE7RUFHQSxDQVZBO0VBWUE7RUFDQUM7SUFDQUMsTUFEQSxvQkFDQTtNQUNBQyw0QkFDQSxtQkFEQSxHQUVBLHNCQUZBO0lBR0EsQ0FMQTtJQU1BQyxlQU5BLDZCQU1BO01BQUE7O01BQ0EsV0FDQUMsR0FEQSxDQUNBLHFCQURBLEVBRUFDLElBRkEsQ0FFQTtRQUNBO01BQ0EsQ0FKQSxXQUtBLG1CQUxBO0lBTUEsQ0FiQTtJQWNBQyxNQWRBLG9CQWNBO01BQ0EsYUFDQUMsSUFEQSxDQUNBLDJDQURBLFdBRUE7UUFDQTtRQUNBLElBQ0FDLHVDQUNBLHNCQUNBLGtEQURBLENBRkEsRUFLQTtVQUNBO1VBQ0FDO1FBQ0E7TUFDQSxDQWJBO0lBY0E7RUE3QkEsQ0FiQTtFQTZDQTtFQUNBQyxPQTlDQSxxQkE4Q0EsRUE5Q0E7RUFnREE7RUFDQUMsT0FqREEscUJBaURBO0lBQ0E7RUFDQSxDQW5EQTtFQXFEQTtFQUNBQyxTQXREQSx1QkFzREE7QUF0REE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RMQTtBQUN3SjtBQUM3QjtBQUMzSCw4QkFBOEIsNEdBQTJCLENBQUMsaUlBQXFDO0FBQy9GO0FBQ0EsMEVBQTBFLDZCQUE2Qiw2REFBNkQsR0FBRyw0RUFBNEUsdUJBQXVCLEdBQUcsbURBQW1ELGtEQUFrRCxHQUFHLDZCQUE2QiwyQ0FBMkMsbUNBQW1DLEdBQUcsR0FBRyx1REFBdUQsMkNBQTJDLG1DQUFtQyxHQUFHLEdBQUcsNkJBQTZCLCtEQUErRCx1QkFBdUIseUJBQXlCLEdBQUcsb0NBQW9DLHdCQUF3QixHQUFHLEdBQUcsU0FBUyxvR0FBb0csTUFBTSxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxpYUFBaWEsc0NBQXNDLGtKQUFrSix3TEFBd0wsbThFQUFtOEUsK0ZBQStGLDRtREFBNG1ELGdCQUFnQixrakRBQWtqRCxlQUFlLHlzQkFBeXNCLGFBQWEsbWlCQUFtaUIsb0NBQW9DLDBFQUEwRSxxT0FBcU8saUpBQWlKLDJEQUEyRCx3Q0FBd0Msa0JBQWtCLHlDQUF5QyxPQUFPLDBDQUEwQyxvQkFBb0IsMkhBQTJILFdBQVcsOEJBQThCLDhHQUE4RyxpRUFBaUUsbUJBQW1CLHVDQUF1QyxFQUFFLFdBQVcscUJBQXFCLG1JQUFtSSxxWEFBcVgsOEdBQThHLHVCQUF1QixtQkFBbUIsRUFBRSxXQUFXLFFBQVEsa0RBQWtELGlEQUFpRCxpQ0FBaUMsT0FBTyxzREFBc0QsS0FBSywwQ0FBMEMsNkJBQTZCLDZEQUE2RCxHQUFHLDJEQUEyRCx1QkFBdUIsR0FBRyxvQ0FBb0Msa0RBQWtELEdBQUcsK0JBQStCLDhCQUE4QixtQ0FBbUMsT0FBTyxHQUFHLHVEQUF1RCw4QkFBOEIsbUNBQW1DLE9BQU8sR0FBRyw2QkFBNkIsa0RBQWtELHVCQUF1Qix5QkFBeUIsT0FBTyx1QkFBdUIsd0JBQXdCLE9BQU8sR0FBRywrQkFBK0I7QUFDeGpYO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1AyRDtBQUNsRyxZQUFzYjs7QUFFdGI7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsK1hBQU87Ozs7QUFJeEIsaUVBQWUsc1lBQWMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWjJEO0FBQ3ZDO0FBQ0w7QUFDbEQsQ0FBdUY7OztBQUd2RjtBQUNnRztBQUNoRyxnQkFBZ0IsdUdBQVU7QUFDMUIsRUFBRSx5RUFBTTtBQUNSLEVBQUUsdUZBQU07QUFDUixFQUFFLGdHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdkNvTSxDQUFDLGlFQUFlLHdNQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUdBdk87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLDJCQUEyQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0Esc0JBQXNCLHNDQUFzQztBQUM1RCx1QkFBdUIsNkJBQTZCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLCtCQUErQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0EsNEJBQTRCLDhDQUE4QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRDQUE0QztBQUN6RSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLGtCQUFrQjtBQUMvQyxrQkFBa0Isb0JBQW9CO0FBQ3RDLG9CQUFvQiw0Q0FBNEM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QyxpQkFBaUI7QUFDakI7QUFDQSxvQ0FBb0MscUNBQXFDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywrQkFBK0I7QUFDbEUseUJBQXlCO0FBQ3pCO0FBQ0EscUNBQXFDLHdCQUF3QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRDQUE0QztBQUNoRTtBQUNBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQjtBQUNBLDhCQUE4QiwwQ0FBMEM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtCQUErQjtBQUNoRSx1QkFBdUI7QUFDdkI7QUFDQSxvQ0FBb0Msb0NBQW9DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDhCQUE4QjtBQUNyRSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5Q0FBeUM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQsa0JBQWtCLCtCQUErQjtBQUNqRCxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUNBQWlDO0FBQ3hELGdCQUFnQiw2QkFBNkI7QUFDN0M7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBd0Q7QUFDaEUsaUJBQWlCLDRDQUE0QztBQUM3RDtBQUNBLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxLnZ1ZT84YzAxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcS52dWU/Nzg4MiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXEudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcS52dWU/OWM1MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXEudnVlP2M2NTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxLnZ1ZT8zNGM3Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcS52dWU/OGQ4MyJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJmYXEtc2VhcmNoLWZpbHRlclwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FyZCBmYXEtc2VhcmNoXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL2Jhbm5lci9iYW5uZXIucG5nJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBtYWluIHRpdGxlIC0tPlxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiTGV0J3MgYW5zd2VyIHNvbWUgcXVlc3Rpb25zXCIpIH19XG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBzdWJ0aXRsZSAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHQgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvciBjaG9vc2UgYSBjYXRlZ29yeSB0byBxdWlja2x5IGZpbmQgdGhlIGhlbHAgeW91IG5lZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIHNlYXJjaCBpbnB1dCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJmYXEtc2VhcmNoLWlucHV0XCIgQHN1Ym1pdC5wcmV2ZW50PVwic2VhcmNoKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBpbnB1dC1ncm91cC1tZXJnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZmFxLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwhLS0vIEtub3dsZWRnZSBiYXNlIEp1bWJvdHJvbiAtLT5cblxuICAgICAgICA8IS0tIEtub3dsZWRnZSBiYXNlIC0tPlxuICAgICAgICA8c2VjdGlvbiBpZD1cImZhcS10YWJzXCI+XG4gICAgICAgICAgICA8IS0tIHZlcnRpY2FsIHRhYiBwaWxsIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNCBjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmYXEtbmF2aWdhdGlvbiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gZmxleC1jb2x1bW4gbWItMiBtYi1tZC0wXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBwaWxsIHRhYnMgbmF2aWdhdGlvbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmF2IG5hdi1waWxscyBuYXYtbGVmdCBmbGV4LWNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYmxpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gcGF5bWVudCAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGZhcXMsIGluZGV4KSBpbiBjYXRlZ29yaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cImZhcXMuaWQgPT0gMSA/ICdhY3RpdmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVwiZmFxcy5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXRvZ2dsZT1cInBpbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmhyZWY9XCInI2ZhcS1jYXRlZ29yeS0nICsgZmFxcy5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZlYXRoZXI9XCJjcmVkaXQtY2FyZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb250LW1lZGl1bS0zIG1lLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnctYm9sZFwiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFxcy5jYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBGQVEgaW1hZ2UgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL2lsbHVzdHJhdGlvbi9mYXEtaWxsdXN0cmF0aW9ucy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW1nLWZsdWlkIGQtbm9uZSBkLW1kLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJkZW1hbmQgaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy05IGNvbC1tZC04IGNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIHBpbGwgdGFicyB0YWIgY29udGVudCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoZmFxcywgaW5kZXgpIGluIGNhdGVnb3JpZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWItcGFuZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiZmFxcy5pZCA9PSAxID8gJ2FjdGl2ZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVwiJ2ZhcS1jYXRlZ29yeS0nICsgZmFxcy5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXJpYS1sYWJlbGxlZGJ5PVwiZmFxcy5jYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIGljb24gYW5kIGhlYWRlciAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImF2YXRhciBhdmF0YXItdGFnIGJnLWxpZ2h0LXByaW1hcnkgbWUtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZm9udC1tZWRpdW0tNCBiaSBiaS1pbmZvLWxnXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1iLTBcIj57eyBmYXFzLmNhdGVnb3J5IH19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIGZyZXF1ZW50IGFuc3dlciBhbmQgcXVlc3Rpb24gIGNvbGxhcHNlICAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGZhcSwgaW5kZXh4KSBpbiBmYXFzLmZhcV9xdWVzdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXh4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY2NvcmRpb24gYWNjb3JkaW9uLW1hcmdpbiBtdC0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVwiJyNmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBhY2NvcmRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY2NvcmRpb24taGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJmYXEuY2F0ZWdvcnlfaWQgKyBmYXEuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY2NvcmRpb24tYnV0dG9uIGNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdG9nZ2xlPVwiY29sbGFwc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGEtYnMtdGFyZ2V0PVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2ZhcS1xdWVzdGlvbi0nICsgZmFxLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWNvbnRyb2xzPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2ZhcS1xdWVzdGlvbi0nICsgZmFxLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBmYXEucXVlc3Rpb24gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCInZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY29sbGFwc2UgYWNjb3JkaW9uLWNvbGxhcHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXJpYS1sYWJlbGxlZGJ5PVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGEtYnMtcGFyZW50PVwiJyNmYXEnICsgZmFxLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHkgdGV4dC1kYXJrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZhcS5hbnN3ZXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwhLS0gLyBmcmVxdWVudGx5IGFza2VkIHF1ZXN0aW9ucyB0YWJzIHBpbGxzIC0tPlxuXG4gICAgICAgIDwhLS0gY29udGFjdCB1cyAtLT5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJmYXEtY29udGFjdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBtdC01IHB0LTc1XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+e3sgJHQoXCJZb3Ugc3RpbGwgaGF2ZSBhIHF1ZXN0aW9uXCIpIH19PzwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJZiB5b3UgY2Fubm90IGZpbmQgYSBxdWVzdGlvbiBpbiBvdXIgRkFRLCB5b3UgY2FuIGFsd2F5cyBjb250YWN0IHVzLiBXZSB3aWxsIGFuc3dlciB0byB5b3Ugc2hvcnRseSFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbXSxcbiAgICAvLyBjb21wb25lbnQgbGlzdFxuICAgIGNvbXBvbmVudHM6IHt9LFxuXG4gICAgLy8gY29tcG9uZW50IGRhdGFcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8vIGN1c3RvbSBtZXRob2RzXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnb0JhY2soKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLiRyb3V0ZXIuZ28oLTEpXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcygpIHtcbiAgICAgICAgICAgIHRoaXMuJGh0dHBcbiAgICAgICAgICAgICAgICAuZ2V0KFwiL3VzZXIva25vd2xlZGdlL2ZhcVwiKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwb25zZS5kYXRhLmNhdGVnb3JpZXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaCgpIHtcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlclxuICAgICAgICAgICAgICAgIC5wdXNoKFwiL2tub3dsZWRnZS9mYXEvXCIgKyB0aGlzLiRyZWZzLnNlYXJjaC52YWx1ZSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhlIHZ1ZXggZXJyIHJlZ2FyZGluZyAgbmF2aWdhdGluZyB0byB0aGUgcGFnZSB0aGV5IGFyZSBhbHJlYWR5IG9uLlxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIubmFtZSAhPT0gXCJOYXZpZ2F0aW9uRHVwbGljYXRlZFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBdm9pZGVkIHJlZHVuZGFudCBuYXZpZ2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1dCBwcmludCBhbnkgb3RoZXIgZXJyb3JzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBjcmVhdGVkXG4gICAgY3JlYXRlZCgpIHt9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IG1vdW50ZWRcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xuICAgIH0sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgZGVzdHJveWVkXG4gICAgZGVzdHJveWVkKCkge30sXG59O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLmZhcS1zZWFyY2gge1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTUsIDEwMywgMjQwLCAwLjEyKSAhaW1wb3J0YW50O1xufVxuLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwOmZvY3VzLXdpdGhpbiB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmZhcS1jb250YWN0IC5mYXEtY29udGFjdC1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4NiwgMTkxLCAxOTksIDAuMTIpO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgICAuZmFxLXNlYXJjaCAuY2FyZC1ib2R5IHtcbiAgICAgICAgcGFkZGluZzogOHJlbSAhaW1wb3J0YW50O1xuICAgIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XG4gICAgLmZhcS1zZWFyY2ggLmNhcmQtYm9keSB7XG4gICAgICAgIHBhZGRpbmc6IDZyZW0gIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAuZmFxLXNlYXJjaCAuZmFxLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXAge1xuICAgICAgICB3aWR0aDogNTc2cHg7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cbiAgICAuZmFxLW5hdmlnYXRpb24ge1xuICAgICAgICBoZWlnaHQ6IDU1MHB4O1xuICAgIH1cbn1cbjwvc3R5bGU+XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1taXgvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmZhcS1zZWFyY2hbZGF0YS12LTIyMmE4NjA3XSB7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE1LCAxMDMsIDI0MCwgMC4xMikgIWltcG9ydGFudDtcXG59XFxuLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwW2RhdGEtdi0yMjJhODYwN106Zm9jdXMtd2l0aGluIHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuLmZhcS1jb250YWN0IC5mYXEtY29udGFjdC1jYXJkW2RhdGEtdi0yMjJhODYwN10ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4NiwgMTkxLCAxOTksIDAuMTIpO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcXG4uZmFxLXNlYXJjaCAuY2FyZC1ib2R5W2RhdGEtdi0yMjJhODYwN10ge1xcbiAgICAgICAgcGFkZGluZzogOHJlbSAhaW1wb3J0YW50O1xcbn1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcXG4uZmFxLXNlYXJjaCAuY2FyZC1ib2R5W2RhdGEtdi0yMjJhODYwN10ge1xcbiAgICAgICAgcGFkZGluZzogNnJlbSAhaW1wb3J0YW50O1xcbn1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwW2RhdGEtdi0yMjJhODYwN10ge1xcbiAgICAgICAgd2lkdGg6IDU3NnB4O1xcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxufVxcbi5mYXEtbmF2aWdhdGlvbltkYXRhLXYtMjIyYTg2MDddIHtcXG4gICAgICAgIGhlaWdodDogNTUwcHg7XFxufVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXEudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFnUEE7SUFDQSxzQkFBQTtJQUNBLHNEQUFBO0FBQ0E7QUFDQTtJQUNBLGdCQUFBO0FBQ0E7QUFFQTtJQUNBLDJDQUFBO0FBQ0E7QUFFQTtBQUNBO1FBQ0Esd0JBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRQUNBLHdCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUFDQSxZQUFBO1FBQ0EsY0FBQTtBQUNBO0FBQ0E7UUFDQSxhQUFBO0FBQ0E7QUFDQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuICAgIDxkaXY+XFxuICAgICAgICA8c2VjdGlvbiBpZD1cXFwiZmFxLXNlYXJjaC1maWx0ZXJcXFwiPlxcbiAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImNhcmQgZmFxLXNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgc3R5bGU9XFxcImJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL2Jhbm5lci9iYW5uZXIucG5nJylcXFwiXFxuICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLWJvZHkgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBtYWluIHRpdGxlIC0tPlxcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ0ZXh0LXByaW1hcnlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFxcXCJMZXQncyBhbnN3ZXIgc29tZSBxdWVzdGlvbnNcXFwiKSB9fVxcbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gc3VidGl0bGUgLS0+XFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiY2FyZC10ZXh0IG1iLTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcIm9yIGNob29zZSBhIGNhdGVnb3J5IHRvIHF1aWNrbHkgZmluZCB0aGUgaGVscCB5b3UgbmVlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XFxuICAgICAgICAgICAgICAgICAgICA8L3A+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8IS0tIHNlYXJjaCBpbnB1dCAtLT5cXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmYXEtc2VhcmNoLWlucHV0XFxcIiBAc3VibWl0LnByZXZlbnQ9XFxcInNlYXJjaCgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cCBpbnB1dC1ncm91cC1tZXJnZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwLXRleHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImJpIGJpLXNlYXJjaFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJTZWFyY2ggZmFxLi4uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVxcXCJzZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgPCEtLS8gS25vd2xlZGdlIGJhc2UgSnVtYm90cm9uIC0tPlxcblxcbiAgICAgICAgPCEtLSBLbm93bGVkZ2UgYmFzZSAtLT5cXG4gICAgICAgIDxzZWN0aW9uIGlkPVxcXCJmYXEtdGFic1xcXCI+XFxuICAgICAgICAgICAgPCEtLSB2ZXJ0aWNhbCB0YWIgcGlsbCAtLT5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMyBjb2wtbWQtNCBjb2wtc20tMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmYXEtbmF2aWdhdGlvbiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gZmxleC1jb2x1bW4gbWItMiBtYi1tZC0wXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gcGlsbCB0YWJzIG5hdmlnYXRpb24gLS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzIG5hdi1sZWZ0IGZsZXgtY29sdW1uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVxcXCJ0YWJsaXN0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBwYXltZW50IC0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGlcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVxcXCIoZmFxcywgaW5kZXgpIGluIGNhdGVnb3JpZXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibmF2LWxpbmtcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVxcXCJmYXFzLmlkID09IDEgPyAnYWN0aXZlJyA6ICcnXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwiZmFxcy5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXRvZ2dsZT1cXFwicGlsbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aHJlZj1cXFwiJyNmYXEtY2F0ZWdvcnktJyArIGZhcXMuaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cXFwidHJ1ZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVxcXCJ0YWJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1mZWF0aGVyPVxcXCJjcmVkaXQtY2FyZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImZvbnQtbWVkaXVtLTMgbWUtMVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJmdy1ib2xkXFxcIj57e1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXFzLmNhdGVnb3J5XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZBUSBpbWFnZSAtLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiaW1hZ2VzL2lsbHVzdHJhdGlvbi9mYXEtaWxsdXN0cmF0aW9ucy5zdmdcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpbWctZmx1aWQgZC1ub25lIGQtbWQtYmxvY2tcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiZGVtYW5kIGltZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctOSBjb2wtbWQtOCBjb2wtc20tMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBwaWxsIHRhYnMgdGFiIGNvbnRlbnQgLS0+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cXFwiKGZhcXMsIGluZGV4KSBpbiBjYXRlZ29yaWVzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcInRhYi1wYW5lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XFxcImZhcXMuaWQgPT0gMSA/ICdhY3RpdmUnIDogJydcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwiJ2ZhcS1jYXRlZ29yeS0nICsgZmFxcy5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwidGFicGFuZWxcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWxhYmVsbGVkYnk9XFxcImZhcXMuY2F0ZWdvcnlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBpY29uIGFuZCBoZWFkZXIgLS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJhdmF0YXIgYXZhdGFyLXRhZyBiZy1saWdodC1wcmltYXJ5IG1lLTFcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZvbnQtbWVkaXVtLTQgYmkgYmktaW5mby1sZ1xcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwibWItMFxcXCI+e3sgZmFxcy5jYXRlZ29yeSB9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gZnJlcXVlbnQgYW5zd2VyIGFuZCBxdWVzdGlvbiAgY29sbGFwc2UgIC0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cXFwiKGZhcSwgaW5kZXh4KSBpbiBmYXFzLmZhcV9xdWVzdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJpbmRleHhcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiYWNjb3JkaW9uIGFjY29yZGlvbi1tYXJnaW4gbXQtMlxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwiJyNmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZCBhY2NvcmRpb24taXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJhY2NvcmRpb24taGVhZGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XFxcImZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJhY2NvcmRpb24tYnV0dG9uIGNvbGxhcHNlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XFxcImJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkYXRhLWJzLXRhcmdldD1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFyaWEtY29udHJvbHM9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBmYXEucXVlc3Rpb24gfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwiJ2ZhcS1xdWVzdGlvbi0nICsgZmFxLmlkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiY29sbGFwc2UgYWNjb3JkaW9uLWNvbGxhcHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXJpYS1sYWJlbGxlZGJ5PVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkYXRhLWJzLXBhcmVudD1cXFwiJyNmYXEnICsgZmFxLmlkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWNjb3JkaW9uLWJvZHkgdGV4dC1kYXJrXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZhcS5hbnN3ZXIgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICA8IS0tIC8gZnJlcXVlbnRseSBhc2tlZCBxdWVzdGlvbnMgdGFicyBwaWxscyAtLT5cXG5cXG4gICAgICAgIDwhLS0gY29udGFjdCB1cyAtLT5cXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJmYXEtY29udGFjdFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IG10LTUgcHQtNzVcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGgyPnt7ICR0KFxcXCJZb3Ugc3RpbGwgaGF2ZSBhIHF1ZXN0aW9uXFxcIikgfX0/PC9oMj5cXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJtYi0zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7e1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJJZiB5b3UgY2Fubm90IGZpbmQgYSBxdWVzdGlvbiBpbiBvdXIgRkFRLCB5b3UgY2FuIGFsd2F5cyBjb250YWN0IHVzLiBXZSB3aWxsIGFuc3dlciB0byB5b3Ugc2hvcnRseSFcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvc2VjdGlvbj5cXG4gICAgPC9kaXY+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gICAgcHJvcHM6IFtdLFxcbiAgICAvLyBjb21wb25lbnQgbGlzdFxcbiAgICBjb21wb25lbnRzOiB7fSxcXG5cXG4gICAgLy8gY29tcG9uZW50IGRhdGFcXG4gICAgZGF0YSgpIHtcXG4gICAgICAgIHJldHVybiB7XFxuICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXFxuICAgICAgICB9O1xcbiAgICB9LFxcblxcbiAgICAvLyBjdXN0b20gbWV0aG9kc1xcbiAgICBtZXRob2RzOiB7XFxuICAgICAgICBnb0JhY2soKSB7XFxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMVxcbiAgICAgICAgICAgICAgICA/IHRoaXMuJHJvdXRlci5nbygtMSlcXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRyb3V0ZXIucHVzaChcXFwiL1xcXCIpO1xcbiAgICAgICAgfSxcXG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcygpIHtcXG4gICAgICAgICAgICB0aGlzLiRodHRwXFxuICAgICAgICAgICAgICAgIC5nZXQoXFxcIi91c2VyL2tub3dsZWRnZS9mYXFcXFwiKVxcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuY2F0ZWdvcmllcztcXG4gICAgICAgICAgICAgICAgfSlcXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge30pO1xcbiAgICAgICAgfSxcXG4gICAgICAgIHNlYXJjaCgpIHtcXG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXJcXG4gICAgICAgICAgICAgICAgLnB1c2goXFxcIi9rbm93bGVkZ2UvZmFxL1xcXCIgKyB0aGlzLiRyZWZzLnNlYXJjaC52YWx1ZSlcXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcXG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgdnVleCBlcnIgcmVnYXJkaW5nICBuYXZpZ2F0aW5nIHRvIHRoZSBwYWdlIHRoZXkgYXJlIGFscmVhZHkgb24uXFxuICAgICAgICAgICAgICAgICAgICBpZiAoXFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm5hbWUgIT09IFxcXCJOYXZpZ2F0aW9uRHVwbGljYXRlZFxcXCIgJiZcXG4gICAgICAgICAgICAgICAgICAgICAgICAhZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJBdm9pZGVkIHJlZHVuZGFudCBuYXZpZ2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnV0IHByaW50IGFueSBvdGhlciBlcnJvcnMgdG8gdGhlIGNvbnNvbGVcXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dFcnJvcihlcnIpO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB9KTtcXG4gICAgICAgIH0sXFxuICAgIH0sXFxuXFxuICAgIC8vIG9uIGNvbXBvbmVudCBjcmVhdGVkXFxuICAgIGNyZWF0ZWQoKSB7fSxcXG5cXG4gICAgLy8gb24gY29tcG9uZW50IG1vdW50ZWRcXG4gICAgbW91bnRlZCgpIHtcXG4gICAgICAgIHRoaXMuZmV0Y2hDYXRlZ29yaWVzKCk7XFxuICAgIH0sXFxuXFxuICAgIC8vIG9uIGNvbXBvbmVudCBkZXN0cm95ZWRcXG4gICAgZGVzdHJveWVkKCkge30sXFxufTtcXG48L3NjcmlwdD5cXG48c3R5bGUgc2NvcGVkPlxcbi5mYXEtc2VhcmNoIHtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTUsIDEwMywgMjQwLCAwLjEyKSAhaW1wb3J0YW50O1xcbn1cXG4uZmFxLXNlYXJjaCAuZmFxLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXA6Zm9jdXMtd2l0aGluIHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuLmZhcS1jb250YWN0IC5mYXEtY29udGFjdC1jYXJkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODYsIDE5MSwgMTk5LCAwLjEyKTtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuICAgIC5mYXEtc2VhcmNoIC5jYXJkLWJvZHkge1xcbiAgICAgICAgcGFkZGluZzogOHJlbSAhaW1wb3J0YW50O1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XFxuICAgIC5mYXEtc2VhcmNoIC5jYXJkLWJvZHkge1xcbiAgICAgICAgcGFkZGluZzogNnJlbSAhaW1wb3J0YW50O1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgICAuZmFxLXNlYXJjaCAuZmFxLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXAge1xcbiAgICAgICAgd2lkdGg6IDU3NnB4O1xcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIH1cXG4gICAgLmZhcS1uYXZpZ2F0aW9uIHtcXG4gICAgICAgIGhlaWdodDogNTUwcHg7XFxuICAgIH1cXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsyXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZhcS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yMjJhODYwNyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZhcS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjIyYTg2MDcmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRmFxLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRmFxLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9GYXEudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjIyYTg2MDcmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjIyMmE4NjA3XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzIyMmE4NjA3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzIyMmE4NjA3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzIyMmE4NjA3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9GYXEudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIyMmE4NjA3JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzIyMmE4NjA3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXEudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC01WzBdLnJ1bGVzWzBdLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZhcS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GYXEudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1taXgvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNjVbMF0ucnVsZXNbMF0udXNlWzFdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNjVbMF0ucnVsZXNbMF0udXNlWzJdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmFxLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTIyMmE4NjA3JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZhcS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjIyYTg2MDcmc2NvcGVkPXRydWUmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJzZWN0aW9uXCIsIHsgYXR0cnM6IHsgaWQ6IFwiZmFxLXNlYXJjaC1maWx0ZXJcIiB9IH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZCBmYXEtc2VhcmNoXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiOiBcInVybCgnaW1hZ2VzL2Jhbm5lci9iYW5uZXIucG5nJylcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHkgdGV4dC1jZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImgyXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1wcmltYXJ5XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJMZXQncyBhbnN3ZXIgc29tZSBxdWVzdGlvbnNcIikpICtcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLXRleHQgbWItMlwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgIF92bS4kdChcbiAgICAgICAgICAgICAgICAgICAgICBcIm9yIGNob29zZSBhIGNhdGVnb3J5IHRvIHF1aWNrbHkgZmluZCB0aGUgaGVscCB5b3UgbmVlZFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkgK1xuICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZhcS1zZWFyY2gtaW5wdXRcIixcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VhcmNoKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtbWVyZ2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX20oMCksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggZmFxLi4uXCIgfSxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApLFxuICAgICAgICAgIF0pLFxuICAgICAgICBdXG4gICAgICApLFxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXCJzZWN0aW9uXCIsIHsgYXR0cnM6IHsgaWQ6IFwiZmFxLXRhYnNcIiB9IH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1sZy0zIGNvbC1tZC00IGNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgIFwiZmFxLW5hdmlnYXRpb24gZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtY29sdW1uIG1iLTIgbWItbWQtMFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdiBuYXYtcGlsbHMgbmF2LWxlZnQgZmxleC1jb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvbGU6IFwidGFibGlzdFwiIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmNhdGVnb3JpZXMsIGZ1bmN0aW9uIChmYXFzLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwibGlcIiwgeyBrZXk6IGluZGV4LCBzdGF0aWNDbGFzczogXCJuYXYtaXRlbVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBmYXFzLmlkID09IDEgPyBcImFjdGl2ZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmYXFzLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdG9nZ2xlXCI6IFwicGlsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBcIiNmYXEtY2F0ZWdvcnktXCIgKyBmYXFzLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtZXhwYW5kZWRcIjogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IFwidGFiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9udC1tZWRpdW0tMyBtZS0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwiZGF0YS1mZWF0aGVyXCI6IFwiY3JlZGl0LWNhcmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZnctYm9sZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhmYXFzLmNhdGVnb3J5KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImltZy1mbHVpZCBkLW5vbmUgZC1tZC1ibG9ja1wiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IFwiaW1hZ2VzL2lsbHVzdHJhdGlvbi9mYXEtaWxsdXN0cmF0aW9ucy5zdmdcIixcbiAgICAgICAgICAgICAgICAgIGFsdDogXCJkZW1hbmQgaW1nXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLWxnLTkgY29sLW1kLTggY29sLXNtLTEyXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGFiLWNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5jYXRlZ29yaWVzLCBmdW5jdGlvbiAoZmFxcywgaW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogZmFxcy5pZCA9PSAxID8gXCJhY3RpdmVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXEtY2F0ZWdvcnktXCIgKyBmYXFzLmlkLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiBcInRhYnBhbmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IGZhcXMuY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX20oMSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImg0XCIsIHsgc3RhdGljQ2xhc3M6IFwibWItMFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoZmFxcy5jYXRlZ29yeSkpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fbChmYXFzLmZhcV9xdWVzdGlvbnMsIGZ1bmN0aW9uIChmYXEsIGluZGV4eCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4eCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFjY29yZGlvbiBhY2NvcmRpb24tbWFyZ2luIG10LTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcIiNmYXEtcXVlc3Rpb24tXCIgKyBmYXEuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZCBhY2NvcmRpb24taXRlbVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFjY29yZGlvbi1oZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBmYXEuY2F0ZWdvcnlfaWQgKyBmYXEuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWNjb3JkaW9uLWJ1dHRvbiBjb2xsYXBzZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRvZ2dsZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRhcmdldFwiOiBcIiNmYXEtcXVlc3Rpb24tXCIgKyBmYXEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtY29udHJvbHNcIjogXCIjZmFxLXF1ZXN0aW9uLVwiICsgZmFxLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoZmFxLnF1ZXN0aW9uKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb2xsYXBzZSBhY2NvcmRpb24tY29sbGFwc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcS1xdWVzdGlvbi1cIiArIGZhcS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogZmFxLmNhdGVnb3J5X2lkICsgZmFxLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtcGFyZW50XCI6IFwiI2ZhcVwiICsgZmFxLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFjY29yZGlvbi1ib2R5IHRleHQtZGFya1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhmYXEuYW5zd2VyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgICksXG4gICAgICAgIF0pLFxuICAgICAgXSksXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJmYXEtY29udGFjdFwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93IG10LTUgcHQtNzVcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLTEyIHRleHQtY2VudGVyXCIgfSwgW1xuICAgICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiWW91IHN0aWxsIGhhdmUgYSBxdWVzdGlvblwiKSkgKyBcIj9cIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1iLTNcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgX3ZtLiR0KFxuICAgICAgICAgICAgICAgICAgICBcIklmIHlvdSBjYW5ub3QgZmluZCBhIHF1ZXN0aW9uIGluIG91ciBGQVEsIHlvdSBjYW4gYWx3YXlzIGNvbnRhY3QgdXMuIFdlIHdpbGwgYW5zd2VyIHRvIHlvdSBzaG9ydGx5IVwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgXSksXG4gICAgICAgIF0pLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC10ZXh0XCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmkgYmktc2VhcmNoXCIgfSksXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYXZhdGFyIGF2YXRhci10YWcgYmctbGlnaHQtcHJpbWFyeSBtZS0xXCIgfSxcbiAgICAgIFtfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJmb250LW1lZGl1bS00IGJpIGJpLWluZm8tbGdcIiB9KV1cbiAgICApXG4gIH0sXG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXBvbmVudHMiLCJkYXRhIiwiY2F0ZWdvcmllcyIsIm1ldGhvZHMiLCJnb0JhY2siLCJ3aW5kb3ciLCJmZXRjaENhdGVnb3JpZXMiLCJnZXQiLCJ0aGVuIiwic2VhcmNoIiwicHVzaCIsImVyciIsImxvZ0Vycm9yIiwiY3JlYXRlZCIsIm1vdW50ZWQiLCJkZXN0cm95ZWQiXSwic291cmNlUm9vdCI6IiJ9