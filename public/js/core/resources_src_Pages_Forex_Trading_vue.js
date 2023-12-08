"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_Forex_Trading_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  // component list
  components: {},
  // component data
  data: function data() {
    return {
      account: {},
      windowHeight: window.innerHeight * 0.88,
      windowWidth: window.innerWidth * 0.955,
      txt: ""
    };
  },
  // custom methods
  methods: {
    goBack: function goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    fetchData: function fetchData() {
      var _this = this;

      this.$http.post("/user/fetch/forex").then(function (response) {
        _this.account = response.data.account;
      });
    },
    onResize: function onResize() {
      this.windowHeight = window.innerHeight * 0.88;
      this.windowWidth = window.innerWidth * 0.955;
    }
  },
  // on component created
  created: function created() {
    this.fetchData();
  },
  // on component mounted
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      window.addEventListener("resize", _this2.onResize);
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  // on component destroyed
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "./resources/src/Pages/Forex/Trading.vue":
/*!***********************************************!*\
  !*** ./resources/src/Pages/Forex/Trading.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trading.vue?vue&type=template&id=6f4b8ea0& */ "./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0&");
/* harmony import */ var _Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trading.vue?vue&type=script&lang=js& */ "./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/Forex/Trading.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0&":
/*!******************************************************************************!*\
  !*** ./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_6f4b8ea0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=template&id=6f4b8ea0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/Forex/Trading.vue?vue&type=template&id=6f4b8ea0& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
  return _c("iframe", {
    style:
      "height:" +
      _vm.windowHeight +
      "px;" +
      "width:" +
      _vm.windowWidth +
      "px;" +
      "margin:-27px",
    attrs: {
      src:
        "https://trade.mql5.com/trade?servers=" +
        _vm.account.broker +
        "&trade_server=" +
        _vm.account.broker +
        "&demo_all_servers&=1&startup_mode=open_trade&lang=" +
        _vm.account.language +
        "&save_password=on&login=" +
        _vm.account.number,
      allowfullscreen: "allowfullscreen",
    },
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX0ZvcmV4X1RyYWRpbmdfdnVlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLGlFQUFlO0VBQ2ZBLFNBREE7RUFFQTtFQUNBQyxjQUhBO0VBS0E7RUFDQUMsSUFOQSxrQkFNQTtJQUNBO01BQ0FDLFdBREE7TUFFQUMsdUNBRkE7TUFHQUMsc0NBSEE7TUFJQUM7SUFKQTtFQU1BLENBYkE7RUFlQTtFQUNBQztJQUNBQyxNQURBLG9CQUNBO01BQ0FDLDRCQUNBLG1CQURBLEdBRUEsc0JBRkE7SUFHQSxDQUxBO0lBTUFDLFNBTkEsdUJBTUE7TUFBQTs7TUFDQTtRQUNBO01BQ0EsQ0FGQTtJQUdBLENBVkE7SUFXQUMsUUFYQSxzQkFXQTtNQUNBO01BQ0E7SUFDQTtFQWRBLENBaEJBO0VBaUNBO0VBQ0FDLE9BbENBLHFCQWtDQTtJQUNBO0VBQ0EsQ0FwQ0E7RUFzQ0E7RUFDQUMsT0F2Q0EscUJBdUNBO0lBQUE7O0lBQ0E7TUFDQUo7SUFDQSxDQUZBO0VBR0EsQ0EzQ0E7RUE2Q0FLLGFBN0NBLDJCQTZDQTtJQUNBTDtFQUNBLENBL0NBO0VBZ0RBO0VBQ0FNLFNBakRBLHVCQWlEQTtBQWpEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQnNGO0FBQzNCO0FBQ0w7OztBQUd0RDtBQUNBLENBQWdHO0FBQ2hHLGdCQUFnQix1R0FBVTtBQUMxQixFQUFFLDZFQUFNO0FBQ1IsRUFBRSwrRUFBTTtBQUNSLEVBQUUsd0ZBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q3dNLENBQUMsaUVBQWUsNE1BQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRUEzTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL3NyYy9QYWdlcy9Gb3JleC9UcmFkaW5nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL0ZvcmV4L1RyYWRpbmcudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMvRm9yZXgvVHJhZGluZy52dWU/NWQxYiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL0ZvcmV4L1RyYWRpbmcudnVlPzYyZDMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9Gb3JleC9UcmFkaW5nLnZ1ZT8wNmUyIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8aWZyYW1lXG4gICAgICAgIDpzcmM9XCJcbiAgICAgICAgICAgICdodHRwczovL3RyYWRlLm1xbDUuY29tL3RyYWRlP3NlcnZlcnM9JyArXG4gICAgICAgICAgICBhY2NvdW50LmJyb2tlciArXG4gICAgICAgICAgICAnJmFtcDt0cmFkZV9zZXJ2ZXI9JyArXG4gICAgICAgICAgICBhY2NvdW50LmJyb2tlciArXG4gICAgICAgICAgICAnJmRlbW9fYWxsX3NlcnZlcnMmPTEmYW1wO3N0YXJ0dXBfbW9kZT1vcGVuX3RyYWRlJmFtcDtsYW5nPScgK1xuICAgICAgICAgICAgYWNjb3VudC5sYW5ndWFnZSArXG4gICAgICAgICAgICAnJmFtcDtzYXZlX3Bhc3N3b3JkPW9uJmxvZ2luPScgK1xuICAgICAgICAgICAgYWNjb3VudC5udW1iZXJcbiAgICAgICAgXCJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuPVwiYWxsb3dmdWxsc2NyZWVuXCJcbiAgICAgICAgOnN0eWxlPVwiXG4gICAgICAgICAgICAnaGVpZ2h0OicgK1xuICAgICAgICAgICAgd2luZG93SGVpZ2h0ICtcbiAgICAgICAgICAgICdweDsnICtcbiAgICAgICAgICAgICd3aWR0aDonICtcbiAgICAgICAgICAgIHdpbmRvd1dpZHRoICtcbiAgICAgICAgICAgICdweDsnICtcbiAgICAgICAgICAgICdtYXJnaW46LTI3cHgnXG4gICAgICAgIFwiXG4gICAgPjwvaWZyYW1lPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogW10sXG4gICAgLy8gY29tcG9uZW50IGxpc3RcbiAgICBjb21wb25lbnRzOiB7fSxcblxuICAgIC8vIGNvbXBvbmVudCBkYXRhXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjY291bnQ6IHt9LFxuICAgICAgICAgICAgd2luZG93SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjg4LFxuICAgICAgICAgICAgd2luZG93V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogMC45NTUsXG4gICAgICAgICAgICB0eHQ6IFwiXCIsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8vIGN1c3RvbSBtZXRob2RzXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnb0JhY2soKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLiRyb3V0ZXIuZ28oLTEpXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoRGF0YSgpIHtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAucG9zdChcIi91c2VyL2ZldGNoL2ZvcmV4XCIpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gcmVzcG9uc2UuZGF0YS5hY2NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVzaXplKCkge1xuICAgICAgICAgICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjg4O1xuICAgICAgICAgICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICogMC45NTU7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBjcmVhdGVkXG4gICAgY3JlYXRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgICB9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IG1vdW50ZWRcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUpO1xuICAgIH0sXG4gICAgLy8gb24gY29tcG9uZW50IGRlc3Ryb3llZFxuICAgIGRlc3Ryb3llZCgpIHt9LFxufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UcmFkaW5nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZjRiOGVhMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9UcmFkaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVHJhZGluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc2ZjRiOGVhMCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc2ZjRiOGVhMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc2ZjRiOGVhMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vVHJhZGluZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NmY0YjhlYTAmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNmY0YjhlYTAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9zcmMvUGFnZXMvRm9yZXgvVHJhZGluZy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTVbMF0ucnVsZXNbMF0udXNlWzBdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVHJhZGluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFkaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UcmFkaW5nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZjRiOGVhMCZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiaWZyYW1lXCIsIHtcbiAgICBzdHlsZTpcbiAgICAgIFwiaGVpZ2h0OlwiICtcbiAgICAgIF92bS53aW5kb3dIZWlnaHQgK1xuICAgICAgXCJweDtcIiArXG4gICAgICBcIndpZHRoOlwiICtcbiAgICAgIF92bS53aW5kb3dXaWR0aCArXG4gICAgICBcInB4O1wiICtcbiAgICAgIFwibWFyZ2luOi0yN3B4XCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIHNyYzpcbiAgICAgICAgXCJodHRwczovL3RyYWRlLm1xbDUuY29tL3RyYWRlP3NlcnZlcnM9XCIgK1xuICAgICAgICBfdm0uYWNjb3VudC5icm9rZXIgK1xuICAgICAgICBcIiZ0cmFkZV9zZXJ2ZXI9XCIgK1xuICAgICAgICBfdm0uYWNjb3VudC5icm9rZXIgK1xuICAgICAgICBcIiZkZW1vX2FsbF9zZXJ2ZXJzJj0xJnN0YXJ0dXBfbW9kZT1vcGVuX3RyYWRlJmxhbmc9XCIgK1xuICAgICAgICBfdm0uYWNjb3VudC5sYW5ndWFnZSArXG4gICAgICAgIFwiJnNhdmVfcGFzc3dvcmQ9b24mbG9naW49XCIgK1xuICAgICAgICBfdm0uYWNjb3VudC5udW1iZXIsXG4gICAgICBhbGxvd2Z1bGxzY3JlZW46IFwiYWxsb3dmdWxsc2NyZWVuXCIsXG4gICAgfSxcbiAgfSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwibmFtZXMiOlsicHJvcHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImFjY291bnQiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3dXaWR0aCIsInR4dCIsIm1ldGhvZHMiLCJnb0JhY2siLCJ3aW5kb3ciLCJmZXRjaERhdGEiLCJvblJlc2l6ZSIsImNyZWF0ZWQiLCJtb3VudGVkIiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3llZCJdLCJzb3VyY2VSb290IjoiIn0=