"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_p2p_p2p_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  // component list
  components: {},
  // component data
  data: function data() {
    return {
      order_type: "all",
      ads: [],
      cur_rate: cur_rate,
      cur_symbol: cur_symbol,
      filters: {
        available: {
          value: "",
          keys: ["available"]
        }
      },
      currentPage: 1,
      totalPages: 0,
      currencies: [],
      activeItem: null
    };
  },
  // custom methods
  methods: {
    isActive: function isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive: function setActive(menuItem) {
      this.activeItem = menuItem;
    },
    goBack: function goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    fetchData: function fetchData() {
      var _this = this;

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";
      var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$http.post("/user/p2p/fetch/recent/orders", {
        type: type,
        currency: currency
      }).then(function (response) {
        _this.currencies = response.data.currencies, _this.ads = response.data.ads;
      });
    }
  },
  // on component created
  created: function created() {
    this.fetchData();
  },
  // on component mounted
  mounted: function mounted() {},
  // on component destroyed
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Tooltips\n */\n@-webkit-keyframes tooltipShowLeft {\n0% {\n    opacity: 0;\n    transform: translateX(-20px);\n}\n100% {\n    opacity: 1;\n    transform: translateX(-10px);\n}\n}\n@keyframes tooltipShowLeft {\n0% {\n    opacity: 0;\n    transform: translateX(-20px);\n}\n100% {\n    opacity: 1;\n    transform: translateX(-10px);\n}\n}\n@-webkit-keyframes tooltipShowRight {\n0% {\n    opacity: 0;\n    transform: translateX(20px);\n}\n100% {\n    opacity: 1;\n    transform: translateX(10px);\n}\n}\n@keyframes tooltipShowRight {\n0% {\n    opacity: 0;\n    transform: translateX(20px);\n}\n100% {\n    opacity: 1;\n    transform: translateX(10px);\n}\n}\n@-webkit-keyframes tooltipShowTop {\n0% {\n    opacity: 0;\n    transform: translateY(-20px);\n}\n100% {\n    opacity: 1;\n    transform: translateY(-10px);\n}\n}\n@keyframes tooltipShowTop {\n0% {\n    opacity: 0;\n    transform: translateY(-20px);\n}\n100% {\n    opacity: 1;\n    transform: translateY(-10px);\n}\n}\n@-webkit-keyframes tooltipShowBottom {\n0% {\n    opacity: 0;\n    transform: translateY(20px);\n}\n100% {\n    opacity: 1;\n    transform: translateY(10px);\n}\n}\n@keyframes tooltipShowBottom {\n0% {\n    opacity: 0;\n    transform: translateY(20px);\n}\n100% {\n    opacity: 1;\n    transform: translateY(10px);\n}\n}\n.tooltip-wrap {\n  display: block;\n  position: absolute;\n  text-align: center;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  transition: none;\n  border: none;\n  border-radius: 6px;\n  max-width: 500px;\n  margin: 0;\n  padding: 0.5em 1em;\n  font-size: 80%;\n  line-height: 1.2em;\n  color: #a9b8cb;\n  background-color: #405168;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);\n  left: 0;\n  top: 0;\n  z-index: 10009;\n}\n.tooltip-wrap.tooltip-left {\n  -webkit-animation: tooltipShowLeft 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n          animation: tooltipShowLeft 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-right {\n  -webkit-animation: tooltipShowRight 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n          animation: tooltipShowRight 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-top {\n  -webkit-animation: tooltipShowTop 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n          animation: tooltipShowTop 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-bottom {\n  -webkit-animation: tooltipShowBottom 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n          animation: tooltipShowBottom 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap:after {\n  content: \" \";\n  position: absolute;\n  height: 0;\n  width: 0;\n  pointer-events: none;\n  transition: none;\n  border: solid transparent;\n  border-color: transparent;\n  border-width: 5px;\n}\n.tooltip-wrap.tooltip-left:after {\n  left: 100%;\n  top: 50%;\n  border-left-color: #405168;\n  margin-top: -5px;\n}\n.tooltip-wrap.tooltip-right:after {\n  right: 100%;\n  top: 50%;\n  border-right-color: #405168;\n  margin-top: -5px;\n}\n.tooltip-wrap.tooltip-top:after {\n  top: 100%;\n  left: 50%;\n  border-top-color: #405168;\n  margin-left: -5px;\n}\n.tooltip-wrap.tooltip-bottom:after {\n  bottom: 100%;\n  left: 50%;\n  border-bottom-color: #405168;\n  margin-left: -5px;\n}", "",{"version":3,"sources":["webpack://./resources/src/scss/tooltip.scss","webpack://./resources/src/Pages/p2p/p2p.vue","webpack://./resources/src/scss/variables.scss"],"names":[],"mappings":"AAAA;;EAAA;AAMA;AACI;IAAO,UAAA;IAAY,4BAAA;ACArB;ADCE;IAAO,UAAA;IAAY,4BAAA;ACGrB;AACF;ADNA;AACI;IAAO,UAAA;IAAY,4BAAA;ACArB;ADCE;IAAO,UAAA;IAAY,4BAAA;ACGrB;AACF;ADFA;AACI;IAAO,UAAA;IAAY,2BAAA;ACMrB;ADLE;IAAO,UAAA;IAAY,2BAAA;ACSrB;AACF;ADZA;AACI;IAAO,UAAA;IAAY,2BAAA;ACMrB;ADLE;IAAO,UAAA;IAAY,2BAAA;ACSrB;AACF;ADRA;AACI;IAAO,UAAA;IAAY,4BAAA;ACYrB;ADXE;IAAO,UAAA;IAAY,4BAAA;ACerB;AACF;ADlBA;AACI;IAAO,UAAA;IAAY,4BAAA;ACYrB;ADXE;IAAO,UAAA;IAAY,4BAAA;ACerB;AACF;ADdA;AACI;IAAO,UAAA;IAAY,2BAAA;ACkBrB;ADjBE;IAAO,UAAA;IAAY,2BAAA;ACqBrB;AACF;ADxBA;AACI;IAAO,UAAA;IAAY,2BAAA;ACkBrB;ADjBE;IAAO,UAAA;IAAY,2BAAA;ACqBrB;AACF;ADpBA;EACE,cAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EACA,oBAAA;EACA,gBAAA;EACA,YAAA;EACA,kBEbS;EFcT,gBAAA;EACA,SAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,cAjCa;EAkCb,yBAnCS;EAoCT,yCE0DW;EFzDX,OAAA;EACA,MAAA;EACA,cAAA;ACsBF;ADpBE;EAAiB,wFAAA;UAAA,gFAAA;ACuBnB;ADtBE;EAAkB,yFAAA;UAAA,iFAAA;ACyBpB;ADxBE;EAAgB,uFAAA;UAAA,+EAAA;AC2BlB;AD1BE;EAAmB,0FAAA;UAAA,kFAAA;AC6BrB;AD3BE;EACE,YAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,oBAAA;EACA,gBAAA;EACA,yBAAA;EACA,yBAAA;EACA,iBAAA;AC6BJ;AD1BE;EACE,UAAA;EACA,QAAA;EACA,0BA7DO;EA8DP,gBAAA;AC4BJ;AD1BE;EACE,WAAA;EACA,QAAA;EACA,2BAnEO;EAoEP,gBAAA;AC4BJ;AD1BE;EACE,SAAA;EACA,SAAA;EACA,yBAzEO;EA0EP,iBAAA;AC4BJ;AD1BE;EACE,YAAA;EACA,SAAA;EACA,4BA/EO;EAgFP,iBAAA;AC4BJ","sourcesContent":["/**\n * Tooltips\n */\n$tipColor: lighten( $colorDocument, 20% );\n$tipTextColor: lighten( $colorDocument, 60% );\n\n@keyframes tooltipShowLeft {\n    0%   { opacity: 0; transform: translateX( -20px ); }\n    100% { opacity: 1; transform: translateX( -10px ); }\n}\n@keyframes tooltipShowRight {\n    0%   { opacity: 0; transform: translateX( 20px ); }\n    100% { opacity: 1; transform: translateX( 10px ); }\n}\n@keyframes tooltipShowTop {\n    0%   { opacity: 0; transform: translateY( -20px ); }\n    100% { opacity: 1; transform: translateY( -10px ); }\n}\n@keyframes tooltipShowBottom {\n    0%   { opacity: 0; transform: translateY( 20px ); }\n    100% { opacity: 1; transform: translateY( 10px ); }\n}\n.tooltip-wrap {\n  display: block;\n  position: absolute;\n  text-align: center;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  transition: none;\n  border: none;\n  border-radius: $lineJoin;\n  max-width: 500px;\n  margin: 0;\n  padding: calc( $padSpace / 2 ) $padSpace;\n  font-size: 80%;\n  line-height: 1.2em;\n  color: $tipTextColor;\n  background-color: $tipColor;\n  box-shadow: $shadowBold;\n  left: 0;\n  top: 0;\n  z-index: calc( $zindexAlerts + 10 );\n\n  &.tooltip-left { animation: tooltipShowLeft $fxSpeed $fxEaseBounce forwards; }\n  &.tooltip-right { animation: tooltipShowRight $fxSpeed $fxEaseBounce forwards; }\n  &.tooltip-top { animation: tooltipShowTop $fxSpeed $fxEaseBounce forwards; }\n  &.tooltip-bottom { animation: tooltipShowBottom $fxSpeed $fxEaseBounce forwards; }\n\n  &:after { // arrow\n    content: \" \";\n    position: absolute;\n    height: 0;\n    width: 0;\n    pointer-events: none;\n    transition: none;\n    border: solid transparent;\n    border-color: transparent;\n    border-width: 5px;\n  }\n\n  &.tooltip-left:after { // arrow on right\n    left: 100%;\n    top: 50%;\n    border-left-color: $tipColor;\n    margin-top: -5px;\n  }\n  &.tooltip-right:after { // arrow on left\n    right: 100%;\n    top: 50%;\n    border-right-color: $tipColor;\n    margin-top: -5px;\n  }\n  &.tooltip-top:after { // arrow on bottom\n    top: 100%;\n    left: 50%;\n    border-top-color: $tipColor;\n    margin-left: -5px;\n  }\n  &.tooltip-bottom:after { // arrow on top\n    bottom: 100%;\n    left: 50%;\n    border-bottom-color: $tipColor;\n    margin-left: -5px;\n  }\n}\n","/**\n * Tooltips\n */\n@keyframes tooltipShowLeft {\n  0% {\n    opacity: 0;\n    transform: translateX(-20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(-10px);\n  }\n}\n@keyframes tooltipShowRight {\n  0% {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(10px);\n  }\n}\n@keyframes tooltipShowTop {\n  0% {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(-10px);\n  }\n}\n@keyframes tooltipShowBottom {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(10px);\n  }\n}\n.tooltip-wrap {\n  display: block;\n  position: absolute;\n  text-align: center;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  transition: none;\n  border: none;\n  border-radius: 6px;\n  max-width: 500px;\n  margin: 0;\n  padding: 0.5em 1em;\n  font-size: 80%;\n  line-height: 1.2em;\n  color: #a9b8cb;\n  background-color: #405168;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);\n  left: 0;\n  top: 0;\n  z-index: 10009;\n}\n.tooltip-wrap.tooltip-left {\n  animation: tooltipShowLeft 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-right {\n  animation: tooltipShowRight 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-top {\n  animation: tooltipShowTop 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap.tooltip-bottom {\n  animation: tooltipShowBottom 300ms cubic-bezier(0.64, -0.28, 0.05, 1.405) forwards;\n}\n.tooltip-wrap:after {\n  content: \" \";\n  position: absolute;\n  height: 0;\n  width: 0;\n  pointer-events: none;\n  transition: none;\n  border: solid transparent;\n  border-color: transparent;\n  border-width: 5px;\n}\n.tooltip-wrap.tooltip-left:after {\n  left: 100%;\n  top: 50%;\n  border-left-color: #405168;\n  margin-top: -5px;\n}\n.tooltip-wrap.tooltip-right:after {\n  right: 100%;\n  top: 50%;\n  border-right-color: #405168;\n  margin-top: -5px;\n}\n.tooltip-wrap.tooltip-top:after {\n  top: 100%;\n  left: 50%;\n  border-top-color: #405168;\n  margin-left: -5px;\n}\n.tooltip-wrap.tooltip-bottom:after {\n  bottom: 100%;\n  left: 50%;\n  border-bottom-color: #405168;\n  margin-left: -5px;\n}","// topbar size\n$topbarH: 62px;\n$topbarHeight: 50px;\n\n// list icons fixed size (w|h px)\n$iconSize: 46px;\n\n// spacing and padding\n$padSpace: 1em;\n$padSpaceSmall: calc($padSpace / 2);\n$colSpace: 1.2em;\n$rowSpace: 1.2em;\n$listSpace: 0.4em;\n\n// borders and lines\n$lineWidth: 2px;\n$lineStyle: solid;\n$lineColor: rgba( white, 0.02 );\n$lineJoin: 6px;\n\n// common z-index values\n$zindexUnder: -1;\n$zindexElements: 100;\n$zindexModals: 8888;\n$zindexAlerts: 9999;\n\n// base font options\n$fontSize: 17px;\n$fontSpace: 1.4em;\n$fontWeight: normal;\n$fontFamily: 'Open Sans Condensed', 'Contrail One', Capriola, Consolas, Monaco, monospace;\n$fontFixed: Consolas, Monaco, monospace;\n\n// document colors\n$colorDocument: #192029;\n$colorDocumentText: #babbbc;\n$colorDocumentLight: lighten( $colorDocument, 3% );\n$colorDocumentDark: darken( $colorDocument, 6% );\n\n//scrollbar colors\n$colorScrollTrack: lighten( $colorDocument, 3% );\n$colorScrollThumb: darken( $colorDocument, 3% );\n\n// default colors\n$colorDefault: lightgray;\n$colorDefaultText: darken( $colorDefault, 40% );\n\n// primary colors\n$colorGain: darken( yellowgreen, 10% );\n$colorGainText: darken( $colorGain, 40% );\n\n// primary colors\n$colorLoss: desaturate( red, 30% );\n$colorLossText: darken( $colorLoss, 40% );\n\n// primary colors\n$colorPrimary: desaturate( orange, 10% );\n$colorPrimaryText: darken( $colorPrimary, 40% );\n\n// secondary colors\n$colorSecondary: steelblue;\n$colorSecondaryText: darken( $colorSecondary, 40% );\n\n// success colors\n$colorSuccess: desaturate( olivedrab, 10% );\n$colorSuccessText: lighten( $colorSuccess, 45% );\n\n// warning colors\n$colorWarning: desaturate( orange, 30% );\n$colorWarningText: lighten( $colorWarning, 40% );\n\n// danger colors\n$colorDanger: desaturate( firebrick, 10% );\n$colorDangerText: lighten( $colorDanger, 40% );\n\n// info colors\n$colorInfo: darken( slategray, 15% );\n$colorInfoText: lighten( $colorInfo, 45% );\n\n// grey colors\n$colorGrey: lightslategray;\n$colorGreyText: lighten( $colorGrey, 40% );\n\n// bright colors\n$colorBright: aliceblue;\n$colorBrightText: darken( $colorBright, 40% );\n\n// other colors\n$colorText: lightgray;\n$colorOverlay: rgba( 0, 0, 0, 0.5 );\n\n// common shadow styles\n$shadowHollow: inset 0 1px 4px rgba( 0, 0, 0, 0.15 );\n$shadowBubble: inset 0 -20px 20px rgba( 0, 0, 0, 0.1 );\n$shadowPaper: 0 1px 2px rgba( 0, 0, 0, 0.2 );\n$shadowDark: 0 1px 3px rgba( 0, 0, 0, 0.3 );\n$shadowGlow: 0 0 10px rgba( 0, 0, 0, 0.2 );\n$shadowBold: 0 2px 12px rgba( 0, 0, 0, 0.4 );\n$shadowText: 1px 1px 0 rgba( 0, 0, 0, 0.3 );\n\n// transition props\n$fxSpeed: 300ms;\n$fxEase: cubic-bezier( 0.215, 0.610, 0.355, 1.000 );\n$fxEaseBounce: cubic-bezier( 0.640, -0.280, 0.050, 1.405 );\n$fxSpeedOffset: calc( #{$fxSpeed} / 3 );\n$fxSlideDist: 20px;\n$fxShrinkScale: .4;\n$fxGrowScale: 1.4;\n$fxRotateAmount: 8deg;\n\n// screen sizes\n$sizeSmall: 420px;\n$sizeMedium: 720px;\n$sizeLarge: 1280px;\n\n// screen breakpoints\n$screenSmall: \"only screen and (min-width : #{$sizeSmall})\";\n$screenMedium: \"only screen and (min-width : #{$sizeMedium})\";\n$screenLarge: \"only screen and (min-width : #{$sizeLarge})\";\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./p2p.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/Pages/p2p/p2p.vue":
/*!*****************************************!*\
  !*** ./resources/src/Pages/p2p/p2p.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./p2p.vue?vue&type=template&id=8418f822& */ "./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822&");
/* harmony import */ var _p2p_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./p2p.vue?vue&type=script&lang=js& */ "./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js&");
/* harmony import */ var _p2p_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./p2p.vue?vue&type=style&index=0&lang=scss& */ "./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _p2p_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__.render,
  _p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/p2p/p2p.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./p2p.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************!*\
  !*** ./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_68_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./p2p.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-68[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822&":
/*!************************************************************************!*\
  !*** ./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_p2p_vue_vue_type_template_id_8418f822___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./p2p.vue?vue&type=template&id=8418f822& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/p2p/p2p.vue?vue&type=template&id=8418f822& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "mb-1 d-flex justify-content-between align-items-center" },
      [
        _c(
          "div",
          {
            staticClass: "btn-group",
            attrs: { role: "group", "aria-label": "Basic example" },
          },
          [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-primary",
                on: {
                  click: function ($event) {
                    _vm.fetchData("all")
                    _vm.order_type = "all"
                  },
                },
              },
              [_vm._v("\n                All\n            ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-success mx-1",
                on: {
                  click: function ($event) {
                    _vm.fetchData("buy")
                    _vm.order_type = "buy"
                  },
                },
              },
              [_vm._v("\n                Buy\n            ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-danger",
                on: {
                  click: function ($event) {
                    _vm.fetchData("sell")
                    _vm.order_type = "sell"
                  },
                },
              },
              [_vm._v("\n                Sell\n            ")]
            ),
          ]
        ),
        _vm._v(" "),
        _vm.currencies != null && _vm.currencies.length > 0
          ? _c(
              "ul",
              {
                key: _vm.currencies.length,
                staticClass: "nav nav-tabs border",
                attrs: { role: "tablist" },
              },
              [
                _vm._l(_vm.currencies, function (currency, index) {
                  return [
                    _c("li", { key: index, staticClass: "nav-item" }, [
                      _c(
                        "button",
                        {
                          staticClass: "nav-link",
                          class: {
                            active:
                              _vm.activeItem != null
                                ? _vm.isActive(currency.symbol)
                                : index == 0
                                ? "active"
                                : "",
                          },
                          on: {
                            click: function ($event) {
                              _vm.fetchData(_vm.order_type, currency.symbol)
                              _vm.setActive(currency.symbol)
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(currency.symbol) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]),
                  ]
                }),
              ],
              2
            )
          : _vm._e(),
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-header" }, [
            _c("h4", { staticClass: "card-title" }, [
              _vm._v(
                "\n                        " +
                  _vm._s(_vm.$t("Recent Orders")) +
                  "\n                    "
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "input-group w-50" }, [
              _c(
                "span",
                {
                  staticClass: "input-group-text",
                  attrs: { id: "available-search" },
                },
                [_vm._v(_vm._s(_vm.$t("Amount")))]
              ),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.filters.available.value,
                    expression: "filters.available.value",
                  },
                ],
                staticClass: "form-control",
                domProps: { value: _vm.filters.available.value },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.filters.available,
                      "value",
                      $event.target.value
                    )
                  },
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "table-responsive" },
            [
              _c(
                "v-table",
                {
                  staticClass: "table",
                  attrs: {
                    data: _vm.ads,
                    filters: _vm.filters,
                    currentPage: _vm.currentPage,
                    pageSize: 10,
                  },
                  on: {
                    "update:currentPage": function ($event) {
                      _vm.currentPage = $event
                    },
                    "update:current-page": function ($event) {
                      _vm.currentPage = $event
                    },
                    totalPagesChanged: function ($event) {
                      _vm.totalPages = $event
                    },
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "body",
                      fn: function (ref) {
                        var displayData = ref.displayData
                        return _c(
                          "tbody",
                          {},
                          [
                            _vm.ads != null
                              ? _vm._l(displayData, function (row) {
                                  return _c("tr", { key: row.id }, [
                                    _c(
                                      "td",
                                      { attrs: { "data-label": "name" } },
                                      [_c("span", [_vm._v(_vm._s(row.name))])]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { attrs: { "data-label": "price" } },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(row.price) +
                                            "\n                                        " +
                                            _vm._s(row.fiat_currency) +
                                            "\n                                    "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { attrs: { "data-label": "limit" } },
                                      [
                                        _c("div", [
                                          _vm._v(
                                            "\n                                            Limit: " +
                                              _vm._s(row.limit) +
                                              "\n                                            " +
                                              _vm._s(row.fiat_currency) +
                                              "\n                                        "
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(
                                            "\n                                            Available: " +
                                              _vm._s(row.available) +
                                              "\n                                            " +
                                              _vm._s(row.currency_symbol) +
                                              "\n                                        "
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { attrs: { "data-label": "methods" } },
                                      [
                                        _vm._l(
                                          row.methods,
                                          function (method, index) {
                                            return [
                                              _c(
                                                "span",
                                                {
                                                  directives: [
                                                    {
                                                      name: "tooltip",
                                                      rawName: "v-tooltip",
                                                    },
                                                  ],
                                                  staticClass:
                                                    "badge bg-secondary",
                                                  attrs: {
                                                    title: method.title,
                                                  },
                                                },
                                                [_vm._v(_vm._s(method.title))]
                                              ),
                                            ]
                                          }
                                        ),
                                      ],
                                      2
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { attrs: { "data-label": "limit" } },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-outline-success btn-sm",
                                            on: {
                                              click: function ($event) {
                                                return _vm.Purchase(row.id)
                                              },
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n                                            Trade\n                                        "
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ])
                                })
                              : [
                                  _c("tr", [
                                    _c("td", { attrs: { colspan: "100%" } }, [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(_vm.$t("No results found!")) +
                                          "\n                                    "
                                      ),
                                    ]),
                                  ]),
                                ],
                          ],
                          2
                        )
                      },
                    },
                  ]),
                },
                [
                  _c("thead", { attrs: { slot: "head" }, slot: "head" }, [
                    _c(
                      "tr",
                      [
                        _c(
                          "v-th",
                          { attrs: { sortKey: "name", scope: "col" } },
                          [_vm._v(_vm._s(_vm.$t("Advertisers")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-th",
                          { attrs: { sortKey: "price", scope: "col" } },
                          [_vm._v(_vm._s(_vm.$t("Price")))]
                        ),
                        _vm._v(" "),
                        _c("th", { attrs: { scope: "col" } }, [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.$t("Limit/Available")) +
                              "\n                                "
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "v-th",
                          { attrs: { sortKey: "methods", scope: "col" } },
                          [_vm._v(_vm._s(_vm.$t("Methods")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-th",
                          { attrs: { sortKey: "post_balance", scope: "col" } },
                          [_vm._v(_vm._s(_vm.$t("Action")))]
                        ),
                      ],
                      1
                    ),
                  ]),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-footer ms-auto pb-0" },
            [
              _c("smart-pagination", {
                attrs: {
                  currentPage: _vm.currentPage,
                  totalPages: _vm.totalPages,
                },
                on: {
                  "update:currentPage": function ($event) {
                    _vm.currentPage = $event
                  },
                  "update:current-page": function ($event) {
                    _vm.currentPage = $event
                  },
                },
              }),
            ],
            1
          ),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX3AycF9wMnBfdnVlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlMQSxpRUFBZTtFQUNmQSxTQURBO0VBRUE7RUFDQUMsY0FIQTtFQUtBO0VBQ0FDLElBTkEsa0JBTUE7SUFDQTtNQUNBQyxpQkFEQTtNQUVBQyxPQUZBO01BR0FDLGtCQUhBO01BSUFDLHNCQUpBO01BS0FDO1FBQ0FDO1VBQUFDO1VBQUFDO1FBQUE7TUFEQSxDQUxBO01BUUFDLGNBUkE7TUFTQUMsYUFUQTtNQVVBQyxjQVZBO01BV0FDO0lBWEE7RUFhQSxDQXBCQTtFQXNCQTtFQUNBQztJQUNBQyxRQURBLG9CQUNBQyxRQURBLEVBQ0E7TUFDQTtJQUNBLENBSEE7SUFJQUMsU0FKQSxxQkFJQUQsUUFKQSxFQUlBO01BQ0E7SUFDQSxDQU5BO0lBT0FFLE1BUEEsb0JBT0E7TUFDQUMsNEJBQ0EsbUJBREEsR0FFQSxzQkFGQTtJQUdBLENBWEE7SUFZQUMsU0FaQSx1QkFZQTtNQUFBOztNQUFBO01BQUE7TUFDQSxXQUNBQyxJQURBLENBQ0EsK0JBREEsRUFDQTtRQUNBQyxVQURBO1FBRUFDO01BRkEsQ0FEQSxFQUtBQyxJQUxBLENBS0E7UUFDQSw2Q0FDQSw2QkFEQTtNQUVBLENBUkE7SUFTQTtFQXRCQSxDQXZCQTtFQWdEQTtFQUNBQyxPQWpEQSxxQkFpREE7SUFDQTtFQUNBLENBbkRBO0VBcURBO0VBQ0FDLE9BdERBLHFCQXNEQSxFQXREQTtFQXdEQTtFQUNBQyxTQXpEQSx1QkF5REE7QUF6REE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pMQTtBQUN3SjtBQUM3QjtBQUMzSCw4QkFBOEIsNEdBQTJCLENBQUMsaUlBQXFDO0FBQy9GO0FBQ0EscUdBQXFHLE1BQU0saUJBQWlCLG1DQUFtQyxHQUFHLFFBQVEsaUJBQWlCLG1DQUFtQyxHQUFHLEdBQUcsOEJBQThCLE1BQU0saUJBQWlCLG1DQUFtQyxHQUFHLFFBQVEsaUJBQWlCLG1DQUFtQyxHQUFHLEdBQUcsdUNBQXVDLE1BQU0saUJBQWlCLGtDQUFrQyxHQUFHLFFBQVEsaUJBQWlCLGtDQUFrQyxHQUFHLEdBQUcsK0JBQStCLE1BQU0saUJBQWlCLGtDQUFrQyxHQUFHLFFBQVEsaUJBQWlCLGtDQUFrQyxHQUFHLEdBQUcscUNBQXFDLE1BQU0saUJBQWlCLG1DQUFtQyxHQUFHLFFBQVEsaUJBQWlCLG1DQUFtQyxHQUFHLEdBQUcsNkJBQTZCLE1BQU0saUJBQWlCLG1DQUFtQyxHQUFHLFFBQVEsaUJBQWlCLG1DQUFtQyxHQUFHLEdBQUcsd0NBQXdDLE1BQU0saUJBQWlCLGtDQUFrQyxHQUFHLFFBQVEsaUJBQWlCLGtDQUFrQyxHQUFHLEdBQUcsZ0NBQWdDLE1BQU0saUJBQWlCLGtDQUFrQyxHQUFHLFFBQVEsaUJBQWlCLGtDQUFrQyxHQUFHLEdBQUcsaUJBQWlCLG1CQUFtQix1QkFBdUIsdUJBQXVCLHdCQUF3Qiw0QkFBNEIseUJBQXlCLHFCQUFxQixpQkFBaUIsdUJBQXVCLHFCQUFxQixjQUFjLHVCQUF1QixtQkFBbUIsdUJBQXVCLG1CQUFtQiw4QkFBOEIsOENBQThDLFlBQVksV0FBVyxtQkFBbUIsR0FBRyw4QkFBOEIsNkZBQTZGLDZGQUE2RixHQUFHLCtCQUErQiw4RkFBOEYsOEZBQThGLEdBQUcsNkJBQTZCLDRGQUE0Riw0RkFBNEYsR0FBRyxnQ0FBZ0MsK0ZBQStGLCtGQUErRixHQUFHLHVCQUF1QixtQkFBbUIsdUJBQXVCLGNBQWMsYUFBYSx5QkFBeUIscUJBQXFCLDhCQUE4Qiw4QkFBOEIsc0JBQXNCLEdBQUcsb0NBQW9DLGVBQWUsYUFBYSwrQkFBK0IscUJBQXFCLEdBQUcscUNBQXFDLGdCQUFnQixhQUFhLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsY0FBYyxjQUFjLDhCQUE4QixzQkFBc0IsR0FBRyxzQ0FBc0MsaUJBQWlCLGNBQWMsaUNBQWlDLHNCQUFzQixHQUFHLE9BQU8saU1BQWlNLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxLQUFLLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLEtBQUssS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxNQUFNLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxLQUFLLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxNQUFNLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sS0FBSyxNQUFNLEtBQUssVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxLQUFLLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxZQUFZLFdBQVcsT0FBTyxNQUFNLFlBQVksV0FBVyxPQUFPLE1BQU0sWUFBWSxXQUFXLE9BQU8sTUFBTSxZQUFZLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLDJGQUEyRixnREFBZ0QsZ0NBQWdDLGFBQWEsWUFBWSxpQ0FBaUMsYUFBYSxZQUFZLGlDQUFpQyxHQUFHLCtCQUErQixhQUFhLFlBQVksZ0NBQWdDLGFBQWEsWUFBWSxnQ0FBZ0MsR0FBRyw2QkFBNkIsYUFBYSxZQUFZLGlDQUFpQyxhQUFhLFlBQVksaUNBQWlDLEdBQUcsZ0NBQWdDLGFBQWEsWUFBWSxnQ0FBZ0MsYUFBYSxZQUFZLGdDQUFnQyxHQUFHLGlCQUFpQixtQkFBbUIsdUJBQXVCLHVCQUF1Qix3QkFBd0IsNEJBQTRCLHlCQUF5QixxQkFBcUIsaUJBQWlCLDZCQUE2QixxQkFBcUIsY0FBYyw2Q0FBNkMsbUJBQW1CLHVCQUF1Qix5QkFBeUIsZ0NBQWdDLDRCQUE0QixZQUFZLFdBQVcsd0NBQXdDLHVCQUF1Qiw2REFBNkQsc0JBQXNCLDhEQUE4RCxvQkFBb0IsNERBQTRELHVCQUF1QiwrREFBK0QsZ0JBQWdCLDZCQUE2Qix5QkFBeUIsZ0JBQWdCLGVBQWUsMkJBQTJCLHVCQUF1QixnQ0FBZ0MsZ0NBQWdDLHdCQUF3QixLQUFLLDZCQUE2QixrQ0FBa0MsZUFBZSxtQ0FBbUMsdUJBQXVCLEtBQUssNEJBQTRCLGtDQUFrQyxlQUFlLG9DQUFvQyx1QkFBdUIsS0FBSywwQkFBMEIsa0NBQWtDLGdCQUFnQixrQ0FBa0Msd0JBQXdCLEtBQUssNkJBQTZCLGtDQUFrQyxnQkFBZ0IscUNBQXFDLHdCQUF3QixLQUFLLEdBQUcsd0RBQXdELFFBQVEsaUJBQWlCLG1DQUFtQyxLQUFLLFVBQVUsaUJBQWlCLG1DQUFtQyxLQUFLLEdBQUcsK0JBQStCLFFBQVEsaUJBQWlCLGtDQUFrQyxLQUFLLFVBQVUsaUJBQWlCLGtDQUFrQyxLQUFLLEdBQUcsNkJBQTZCLFFBQVEsaUJBQWlCLG1DQUFtQyxLQUFLLFVBQVUsaUJBQWlCLG1DQUFtQyxLQUFLLEdBQUcsZ0NBQWdDLFFBQVEsaUJBQWlCLGtDQUFrQyxLQUFLLFVBQVUsaUJBQWlCLGtDQUFrQyxLQUFLLEdBQUcsaUJBQWlCLG1CQUFtQix1QkFBdUIsdUJBQXVCLHdCQUF3Qiw0QkFBNEIseUJBQXlCLHFCQUFxQixpQkFBaUIsdUJBQXVCLHFCQUFxQixjQUFjLHVCQUF1QixtQkFBbUIsdUJBQXVCLG1CQUFtQiw4QkFBOEIsOENBQThDLFlBQVksV0FBVyxtQkFBbUIsR0FBRyw4QkFBOEIscUZBQXFGLEdBQUcsK0JBQStCLHNGQUFzRixHQUFHLDZCQUE2QixvRkFBb0YsR0FBRyxnQ0FBZ0MsdUZBQXVGLEdBQUcsdUJBQXVCLG1CQUFtQix1QkFBdUIsY0FBYyxhQUFhLHlCQUF5QixxQkFBcUIsOEJBQThCLDhCQUE4QixzQkFBc0IsR0FBRyxvQ0FBb0MsZUFBZSxhQUFhLCtCQUErQixxQkFBcUIsR0FBRyxxQ0FBcUMsZ0JBQWdCLGFBQWEsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxjQUFjLGNBQWMsOEJBQThCLHNCQUFzQixHQUFHLHNDQUFzQyxpQkFBaUIsY0FBYyxpQ0FBaUMsc0JBQXNCLEdBQUcsa0NBQWtDLHNCQUFzQix1REFBdUQsMkNBQTJDLHNDQUFzQyxtQkFBbUIsbUJBQW1CLG9CQUFvQiwwQ0FBMEMsb0JBQW9CLGtDQUFrQyxpQkFBaUIsK0NBQStDLHVCQUF1QixzQkFBc0Isc0JBQXNCLDBDQUEwQyxvQkFBb0Isc0JBQXNCLDRGQUE0RiwwQ0FBMEMsZ0RBQWdELDhCQUE4QixxREFBcUQsbURBQW1ELHlFQUF5RSxrREFBa0QsZ0RBQWdELGtEQUFrRCw4REFBOEQsNENBQTRDLDBEQUEwRCw0Q0FBNEMsZ0VBQWdFLGtEQUFrRCxvREFBb0Qsc0RBQXNELG1FQUFtRSxtREFBbUQsZ0VBQWdFLG1EQUFtRCxpRUFBaUUsaURBQWlELHlEQUF5RCw2Q0FBNkMsK0NBQStDLDZDQUE2Qyw4Q0FBOEMsZ0RBQWdELDJDQUEyQyxzQ0FBc0Msa0ZBQWtGLHlEQUF5RCwrQ0FBK0MsOENBQThDLDZDQUE2QywrQ0FBK0MsOENBQThDLHlDQUF5QyxzREFBc0QsNkRBQTZELDBCQUEwQixVQUFVLE1BQU0scUJBQXFCLHFCQUFxQixvQkFBb0Isd0JBQXdCLHVDQUF1QyxxQkFBcUIscUJBQXFCLDBFQUEwRSxXQUFXLElBQUksa0RBQWtELFlBQVksSUFBSSxpREFBaUQsV0FBVyxJQUFJLHFCQUFxQjtBQUMzaFo7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUDJEO0FBQ2xHLFlBQXFmOztBQUVyZjs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyw4YUFBTzs7OztBQUl4QixpRUFBZSxxYkFBYyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaK0M7QUFDM0I7QUFDTDtBQUNsRCxDQUFnRTs7O0FBR2hFO0FBQ2dHO0FBQ2hHLGdCQUFnQix1R0FBVTtBQUMxQixFQUFFLHlFQUFNO0FBQ1IsRUFBRSwyRUFBTTtBQUNSLEVBQUUsb0ZBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q29NLENBQUMsaUVBQWUsd01BQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBR0F2TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUVBQXVFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsOENBQThDO0FBQ25FLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaUJBQWlCO0FBQzFDLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IscUNBQXFDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixvQkFBb0I7QUFDcEMsa0JBQWtCLHVCQUF1QjtBQUN6QyxvQkFBb0IscUJBQXFCO0FBQ3pDLHNCQUFzQiw0QkFBNEI7QUFDbEQsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQ0FBaUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsd0JBQXdCO0FBQ25ELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGlDQUFpQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsYUFBYTtBQUNqRTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVMsd0JBQXdCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUyx5QkFBeUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUyx5QkFBeUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUywyQkFBMkI7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUyx5QkFBeUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLDZDQUE2QztBQUM3QywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUyxtQkFBbUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxnQ0FBZ0MsU0FBUyxjQUFjLGdCQUFnQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUyxrQ0FBa0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVMsZ0JBQWdCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixTQUFTLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVMseUNBQXlDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHlDQUF5QztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL3NyYy9QYWdlcy9wMnAvcDJwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL3AycC9wMnAudnVlPzM0NmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9wMnAvcDJwLnZ1ZT84NTFjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMvcDJwL3AycC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9wMnAvcDJwLnZ1ZT9mYmY3Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMvcDJwL3AycC52dWU/ZmM3ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL3AycC9wMnAudnVlP2I2NDQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9wMnAvcDJwLnZ1ZT9mMjdkIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWItMSBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkJhc2ljIGV4YW1wbGVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoRGF0YSgnYWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcl90eXBlID0gJ2FsbCc7XG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBBbGxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXgtMVwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hEYXRhKCdidXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3R5cGUgPSAnYnV5JztcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEJ1eVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaERhdGEoJ3NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3R5cGUgPSAnc2VsbCc7XG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBTZWxsXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgIHYtaWY9XCJjdXJyZW5jaWVzICE9IG51bGwgJiYgY3VycmVuY2llcy5sZW5ndGggPiAwXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiY3VycmVuY2llcy5sZW5ndGhcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibmF2IG5hdi10YWJzIGJvcmRlclwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInRhYmxpc3RcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIihjdXJyZW5jeSwgaW5kZXgpIGluIGN1cnJlbmNpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaXNBY3RpdmUoY3VycmVuY3kuc3ltYm9sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaW5kZXggPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaERhdGEob3JkZXJfdHlwZSwgY3VycmVuY3kuc3ltYm9sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlKGN1cnJlbmN5LnN5bWJvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjdXJyZW5jeS5zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiUmVjZW50IE9yZGVyc1wiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCB3LTUwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJhdmFpbGFibGUtc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiQW1vdW50XCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJzLmF2YWlsYWJsZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLXJlc3BvbnNpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGE9XCJhZHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWx0ZXJzPVwiZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmN1cnJlbnRQYWdlLnN5bmM9XCJjdXJyZW50UGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnBhZ2VTaXplPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEB0b3RhbFBhZ2VzQ2hhbmdlZD1cInRvdGFsUGFnZXMgPSAkZXZlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZCBzbG90PVwiaGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10aCBzb3J0S2V5PVwibmFtZVwiIHNjb3BlPVwiY29sXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcIkFkdmVydGlzZXJzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fTwvdi10aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRoIHNvcnRLZXk9XCJwcmljZVwiIHNjb3BlPVwiY29sXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcIlByaWNlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fTwvdi10aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiTGltaXQvQXZhaWxhYmxlXCIpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGggc29ydEtleT1cIm1ldGhvZHNcIiBzY29wZT1cImNvbFwiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJNZXRob2RzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fTwvdi10aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRoIHNvcnRLZXk9XCJwb3N0X2JhbGFuY2VcIiBzY29wZT1cImNvbFwiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJBY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PC92LXRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IHNsb3Q9XCJib2R5XCIgc2xvdC1zY29wZT1cInsgZGlzcGxheURhdGEgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cImFkcyAhPSBudWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInJvdyBpbiBkaXNwbGF5RGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cInJvdy5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGRhdGEtbGFiZWw9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IHJvdy5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGRhdGEtbGFiZWw9XCJwcmljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyByb3cucHJpY2UgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcm93LmZpYXRfY3VycmVuY3kgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBkYXRhLWxhYmVsPVwibGltaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExpbWl0OiB7eyByb3cubGltaXQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHJvdy5maWF0X2N1cnJlbmN5IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXZhaWxhYmxlOiB7eyByb3cuYXZhaWxhYmxlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyByb3cuY3VycmVuY3lfc3ltYm9sIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGRhdGEtbGFiZWw9XCJtZXRob2RzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSBpbiByb3cubWV0aG9kc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJhZGdlIGJnLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRpdGxlPVwibWV0aG9kLnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LXRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgbWV0aG9kLnRpdGxlIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgZGF0YS1sYWJlbD1cImxpbWl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgYnRuLXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIlB1cmNoYXNlKHJvdy5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJObyByZXN1bHRzIGZvdW5kIVwiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgbXMtYXV0byBwYi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hcnQtcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjdXJyZW50UGFnZS5zeW5jPVwiY3VycmVudFBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0b3RhbFBhZ2VzPVwidG90YWxQYWdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFtdLFxuICAgIC8vIGNvbXBvbmVudCBsaXN0XG4gICAgY29tcG9uZW50czoge30sXG5cbiAgICAvLyBjb21wb25lbnQgZGF0YVxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmRlcl90eXBlOiBcImFsbFwiLFxuICAgICAgICAgICAgYWRzOiBbXSxcbiAgICAgICAgICAgIGN1cl9yYXRlOiBjdXJfcmF0ZSxcbiAgICAgICAgICAgIGN1cl9zeW1ib2w6IGN1cl9zeW1ib2wsXG4gICAgICAgICAgICBmaWx0ZXJzOiB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlOiB7IHZhbHVlOiBcIlwiLCBrZXlzOiBbXCJhdmFpbGFibGVcIl0gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgIHRvdGFsUGFnZXM6IDAsXG4gICAgICAgICAgICBjdXJyZW5jaWVzOiBbXSxcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW06IG51bGwsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8vIGN1c3RvbSBtZXRob2RzXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpc0FjdGl2ZShtZW51SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlSXRlbSA9PT0gbWVudUl0ZW07XG4gICAgICAgIH0sXG4gICAgICAgIHNldEFjdGl2ZShtZW51SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbWVudUl0ZW07XG4gICAgICAgIH0sXG4gICAgICAgIGdvQmFjaygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICA/IHRoaXMuJHJvdXRlci5nbygtMSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHJvdXRlci5wdXNoKFwiL1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmV0Y2hEYXRhKHR5cGUgPSBcImFsbFwiLCBjdXJyZW5jeSA9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJGh0dHBcbiAgICAgICAgICAgICAgICAucG9zdChcIi91c2VyL3AycC9mZXRjaC9yZWNlbnQvb3JkZXJzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmN1cnJlbmNpZXMgPSByZXNwb25zZS5kYXRhLmN1cnJlbmNpZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuYWRzID0gcmVzcG9uc2UuZGF0YS5hZHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgY3JlYXRlZFxuICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gICAgfSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBtb3VudGVkXG4gICAgbW91bnRlZCgpIHt9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IGRlc3Ryb3llZFxuICAgIGRlc3Ryb3llZCgpIHt9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgXCIuLi8uLi9zY3NzL3ZhcmlhYmxlc1wiO1xuQGltcG9ydCBcIi4uLy4uL3Njc3MvdG9vbHRpcFwiO1xuPC9zdHlsZT5cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1taXgvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sYXJhdmVsLW1peC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBUb29sdGlwc1xcbiAqL1xcbkAtd2Via2l0LWtleWZyYW1lcyB0b29sdGlwU2hvd0xlZnQge1xcbjAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG59XFxuMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTBweCk7XFxufVxcbn1cXG5Aa2V5ZnJhbWVzIHRvb2x0aXBTaG93TGVmdCB7XFxuMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbn1cXG4xMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMHB4KTtcXG59XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyB0b29sdGlwU2hvd1JpZ2h0IHtcXG4wJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcXG59XFxuMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMHB4KTtcXG59XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dSaWdodCB7XFxuMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XFxufVxcbjEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTBweCk7XFxufVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdG9vbHRpcFNob3dUb3Age1xcbjAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMHB4KTtcXG59XFxuMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XFxufVxcbn1cXG5Aa2V5ZnJhbWVzIHRvb2x0aXBTaG93VG9wIHtcXG4wJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7XFxufVxcbjEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xcbn1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHRvb2x0aXBTaG93Qm90dG9tIHtcXG4wJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG59XFxuMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcXG59XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dCb3R0b20ge1xcbjAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbn1cXG4xMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xcbn1cXG59XFxuLnRvb2x0aXAtd3JhcCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwLjVlbSAxZW07XFxuICBmb250LXNpemU6IDgwJTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjJlbTtcXG4gIGNvbG9yOiAjYTliOGNiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwNTE2ODtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHotaW5kZXg6IDEwMDA5O1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtbGVmdCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogdG9vbHRpcFNob3dMZWZ0IDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbiAgICAgICAgICBhbmltYXRpb246IHRvb2x0aXBTaG93TGVmdCAzMDBtcyBjdWJpYy1iZXppZXIoMC42NCwgLTAuMjgsIDAuMDUsIDEuNDA1KSBmb3J3YXJkcztcXG59XFxuLnRvb2x0aXAtd3JhcC50b29sdGlwLXJpZ2h0IHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB0b29sdGlwU2hvd1JpZ2h0IDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbiAgICAgICAgICBhbmltYXRpb246IHRvb2x0aXBTaG93UmlnaHQgMzAwbXMgY3ViaWMtYmV6aWVyKDAuNjQsIC0wLjI4LCAwLjA1LCAxLjQwNSkgZm9yd2FyZHM7XFxufVxcbi50b29sdGlwLXdyYXAudG9vbHRpcC10b3Age1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHRvb2x0aXBTaG93VG9wIDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbiAgICAgICAgICBhbmltYXRpb246IHRvb2x0aXBTaG93VG9wIDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtYm90dG9tIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiB0b29sdGlwU2hvd0JvdHRvbSAzMDBtcyBjdWJpYy1iZXppZXIoMC42NCwgLTAuMjgsIDAuMDUsIDEuNDA1KSBmb3J3YXJkcztcXG4gICAgICAgICAgYW5pbWF0aW9uOiB0b29sdGlwU2hvd0JvdHRvbSAzMDBtcyBjdWJpYy1iZXppZXIoMC42NCwgLTAuMjgsIDAuMDUsIDEuNDA1KSBmb3J3YXJkcztcXG59XFxuLnRvb2x0aXAtd3JhcDphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDA7XFxuICB3aWR0aDogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogbm9uZTtcXG4gIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHg7XFxufVxcbi50b29sdGlwLXdyYXAudG9vbHRpcC1sZWZ0OmFmdGVyIHtcXG4gIGxlZnQ6IDEwMCU7XFxuICB0b3A6IDUwJTtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjNDA1MTY4O1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG59XFxuLnRvb2x0aXAtd3JhcC50b29sdGlwLXJpZ2h0OmFmdGVyIHtcXG4gIHJpZ2h0OiAxMDAlO1xcbiAgdG9wOiA1MCU7XFxuICBib3JkZXItcmlnaHQtY29sb3I6ICM0MDUxNjg7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtdG9wOmFmdGVyIHtcXG4gIHRvcDogMTAwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIGJvcmRlci10b3AtY29sb3I6ICM0MDUxNjg7XFxuICBtYXJnaW4tbGVmdDogLTVweDtcXG59XFxuLnRvb2x0aXAtd3JhcC50b29sdGlwLWJvdHRvbTphZnRlciB7XFxuICBib3R0b206IDEwMCU7XFxuICBsZWZ0OiA1MCU7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjNDA1MTY4O1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3Jlc291cmNlcy9zcmMvc2Nzcy90b29sdGlwLnNjc3NcIixcIndlYnBhY2s6Ly8uL3Jlc291cmNlcy9zcmMvUGFnZXMvcDJwL3AycC52dWVcIixcIndlYnBhY2s6Ly8uL3Jlc291cmNlcy9zcmMvc2Nzcy92YXJpYWJsZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7RUFBQTtBQU1BO0FBQ0k7SUFBTyxVQUFBO0lBQVksNEJBQUE7QUNBckI7QURDRTtJQUFPLFVBQUE7SUFBWSw0QkFBQTtBQ0dyQjtBQUNGO0FETkE7QUFDSTtJQUFPLFVBQUE7SUFBWSw0QkFBQTtBQ0FyQjtBRENFO0lBQU8sVUFBQTtJQUFZLDRCQUFBO0FDR3JCO0FBQ0Y7QURGQTtBQUNJO0lBQU8sVUFBQTtJQUFZLDJCQUFBO0FDTXJCO0FETEU7SUFBTyxVQUFBO0lBQVksMkJBQUE7QUNTckI7QUFDRjtBRFpBO0FBQ0k7SUFBTyxVQUFBO0lBQVksMkJBQUE7QUNNckI7QURMRTtJQUFPLFVBQUE7SUFBWSwyQkFBQTtBQ1NyQjtBQUNGO0FEUkE7QUFDSTtJQUFPLFVBQUE7SUFBWSw0QkFBQTtBQ1lyQjtBRFhFO0lBQU8sVUFBQTtJQUFZLDRCQUFBO0FDZXJCO0FBQ0Y7QURsQkE7QUFDSTtJQUFPLFVBQUE7SUFBWSw0QkFBQTtBQ1lyQjtBRFhFO0lBQU8sVUFBQTtJQUFZLDRCQUFBO0FDZXJCO0FBQ0Y7QURkQTtBQUNJO0lBQU8sVUFBQTtJQUFZLDJCQUFBO0FDa0JyQjtBRGpCRTtJQUFPLFVBQUE7SUFBWSwyQkFBQTtBQ3FCckI7QUFDRjtBRHhCQTtBQUNJO0lBQU8sVUFBQTtJQUFZLDJCQUFBO0FDa0JyQjtBRGpCRTtJQUFPLFVBQUE7SUFBWSwyQkFBQTtBQ3FCckI7QUFDRjtBRHBCQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JFYlM7RUZjVCxnQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBakNhO0VBa0NiLHlCQW5DUztFQW9DVCx5Q0UwRFc7RUZ6RFgsT0FBQTtFQUNBLE1BQUE7RUFDQSxjQUFBO0FDc0JGO0FEcEJFO0VBQWlCLHdGQUFBO1VBQUEsZ0ZBQUE7QUN1Qm5CO0FEdEJFO0VBQWtCLHlGQUFBO1VBQUEsaUZBQUE7QUN5QnBCO0FEeEJFO0VBQWdCLHVGQUFBO1VBQUEsK0VBQUE7QUMyQmxCO0FEMUJFO0VBQW1CLDBGQUFBO1VBQUEsa0ZBQUE7QUM2QnJCO0FEM0JFO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0FDNkJKO0FEMUJFO0VBQ0UsVUFBQTtFQUNBLFFBQUE7RUFDQSwwQkE3RE87RUE4RFAsZ0JBQUE7QUM0Qko7QUQxQkU7RUFDRSxXQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQW5FTztFQW9FUCxnQkFBQTtBQzRCSjtBRDFCRTtFQUNFLFNBQUE7RUFDQSxTQUFBO0VBQ0EseUJBekVPO0VBMEVQLGlCQUFBO0FDNEJKO0FEMUJFO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSw0QkEvRU87RUFnRlAsaUJBQUE7QUM0QkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogVG9vbHRpcHNcXG4gKi9cXG4kdGlwQ29sb3I6IGxpZ2h0ZW4oICRjb2xvckRvY3VtZW50LCAyMCUgKTtcXG4kdGlwVGV4dENvbG9yOiBsaWdodGVuKCAkY29sb3JEb2N1bWVudCwgNjAlICk7XFxuXFxuQGtleWZyYW1lcyB0b29sdGlwU2hvd0xlZnQge1xcbiAgICAwJSAgIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCAtMjBweCApOyB9XFxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoIC0xMHB4ICk7IH1cXG59XFxuQGtleWZyYW1lcyB0b29sdGlwU2hvd1JpZ2h0IHtcXG4gICAgMCUgICB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCggMjBweCApOyB9XFxuICAgIDEwMCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoIDEwcHggKTsgfVxcbn1cXG5Aa2V5ZnJhbWVzIHRvb2x0aXBTaG93VG9wIHtcXG4gICAgMCUgICB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSggLTIwcHggKTsgfVxcbiAgICAxMDAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAtMTBweCApOyB9XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dCb3R0b20ge1xcbiAgICAwJSAgIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAyMHB4ICk7IH1cXG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTBweCApOyB9XFxufVxcbi50b29sdGlwLXdyYXAge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAkbGluZUpvaW47XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogY2FsYyggJHBhZFNwYWNlIC8gMiApICRwYWRTcGFjZTtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMmVtO1xcbiAgY29sb3I6ICR0aXBUZXh0Q29sb3I7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkdGlwQ29sb3I7XFxuICBib3gtc2hhZG93OiAkc2hhZG93Qm9sZDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiBjYWxjKCAkemluZGV4QWxlcnRzICsgMTAgKTtcXG5cXG4gICYudG9vbHRpcC1sZWZ0IHsgYW5pbWF0aW9uOiB0b29sdGlwU2hvd0xlZnQgJGZ4U3BlZWQgJGZ4RWFzZUJvdW5jZSBmb3J3YXJkczsgfVxcbiAgJi50b29sdGlwLXJpZ2h0IHsgYW5pbWF0aW9uOiB0b29sdGlwU2hvd1JpZ2h0ICRmeFNwZWVkICRmeEVhc2VCb3VuY2UgZm9yd2FyZHM7IH1cXG4gICYudG9vbHRpcC10b3AgeyBhbmltYXRpb246IHRvb2x0aXBTaG93VG9wICRmeFNwZWVkICRmeEVhc2VCb3VuY2UgZm9yd2FyZHM7IH1cXG4gICYudG9vbHRpcC1ib3R0b20geyBhbmltYXRpb246IHRvb2x0aXBTaG93Qm90dG9tICRmeFNwZWVkICRmeEVhc2VCb3VuY2UgZm9yd2FyZHM7IH1cXG5cXG4gICY6YWZ0ZXIgeyAvLyBhcnJvd1xcbiAgICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICB3aWR0aDogMDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIHRyYW5zaXRpb246IG5vbmU7XFxuICAgIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci13aWR0aDogNXB4O1xcbiAgfVxcblxcbiAgJi50b29sdGlwLWxlZnQ6YWZ0ZXIgeyAvLyBhcnJvdyBvbiByaWdodFxcbiAgICBsZWZ0OiAxMDAlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICR0aXBDb2xvcjtcXG4gICAgbWFyZ2luLXRvcDogLTVweDtcXG4gIH1cXG4gICYudG9vbHRpcC1yaWdodDphZnRlciB7IC8vIGFycm93IG9uIGxlZnRcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICR0aXBDb2xvcjtcXG4gICAgbWFyZ2luLXRvcDogLTVweDtcXG4gIH1cXG4gICYudG9vbHRpcC10b3A6YWZ0ZXIgeyAvLyBhcnJvdyBvbiBib3R0b21cXG4gICAgdG9wOiAxMDAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIGJvcmRlci10b3AtY29sb3I6ICR0aXBDb2xvcjtcXG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XFxuICB9XFxuICAmLnRvb2x0aXAtYm90dG9tOmFmdGVyIHsgLy8gYXJyb3cgb24gdG9wXFxuICAgIGJvdHRvbTogMTAwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkdGlwQ29sb3I7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xcbiAgfVxcbn1cXG5cIixcIi8qKlxcbiAqIFRvb2x0aXBzXFxuICovXFxuQGtleWZyYW1lcyB0b29sdGlwU2hvd0xlZnQge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTBweCk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dSaWdodCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTBweCk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dUb3Age1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgdG9vbHRpcFNob3dCb3R0b20ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xcbiAgfVxcbn1cXG4udG9vbHRpcC13cmFwIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDAuNWVtIDFlbTtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMmVtO1xcbiAgY29sb3I6ICNhOWI4Y2I7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDA1MTY4O1xcbiAgYm94LXNoYWRvdzogMCAycHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwMDk7XFxufVxcbi50b29sdGlwLXdyYXAudG9vbHRpcC1sZWZ0IHtcXG4gIGFuaW1hdGlvbjogdG9vbHRpcFNob3dMZWZ0IDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtcmlnaHQge1xcbiAgYW5pbWF0aW9uOiB0b29sdGlwU2hvd1JpZ2h0IDMwMG1zIGN1YmljLWJlemllcigwLjY0LCAtMC4yOCwgMC4wNSwgMS40MDUpIGZvcndhcmRzO1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtdG9wIHtcXG4gIGFuaW1hdGlvbjogdG9vbHRpcFNob3dUb3AgMzAwbXMgY3ViaWMtYmV6aWVyKDAuNjQsIC0wLjI4LCAwLjA1LCAxLjQwNSkgZm9yd2FyZHM7XFxufVxcbi50b29sdGlwLXdyYXAudG9vbHRpcC1ib3R0b20ge1xcbiAgYW5pbWF0aW9uOiB0b29sdGlwU2hvd0JvdHRvbSAzMDBtcyBjdWJpYy1iZXppZXIoMC42NCwgLTAuMjgsIDAuMDUsIDEuNDA1KSBmb3J3YXJkcztcXG59XFxuLnRvb2x0aXAtd3JhcDphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDA7XFxuICB3aWR0aDogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogbm9uZTtcXG4gIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHg7XFxufVxcbi50b29sdGlwLXdyYXAudG9vbHRpcC1sZWZ0OmFmdGVyIHtcXG4gIGxlZnQ6IDEwMCU7XFxuICB0b3A6IDUwJTtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjNDA1MTY4O1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG59XFxuLnRvb2x0aXAtd3JhcC50b29sdGlwLXJpZ2h0OmFmdGVyIHtcXG4gIHJpZ2h0OiAxMDAlO1xcbiAgdG9wOiA1MCU7XFxuICBib3JkZXItcmlnaHQtY29sb3I6ICM0MDUxNjg7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbn1cXG4udG9vbHRpcC13cmFwLnRvb2x0aXAtdG9wOmFmdGVyIHtcXG4gIHRvcDogMTAwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIGJvcmRlci10b3AtY29sb3I6ICM0MDUxNjg7XFxuICBtYXJnaW4tbGVmdDogLTVweDtcXG59XFxuLnRvb2x0aXAtd3JhcC50b29sdGlwLWJvdHRvbTphZnRlciB7XFxuICBib3R0b206IDEwMCU7XFxuICBsZWZ0OiA1MCU7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjNDA1MTY4O1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxufVwiLFwiLy8gdG9wYmFyIHNpemVcXG4kdG9wYmFySDogNjJweDtcXG4kdG9wYmFySGVpZ2h0OiA1MHB4O1xcblxcbi8vIGxpc3QgaWNvbnMgZml4ZWQgc2l6ZSAod3xoIHB4KVxcbiRpY29uU2l6ZTogNDZweDtcXG5cXG4vLyBzcGFjaW5nIGFuZCBwYWRkaW5nXFxuJHBhZFNwYWNlOiAxZW07XFxuJHBhZFNwYWNlU21hbGw6IGNhbGMoJHBhZFNwYWNlIC8gMik7XFxuJGNvbFNwYWNlOiAxLjJlbTtcXG4kcm93U3BhY2U6IDEuMmVtO1xcbiRsaXN0U3BhY2U6IDAuNGVtO1xcblxcbi8vIGJvcmRlcnMgYW5kIGxpbmVzXFxuJGxpbmVXaWR0aDogMnB4O1xcbiRsaW5lU3R5bGU6IHNvbGlkO1xcbiRsaW5lQ29sb3I6IHJnYmEoIHdoaXRlLCAwLjAyICk7XFxuJGxpbmVKb2luOiA2cHg7XFxuXFxuLy8gY29tbW9uIHotaW5kZXggdmFsdWVzXFxuJHppbmRleFVuZGVyOiAtMTtcXG4kemluZGV4RWxlbWVudHM6IDEwMDtcXG4kemluZGV4TW9kYWxzOiA4ODg4O1xcbiR6aW5kZXhBbGVydHM6IDk5OTk7XFxuXFxuLy8gYmFzZSBmb250IG9wdGlvbnNcXG4kZm9udFNpemU6IDE3cHg7XFxuJGZvbnRTcGFjZTogMS40ZW07XFxuJGZvbnRXZWlnaHQ6IG5vcm1hbDtcXG4kZm9udEZhbWlseTogJ09wZW4gU2FucyBDb25kZW5zZWQnLCAnQ29udHJhaWwgT25lJywgQ2FwcmlvbGEsIENvbnNvbGFzLCBNb25hY28sIG1vbm9zcGFjZTtcXG4kZm9udEZpeGVkOiBDb25zb2xhcywgTW9uYWNvLCBtb25vc3BhY2U7XFxuXFxuLy8gZG9jdW1lbnQgY29sb3JzXFxuJGNvbG9yRG9jdW1lbnQ6ICMxOTIwMjk7XFxuJGNvbG9yRG9jdW1lbnRUZXh0OiAjYmFiYmJjO1xcbiRjb2xvckRvY3VtZW50TGlnaHQ6IGxpZ2h0ZW4oICRjb2xvckRvY3VtZW50LCAzJSApO1xcbiRjb2xvckRvY3VtZW50RGFyazogZGFya2VuKCAkY29sb3JEb2N1bWVudCwgNiUgKTtcXG5cXG4vL3Njcm9sbGJhciBjb2xvcnNcXG4kY29sb3JTY3JvbGxUcmFjazogbGlnaHRlbiggJGNvbG9yRG9jdW1lbnQsIDMlICk7XFxuJGNvbG9yU2Nyb2xsVGh1bWI6IGRhcmtlbiggJGNvbG9yRG9jdW1lbnQsIDMlICk7XFxuXFxuLy8gZGVmYXVsdCBjb2xvcnNcXG4kY29sb3JEZWZhdWx0OiBsaWdodGdyYXk7XFxuJGNvbG9yRGVmYXVsdFRleHQ6IGRhcmtlbiggJGNvbG9yRGVmYXVsdCwgNDAlICk7XFxuXFxuLy8gcHJpbWFyeSBjb2xvcnNcXG4kY29sb3JHYWluOiBkYXJrZW4oIHllbGxvd2dyZWVuLCAxMCUgKTtcXG4kY29sb3JHYWluVGV4dDogZGFya2VuKCAkY29sb3JHYWluLCA0MCUgKTtcXG5cXG4vLyBwcmltYXJ5IGNvbG9yc1xcbiRjb2xvckxvc3M6IGRlc2F0dXJhdGUoIHJlZCwgMzAlICk7XFxuJGNvbG9yTG9zc1RleHQ6IGRhcmtlbiggJGNvbG9yTG9zcywgNDAlICk7XFxuXFxuLy8gcHJpbWFyeSBjb2xvcnNcXG4kY29sb3JQcmltYXJ5OiBkZXNhdHVyYXRlKCBvcmFuZ2UsIDEwJSApO1xcbiRjb2xvclByaW1hcnlUZXh0OiBkYXJrZW4oICRjb2xvclByaW1hcnksIDQwJSApO1xcblxcbi8vIHNlY29uZGFyeSBjb2xvcnNcXG4kY29sb3JTZWNvbmRhcnk6IHN0ZWVsYmx1ZTtcXG4kY29sb3JTZWNvbmRhcnlUZXh0OiBkYXJrZW4oICRjb2xvclNlY29uZGFyeSwgNDAlICk7XFxuXFxuLy8gc3VjY2VzcyBjb2xvcnNcXG4kY29sb3JTdWNjZXNzOiBkZXNhdHVyYXRlKCBvbGl2ZWRyYWIsIDEwJSApO1xcbiRjb2xvclN1Y2Nlc3NUZXh0OiBsaWdodGVuKCAkY29sb3JTdWNjZXNzLCA0NSUgKTtcXG5cXG4vLyB3YXJuaW5nIGNvbG9yc1xcbiRjb2xvcldhcm5pbmc6IGRlc2F0dXJhdGUoIG9yYW5nZSwgMzAlICk7XFxuJGNvbG9yV2FybmluZ1RleHQ6IGxpZ2h0ZW4oICRjb2xvcldhcm5pbmcsIDQwJSApO1xcblxcbi8vIGRhbmdlciBjb2xvcnNcXG4kY29sb3JEYW5nZXI6IGRlc2F0dXJhdGUoIGZpcmVicmljaywgMTAlICk7XFxuJGNvbG9yRGFuZ2VyVGV4dDogbGlnaHRlbiggJGNvbG9yRGFuZ2VyLCA0MCUgKTtcXG5cXG4vLyBpbmZvIGNvbG9yc1xcbiRjb2xvckluZm86IGRhcmtlbiggc2xhdGVncmF5LCAxNSUgKTtcXG4kY29sb3JJbmZvVGV4dDogbGlnaHRlbiggJGNvbG9ySW5mbywgNDUlICk7XFxuXFxuLy8gZ3JleSBjb2xvcnNcXG4kY29sb3JHcmV5OiBsaWdodHNsYXRlZ3JheTtcXG4kY29sb3JHcmV5VGV4dDogbGlnaHRlbiggJGNvbG9yR3JleSwgNDAlICk7XFxuXFxuLy8gYnJpZ2h0IGNvbG9yc1xcbiRjb2xvckJyaWdodDogYWxpY2VibHVlO1xcbiRjb2xvckJyaWdodFRleHQ6IGRhcmtlbiggJGNvbG9yQnJpZ2h0LCA0MCUgKTtcXG5cXG4vLyBvdGhlciBjb2xvcnNcXG4kY29sb3JUZXh0OiBsaWdodGdyYXk7XFxuJGNvbG9yT3ZlcmxheTogcmdiYSggMCwgMCwgMCwgMC41ICk7XFxuXFxuLy8gY29tbW9uIHNoYWRvdyBzdHlsZXNcXG4kc2hhZG93SG9sbG93OiBpbnNldCAwIDFweCA0cHggcmdiYSggMCwgMCwgMCwgMC4xNSApO1xcbiRzaGFkb3dCdWJibGU6IGluc2V0IDAgLTIwcHggMjBweCByZ2JhKCAwLCAwLCAwLCAwLjEgKTtcXG4kc2hhZG93UGFwZXI6IDAgMXB4IDJweCByZ2JhKCAwLCAwLCAwLCAwLjIgKTtcXG4kc2hhZG93RGFyazogMCAxcHggM3B4IHJnYmEoIDAsIDAsIDAsIDAuMyApO1xcbiRzaGFkb3dHbG93OiAwIDAgMTBweCByZ2JhKCAwLCAwLCAwLCAwLjIgKTtcXG4kc2hhZG93Qm9sZDogMCAycHggMTJweCByZ2JhKCAwLCAwLCAwLCAwLjQgKTtcXG4kc2hhZG93VGV4dDogMXB4IDFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMyApO1xcblxcbi8vIHRyYW5zaXRpb24gcHJvcHNcXG4kZnhTcGVlZDogMzAwbXM7XFxuJGZ4RWFzZTogY3ViaWMtYmV6aWVyKCAwLjIxNSwgMC42MTAsIDAuMzU1LCAxLjAwMCApO1xcbiRmeEVhc2VCb3VuY2U6IGN1YmljLWJlemllciggMC42NDAsIC0wLjI4MCwgMC4wNTAsIDEuNDA1ICk7XFxuJGZ4U3BlZWRPZmZzZXQ6IGNhbGMoICN7JGZ4U3BlZWR9IC8gMyApO1xcbiRmeFNsaWRlRGlzdDogMjBweDtcXG4kZnhTaHJpbmtTY2FsZTogLjQ7XFxuJGZ4R3Jvd1NjYWxlOiAxLjQ7XFxuJGZ4Um90YXRlQW1vdW50OiA4ZGVnO1xcblxcbi8vIHNjcmVlbiBzaXplc1xcbiRzaXplU21hbGw6IDQyMHB4O1xcbiRzaXplTWVkaXVtOiA3MjBweDtcXG4kc2l6ZUxhcmdlOiAxMjgwcHg7XFxuXFxuLy8gc2NyZWVuIGJyZWFrcG9pbnRzXFxuJHNjcmVlblNtYWxsOiBcXFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyRzaXplU21hbGx9KVxcXCI7XFxuJHNjcmVlbk1lZGl1bTogXFxcIm9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogI3skc2l6ZU1lZGl1bX0pXFxcIjtcXG4kc2NyZWVuTGFyZ2U6IFxcXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JHNpemVMYXJnZX0pXFxcIjtcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY4WzBdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY4WzBdLnJ1bGVzWzBdLnVzZVsyXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNjhbMF0ucnVsZXNbMF0udXNlWzNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcDJwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL3AycC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ODQxOGY4MjImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vcDJwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vcDJwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9wMnAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnODQxOGY4MjInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnODQxOGY4MjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnODQxOGY4MjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3AycC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ODQxOGY4MjImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignODQxOGY4MjInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9zcmMvUGFnZXMvcDJwL3AycC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTVbMF0ucnVsZXNbMF0udXNlWzBdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcDJwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC01WzBdLnJ1bGVzWzBdLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3AycC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sYXJhdmVsLW1peC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02OFswXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02OFswXS5ydWxlc1swXS51c2VbMl0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY4WzBdLnJ1bGVzWzBdLnVzZVszXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3AycC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcDJwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD04NDE4ZjgyMiZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcIm1iLTEgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuLWdyb3VwXCIsXG4gICAgICAgICAgICBhdHRyczogeyByb2xlOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkJhc2ljIGV4YW1wbGVcIiB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uZmV0Y2hEYXRhKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIF92bS5vcmRlcl90eXBlID0gXCJhbGxcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIEFsbFxcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBteC0xXCIsXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5mZXRjaERhdGEoXCJidXlcIilcbiAgICAgICAgICAgICAgICAgICAgX3ZtLm9yZGVyX3R5cGUgPSBcImJ1eVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgQnV5XFxuICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tb3V0bGluZS1kYW5nZXJcIixcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmZldGNoRGF0YShcInNlbGxcIilcbiAgICAgICAgICAgICAgICAgICAgX3ZtLm9yZGVyX3R5cGUgPSBcInNlbGxcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIFNlbGxcXG4gICAgICAgICAgICBcIildXG4gICAgICAgICAgICApLFxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLmN1cnJlbmNpZXMgIT0gbnVsbCAmJiBfdm0uY3VycmVuY2llcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBfdm0uY3VycmVuY2llcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2IG5hdi10YWJzIGJvcmRlclwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvbGU6IFwidGFibGlzdFwiIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmN1cnJlbmNpZXMsIGZ1bmN0aW9uIChjdXJyZW5jeSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwibGlcIiwgeyBrZXk6IGluZGV4LCBzdGF0aWNDbGFzczogXCJuYXYtaXRlbVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFjdGl2ZUl0ZW0gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5pc0FjdGl2ZShjdXJyZW5jeS5zeW1ib2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaW5kZXggPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZmV0Y2hEYXRhKF92bS5vcmRlcl90eXBlLCBjdXJyZW5jeS5zeW1ib2wpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0QWN0aXZlKGN1cnJlbmN5LnN5bWJvbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKGN1cnJlbmN5LnN5bWJvbCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDJcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgXVxuICAgICksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLTEyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDRcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLXRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiUmVjZW50IE9yZGVyc1wiKSkgK1xuICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwIHctNTBcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImF2YWlsYWJsZS1zZWFyY2hcIiB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiQW1vdW50XCIpKSldXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5maWx0ZXJzLmF2YWlsYWJsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmaWx0ZXJzLmF2YWlsYWJsZS52YWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uZmlsdGVycy5hdmFpbGFibGUudmFsdWUgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmZpbHRlcnMuYXZhaWxhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGFibGUtcmVzcG9uc2l2ZVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi10YWJsZVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBfdm0uYWRzLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBfdm0uZmlsdGVycyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IF92bS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidXBkYXRlOmN1cnJlbnRQYWdlXCI6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFBhZ2UgPSAkZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGU6Y3VycmVudC1wYWdlXCI6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFBhZ2UgPSAkZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlc0NoYW5nZWQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0udG90YWxQYWdlcyA9ICRldmVudFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcImJvZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlEYXRhID0gcmVmLmRpc3BsYXlEYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGJvZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWRzICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLl9sKGRpc3BsYXlEYXRhLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidHJcIiwgeyBrZXk6IHJvdy5pZCB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IFwiZGF0YS1sYWJlbFwiOiBcIm5hbWVcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInNwYW5cIiwgW192bS5fdihfdm0uX3Mocm93Lm5hbWUpKV0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IFwiZGF0YS1sYWJlbFwiOiBcInByaWNlXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Mocm93LnByaWNlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJvdy5maWF0X2N1cnJlbmN5KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJkYXRhLWxhYmVsXCI6IFwibGltaXRcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaW1pdDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhyb3cubGltaXQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhyb3cuZmlhdF9jdXJyZW5jeSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXZhaWxhYmxlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJvdy5hdmFpbGFibGUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhyb3cuY3VycmVuY3lfc3ltYm9sKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBcImRhdGEtbGFiZWxcIjogXCJtZXRob2RzXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lm1ldGhvZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAobWV0aG9kLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWRnZSBiZy1zZWNvbmRhcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWV0aG9kLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKG1ldGhvZC50aXRsZSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJkYXRhLWxhYmVsXCI6IFwibGltaXRcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgYnRuLXNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uUHVyY2hhc2Uocm93LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIHsgYXR0cnM6IHsgY29sc3BhbjogXCIxMDAlXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiTm8gcmVzdWx0cyBmb3VuZCFcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0aGVhZFwiLCB7IGF0dHJzOiB7IHNsb3Q6IFwiaGVhZFwiIH0sIHNsb3Q6IFwiaGVhZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0clwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBzb3J0S2V5OiBcIm5hbWVcIiwgc2NvcGU6IFwiY29sXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJBZHZlcnRpc2Vyc1wiKSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgc29ydEtleTogXCJwcmljZVwiLCBzY29wZTogXCJjb2xcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlByaWNlXCIpKSldXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBhdHRyczogeyBzY29wZTogXCJjb2xcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIkxpbWl0L0F2YWlsYWJsZVwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgc29ydEtleTogXCJtZXRob2RzXCIsIHNjb3BlOiBcImNvbFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiTWV0aG9kc1wiKSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgc29ydEtleTogXCJwb3N0X2JhbGFuY2VcIiwgc2NvcGU6IFwiY29sXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJBY3Rpb25cIikpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIG1zLWF1dG8gcGItMFwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwic21hcnQtcGFnaW5hdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBfdm0uY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBfdm0udG90YWxQYWdlcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInVwZGF0ZTpjdXJyZW50UGFnZVwiOiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50UGFnZSA9ICRldmVudFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwidXBkYXRlOmN1cnJlbnQtcGFnZVwiOiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50UGFnZSA9ICRldmVudFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgXSksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwibmFtZXMiOlsicHJvcHMiLCJjb21wb25lbnRzIiwiZGF0YSIsIm9yZGVyX3R5cGUiLCJhZHMiLCJjdXJfcmF0ZSIsImN1cl9zeW1ib2wiLCJmaWx0ZXJzIiwiYXZhaWxhYmxlIiwidmFsdWUiLCJrZXlzIiwiY3VycmVudFBhZ2UiLCJ0b3RhbFBhZ2VzIiwiY3VycmVuY2llcyIsImFjdGl2ZUl0ZW0iLCJtZXRob2RzIiwiaXNBY3RpdmUiLCJtZW51SXRlbSIsInNldEFjdGl2ZSIsImdvQmFjayIsIndpbmRvdyIsImZldGNoRGF0YSIsInBvc3QiLCJ0eXBlIiwiY3VycmVuY3kiLCJ0aGVuIiwiY3JlYXRlZCIsIm1vdW50ZWQiLCJkZXN0cm95ZWQiXSwic291cmNlUm9vdCI6IiJ9