(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_ico_ICODetails_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuejs_countdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-countdown */ "./node_modules/vuejs-countdown/dist/vuejs-countdown.js");
/* harmony import */ var vuejs_countdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuejs_countdown__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ["user"],
  // component list
  components: {
    Countdown: (vuejs_countdown__WEBPACK_IMPORTED_MODULE_0___default())
  },
  // component data
  data: function data() {
    return {
      ico: [],
      amount: 0,
      rec_wallet: "",
      wallet_symbol: null,
      balance: null,
      cost: 0,
      loading: false
    };
  },
  // custom methods
  methods: {
    goBack: function goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    fetchData: function fetchData() {
      var _this = this;

      this.$http.post("/user/fetch/ico/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1)).then(function (response) {
        _this.ico = response.data.ico, _this.rec_wallet = response.data.rec_wallet, _this.wallet_symbol = response.data.ico.network_symbol, _this.balance = response.data.balance;
      });
    },
    purchase: function purchase() {
      var _this2 = this;

      this.loading = true, this.$http.post("/user/store/ico", {
        amount: this.amount,
        cost: this.amount / this.ico.rate,
        ico_symbol: this.ico.symbol,
        ico_id: this.ico.id,
        symbol: this.ico.network_symbol,
        rec_wallet: this.rec_wallet
      }).then(function (response) {
        _this2.$toast[response.data.type](response.data.message);

        _this2.fetchData();
      })["catch"](function (error) {
        _this2.$toast.error(error.response.data);
      })["finally"](function () {
        _this2.loading = false;
      });
    },
    fetchWallet: function fetchWallet() {
      var _this3 = this;

      this.$http.post("/user/fetch/wallet", {
        symbol: this.wallet_symbol,
        type: "funding"
      }).then(function (response) {
        _this3.balance = response.data.balance;
      });
    },
    createWallet: function createWallet() {
      var _this4 = this;

      this.loading = true, this.$http.post("/user/wallet/j/create", {
        symbol: this.wallet_symbol,
        type: "funding"
      }).then(function (response) {
        _this4.fetchWallet();

        _this4.$toast[response.data.type](response.data.message);
      })["catch"](function (error) {
        _this4.$toast.error(error.response.data);
      })["finally"](function () {
        _this4.loading = false;
      });
    },
    change_rec_wallet: function change_rec_wallet() {
      var _this5 = this;

      this.loading = true, this.$http.post("/user/store/ico/rec_wallet", {
        rec_wallet: this.rec_wallet,
        network_symbol: this.ico.network_symbol
      }).then(function (response) {
        _this5.fetchWallet();

        _this5.$toast[response.data.type](response.data.message);
      })["catch"](function (error) {
        _this5.$toast.error(error.response.data);
      })["finally"](function () {
        _this5.loading = false;
      });
    },
    costCal: function costCal() {
      this.cost = this.amount / this.ico.rate;
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

/***/ "./resources/src/Pages/ico/ICODetails.vue":
/*!************************************************!*\
  !*** ./resources/src/Pages/ico/ICODetails.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ICODetails.vue?vue&type=template&id=4212fbd6& */ "./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6&");
/* harmony import */ var _ICODetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ICODetails.vue?vue&type=script&lang=js& */ "./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ICODetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__.render,
  _ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/ico/ICODetails.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ICODetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ICODetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ICODetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6&":
/*!*******************************************************************************!*\
  !*** ./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ICODetails_vue_vue_type_template_id_4212fbd6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ICODetails.vue?vue&type=template&id=4212fbd6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/ico/ICODetails.vue?vue&type=template&id=4212fbd6& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-lg-8 col-md-6 col-sm-12 col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("div", [
              _c(
                "div",
                {
                  staticClass:
                    "d-flex justify-content-between align-items-center",
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-start align-items-center",
                    },
                    [
                      _vm.ico.icon != null
                        ? _c("img", {
                            staticClass: "avatar",
                            staticStyle: { filter: "grayscale(0)" },
                            attrs: {
                              height: "48px",
                              width: "48px",
                              src: _vm.ico.icon
                                ? "/assets/images/ico/" + _vm.ico.icon
                                : "/market/notification.png",
                              alt: "",
                            },
                          })
                        : _c("vue-skeleton-loader", {
                            attrs: {
                              type: "circle",
                              width: 48,
                              height: 48,
                              animation: "fade",
                            },
                          }),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "ms-1" },
                        [
                          _vm.ico.name != null
                            ? _c("h1", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.ico.name) +
                                    "\n                                    "
                                ),
                              ])
                            : _c("vue-skeleton-loader", {
                                attrs: {
                                  type: "rect",
                                  width: 300,
                                  height: 10,
                                  animation: "fade",
                                },
                              }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { key: _vm.ico.status }, [
                    _vm.ico.status == 0
                      ? _c("span", { staticClass: "badge bg-warning" }, [
                          _vm._v(_vm._s(_vm.$t("Upcoming"))),
                        ])
                      : _vm.ico.status == 1
                      ? _c("span", { staticClass: "badge bg-success" }, [
                          _vm._v(_vm._s(_vm.$t("Sale Live"))),
                        ])
                      : _vm.ico.status == 2
                      ? _c("span", { staticClass: "badge bg-danger" }, [
                          _vm._v(_vm._s(_vm.$t("Sale Ended"))),
                        ])
                      : _vm.ico.status == 3
                      ? _c("span", { staticClass: "badge bg-secondary" }, [
                          _vm._v(_vm._s(_vm.$t("Canceled"))),
                        ])
                      : _c(
                          "span",
                          { staticClass: "badge bg-secondary" },
                          [
                            _c("vue-skeleton-loader", {
                              attrs: {
                                type: "rect",
                                width: 60,
                                height: 10,
                                animation: "fade",
                              },
                            }),
                          ],
                          1
                        ),
                  ]),
                ]
              ),
              _vm._v(" "),
              _vm.ico.desc != null
                ? _c("div", { staticClass: "my-1" }, [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.ico.desc) +
                        "\n                        "
                    ),
                  ])
                : _c(
                    "div",
                    { staticClass: "my-1" },
                    [
                      _c("vue-skeleton-loader", {
                        staticClass: "mb-1",
                        attrs: {
                          type: "rect",
                          width: 500,
                          height: 10,
                          animation: "fade",
                        },
                      }),
                      _vm._v(" "),
                      _c("vue-skeleton-loader", {
                        staticClass: "mb-1",
                        attrs: {
                          type: "rect",
                          width: 500,
                          height: 10,
                          animation: "fade",
                        },
                      }),
                      _vm._v(" "),
                      _c("vue-skeleton-loader", {
                        staticClass: "mb-1",
                        attrs: {
                          type: "rect",
                          width: 500,
                          height: 10,
                          animation: "fade",
                        },
                      }),
                      _vm._v(" "),
                      _c("vue-skeleton-loader", {
                        staticClass: "mb-1",
                        attrs: {
                          type: "rect",
                          width: 400,
                          height: 10,
                          animation: "fade",
                        },
                      }),
                    ],
                    1
                  ),
            ]),
            _vm._v(" "),
            _c("table", { staticClass: "table" }, [
              _c("tbody", [
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Presale Address")))]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "a",
                      {
                        attrs: {
                          href: _vm.ico.presale_address,
                          target: "_blank",
                          rel: "noreferrer nofollow",
                        },
                      },
                      [_vm._v(_vm._s(_vm.ico.address))]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Token Name")))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.ico.name))]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Token Symbol")))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.ico.symbol))]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Token Decimals")))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.ico.decimals))]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Token Address")))]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "a",
                      {
                        staticClass: "mr-1",
                        attrs: {
                          href: _vm.ico.address,
                          target: "_blank",
                          rel: "noreferrer nofollow",
                        },
                      },
                      [_vm._v(_vm._s(_vm.ico.address))]
                    ),
                    _c("br"),
                    _vm._v(" "),
                    _c("p", { staticClass: "help is-info" }, [
                      _vm._v(
                        "\n                                        (" +
                          _vm._s(_vm.$t("Do not send")) +
                          "\n                                        " +
                          _vm._s(_vm.ico.network_symbol) +
                          "\n                                        " +
                          _vm._s(_vm.$t("to the token address")) +
                          "!)\n                                    "
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Total Supply")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.total_supply, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.symbol) +
                        "\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Tokens For Presale")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.presale_supply, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.symbol) +
                        "\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Tokens For Liquidity")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.liquidity_supply, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.symbol) +
                        "\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm.$t("Initial Market Cap (estimate)")) +
                        "\n                                "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "$" + _vm._s(_vm._f("toMoney")(_vm.ico.initial_cap, 2))
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Soft Cap")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.soft_cap, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.network_symbol) +
                        "\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Max Owner Receive")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.owner_max, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.network_symbol)
                    ),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        key: _vm.ico.owner_recieved,
                        staticClass: "has-text-info is-size-7",
                      },
                      [
                        _vm._v(
                          "\n                                        (" +
                            _vm._s(_vm.$t("Current")) +
                            ":\n                                        " +
                            _vm._s(
                              _vm._f("toMoney")(_vm.ico.owner_recieved, 4)
                            ) +
                            "\n                                        " +
                            _vm._s(_vm.ico.network_symbol) +
                            ")\n                                    "
                        ),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Presale Start Time")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(
                          _vm._f("moment")(
                            _vm.ico.soft_start,
                            "dddd, MMMM Do YYYY"
                          )
                        ) +
                        "\n                                    (UTC)\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Presale End Time")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(
                          _vm._f("moment")(
                            _vm.ico.soft_end,
                            "dddd, MMMM Do YYYY"
                          )
                        ) +
                        "\n                                    (UTC)\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Liquidity Percent")))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.ico.liquidity_percent) + "%")]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Liquidity Lockup Time")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm.ico.lockup) +
                        "\n                                    " +
                        _vm._s(_vm.$t("days after pool ends")) +
                        "\n                                "
                    ),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-4 col-md-6 col-sm-12 col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c(
            "div",
            { staticClass: "card-body" },
            [
              _vm.ico.stage != null
                ? _c(
                    "div",
                    { staticClass: "text-center mt-1" },
                    [
                      _vm.ico.stage == 0
                        ? _c("Countdown", {
                            attrs: { deadline: _vm.ico.soft_start },
                          })
                        : _vm.ico.stage == 1
                        ? _c("Countdown", {
                            attrs: { deadline: _vm.ico.soft_end },
                          })
                        : _vm.ico.stage == 2
                        ? _c("Countdown", {
                            attrs: { deadline: _vm.ico.hard_end },
                          })
                        : _vm._e(),
                    ],
                    1
                  )
                : _c("vue-skeleton-loader", {
                    staticClass: "text-center mt-1",
                    attrs: {
                      type: "rect",
                      width: 240,
                      height: 55,
                      animation: "fade",
                    },
                  }),
              _vm._v(" "),
              _c("div", { key: _vm.ico.soft_raised, staticClass: "mb-1" }, [
                _c("p", { staticClass: "text-dark" }, [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.$t("Progress")) +
                      " ("
                  ),
                  _c("span", { staticClass: "text-success" }, [
                    _vm._v(
                      _vm._s(
                        _vm._f("toMoney")(
                          (_vm.ico.soft_raised / _vm.ico.soft_cap) * 100,
                          2
                        )
                      ) + "%"
                    ),
                  ]),
                  _vm._v(")\n                        "),
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "mb-1" }, [
                  _c(
                    "div",
                    { staticClass: "progress", attrs: { id: "myRangeColor" } },
                    [
                      _c("div", {
                        staticClass:
                          "progress-bar progress-bar-striped progress-bar-animated",
                        style:
                          "width:" +
                          (_vm.ico.soft_raised / _vm.ico.soft_cap) * 100 +
                          "%",
                        attrs: {
                          id: "myRange",
                          role: "progressbar",
                          "aria-valuenow": "50",
                          "aria-valuemin": "0",
                          "aria-valuemax": "100",
                        },
                      }),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("small", { staticClass: "d-flex justify-content-between" }, [
                  _c("span", { key: _vm.ico.soft_raised }, [
                    _vm._v(
                      _vm._s(_vm._f("toMoney")(_vm.ico.soft_raised, 2)) +
                        "\n                                " +
                        _vm._s(_vm.ico.symbol)
                    ),
                  ]),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      _vm._s(_vm._f("toMoney")(_vm.ico.soft_cap, 2)) +
                        "\n                                " +
                        _vm._s(_vm.ico.symbol)
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "label",
                { staticClass: "text-start", attrs: { for: "amount" } },
                [_vm._v(_vm._s(_vm.$t("Recieving Wallet")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "input-group mb-1 w-auto" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.rec_wallet,
                      expression: "rec_wallet",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    name: "rec_wallet",
                    placeholder: "Add your recieving wallet",
                  },
                  domProps: { value: _vm.rec_wallet },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.rec_wallet = $event.target.value
                    },
                  },
                }),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "input-group-text btn btn-primary",
                    attrs: { disabled: _vm.loading },
                    on: {
                      click: function ($event) {
                        return _vm.change_rec_wallet()
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("Save")))]
                ),
              ]),
              _vm._v(" "),
              _c(
                "label",
                { staticClass: "text-start", attrs: { for: "amount" } },
                [_vm._v(_vm._s(_vm.$t("Amount")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "mb-1 w-auto" }, [
                _c("div", { staticClass: "input-group" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.amount,
                        expression: "amount",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: { type: "number", name: "amount", min: "0" },
                    domProps: { value: _vm.amount },
                    on: {
                      keyup: function ($event) {
                        return _vm.costCal()
                      },
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.amount = $event.target.value
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "input-group-text text-dark" }, [
                    _vm._v(_vm._s(_vm.ico.symbol)),
                  ]),
                ]),
                _vm._v(" "),
                _c("small", [
                  _c("span", { staticClass: "text-warning" }, [_vm._v("Min:")]),
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.ico.client_min ? _vm.ico.client_min : 1) +
                      "\n                            " +
                      _vm._s(_vm.ico.symbol) +
                      " /\n                            "
                  ),
                  _c("span", { staticClass: "text-warning" }, [_vm._v("Max:")]),
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.ico.client_max) +
                      " " +
                      _vm._s(_vm.ico.symbol)
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "label",
                { staticClass: "text-start", attrs: { for: "cost" } },
                [_vm._v(_vm._s(_vm.$t("Cost")))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "input-group mb-1 w-auto" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.cost,
                      expression: "cost",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", readonly: "", disabled: "" },
                  domProps: { value: _vm.cost },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.cost = $event.target.value
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", { staticClass: "input-group-text text-dark" }, [
                  _vm._v(_vm._s(_vm.ico.network_symbol)),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "label",
                { staticClass: "text-start", attrs: { for: "balance" } },
                [_vm._v(_vm._s(_vm.$t("Balance")))]
              ),
              _vm._v(" "),
              _c("div", { key: _vm.balance }, [
                _vm.balance != null
                  ? _c(
                      "div",
                      {
                        staticClass: "w-100 mb-1 btn btn-outline-success",
                        attrs: { disabled: "" },
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.balance) +
                            "\n                            " +
                            _vm._s(_vm.wallet_symbol) +
                            "\n                        "
                        ),
                      ]
                    )
                  : _c(
                      "div",
                      {
                        staticClass: "w-100 mb-1 btn btn-outline-warning",
                        attrs: { disabled: _vm.loading },
                        on: {
                          click: function ($event) {
                            return _vm.createWallet()
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.$t("Create")) +
                            " " +
                            _vm._s(_vm.ico.network_symbol) +
                            "\n                            " +
                            _vm._s(_vm.$t("Wallet")) +
                            "\n                        "
                        ),
                      ]
                    ),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _vm.ico.status == 1
            ? _c(
                "div",
                { staticClass: "card-footer d-flex justify-content-between" },
                [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success",
                      attrs: { disabled: _vm.loading },
                      on: {
                        click: function ($event) {
                          return _vm.purchase()
                        },
                      },
                    },
                    [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.$t("Buy")) +
                          "\n                    "
                      ),
                    ]
                  ),
                ]
              )
            : _vm._e(),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("table", { staticClass: "table" }, [
              _c("tbody", [
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Status")))]),
                  _vm._v(" "),
                  _c("td", { key: _vm.ico.status }, [
                    _vm.ico.status == 0
                      ? _c("span", { staticClass: "text-warning" }, [
                          _vm._v(_vm._s(_vm.$t("Upcoming"))),
                        ])
                      : _vm.ico.status == 1
                      ? _c("span", { staticClass: "text-success" }, [
                          _vm._v(_vm._s(_vm.$t("In Progress"))),
                        ])
                      : _vm.ico.status == 2
                      ? _c("span", { staticClass: "text-danger" }, [
                          _vm._v(_vm._s(_vm.$t("Sale Ended"))),
                        ])
                      : _vm.ico.status == 3
                      ? _c("span", { staticClass: "text-secondary" }, [
                          _vm._v(_vm._s(_vm.$t("Canceled"))),
                        ])
                      : _vm._e(),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Current Rate")))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                    1 " +
                        _vm._s(_vm.ico.network_symbol) +
                        " =\n                                    " +
                        _vm._s(_vm._f("toMoney")(_vm.ico.rate, 2)) +
                        "\n                                    " +
                        _vm._s(_vm.ico.symbol) +
                        "\n                                "
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$t("Total Contributors")))]),
                  _vm._v(" "),
                  _c("td", { key: _vm.ico.contributors }, [
                    _vm._v(
                      "\n                                    " +
                        _vm._s(_vm.ico.contributors) +
                        "\n                                "
                    ),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vuejs-countdown/dist/vuejs-countdown.js":
/*!**************************************************************!*\
  !*** ./node_modules/vuejs-countdown/dist/vuejs-countdown.js ***!
  \**************************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=null;e.default={name:"vuejsCountDown",props:{deadline:{type:String},end:{type:String},stop:{type:Boolean}},data:function(){return{now:Math.trunc((new Date).getTime()/1e3),date:null,diff:0}},created:function(){var t=this;if(!this.deadline&&!this.end)throw new Error("Missing props 'deadline' or 'end'");var e=this.deadline?this.deadline:this.end;if(this.date=Math.trunc(Date.parse(e.replace(/-/g,"/"))/1e3),!this.date)throw new Error("Invalid props value, correct the 'deadline' or 'end'");r=setInterval(function(){t.now=Math.trunc((new Date).getTime()/1e3)},1e3)},computed:{seconds:function(){return Math.trunc(this.diff)%60},minutes:function(){return Math.trunc(this.diff/60)%60},hours:function(){return Math.trunc(this.diff/60/60)%24},days:function(){return Math.trunc(this.diff/60/60/24)}},watch:{now:function(t){this.diff=this.date-this.now,(this.diff<=0||this.stop)&&(this.diff=0,clearInterval(r))}},filters:{twoDigits:function(t){return t.toString().length<=1?"0"+t.toString():t.toString()}},destroyed:function(){clearInterval(r)}}},function(t,e,n){"use strict";function r(t){n(2)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);var a=n(8),u=n(7),c=r,d=u(i.a,a.a,!1,c,null,null);e.default=d.exports},function(t,e,n){var r=n(3);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(5)("630d476e",r,!0,{})},function(t,e,n){e=t.exports=n(4)(!1),e.push([t.i,'.vuejs-countdown{padding:0;margin:0}.vuejs-countdown li{display:inline-block;margin:0 8px;text-align:center;position:relative}.vuejs-countdown li p{margin:0}.vuejs-countdown li:after{content:":";position:absolute;top:0;right:-13px;font-size:32px}.vuejs-countdown li:first-of-type{margin-left:0}.vuejs-countdown li:last-of-type{margin-right:0}.vuejs-countdown li:last-of-type:after{content:""}.vuejs-countdown .digit{font-size:32px;font-weight:600;line-height:1.4;margin-bottom:0}.vuejs-countdown .text{text-transform:uppercase;margin-bottom:0;font-size:10px}',""])},function(t,e){function n(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=r(o);return[n].concat(o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=d[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(i(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],o=0;o<n.parts.length;o++)s.push(i(n.parts[o]));d[n.id]={id:n.id,refs:1,parts:s}}}}function o(){var t=document.createElement("style");return t.type="text/css",f.appendChild(t),t}function i(t){var e,n,r=document.querySelector("style["+m+'~="'+t.id+'"]');if(r){if(v)return h;r.parentNode.removeChild(r)}if(_){var i=p++;r=l||(l=o()),e=s.bind(null,r,i,!1),n=s.bind(null,r,i,!0)}else r=o(),e=a.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function s(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function a(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),g.ssrId&&t.setAttribute(m,e.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(6),d={},f=u&&(document.head||document.getElementsByTagName("head")[0]),l=null,p=0,v=!1,h=function(){},g=null,m="data-vue-ssr-id",_="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,o){v=n,g=o||{};var i=c(t,e);return r(i),function(e){for(var n=[],o=0;o<i.length;o++){var s=i[o],a=d[s.id];a.refs--,n.push(a)}e?(i=c(t,e),r(i)):i=[];for(var o=0;o<n.length;o++){var a=n[o];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete d[a.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],s=i[0],a=i[1],u=i[2],c=i[3],d={id:t+":"+o,css:a,media:u,sourceMap:c};r[s]?r[s].parts.push(d):n.push(r[s]={id:s,parts:[d]})}return n}},function(t,e){t.exports=function(t,e,n,r,o,i){var s,a=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(s=t,a=t.default);var c="function"==typeof a?a.options:a;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var d;if(i?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},c._ssrRegister=d):r&&(d=r),d){var f=c.functional,l=f?c.render:c.beforeCreate;f?(c._injectStyles=d,c.render=function(t,e){return d.call(e),l(t,e)}):c.beforeCreate=l?[].concat(l,d):[d]}return{esModule:s,exports:a,options:c}}},function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"vuejs-countdown"},[t.days>0?n("li",[n("p",{staticClass:"digit"},[t._v(t._s(t._f("twoDigits")(t.days)))]),t._v(" "),n("p",{staticClass:"text"},[t._v(t._s(t.days>1?"days":"day"))])]):t._e(),t._v(" "),n("li",[n("p",{staticClass:"digit"},[t._v(t._s(t._f("twoDigits")(t.hours)))]),t._v(" "),n("p",{staticClass:"text"},[t._v(t._s(t.hours>1?"hours":"hour"))])]),t._v(" "),n("li",[n("p",{staticClass:"digit"},[t._v(t._s(t._f("twoDigits")(t.minutes)))]),t._v(" "),n("p",{staticClass:"text"},[t._v("min")])]),t._v(" "),n("li",[n("p",{staticClass:"digit"},[t._v(t._s(t._f("twoDigits")(t.seconds)))]),t._v(" "),n("p",{staticClass:"text"},[t._v("Sec")])])])},o=[],i={render:r,staticRenderFns:o};e.a=i}])});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX2ljb19JQ09EZXRhaWxzX3Z1ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ2R3QztBQUV4QyxpRUFBZTtFQUNmQSxlQURBO0VBRUE7RUFDQUM7SUFDQUMsV0FBQUEsd0RBQUFBO0VBREEsQ0FIQTtFQU9BO0VBQ0FDLElBUkEsa0JBUUE7SUFDQTtNQUNBQyxPQURBO01BRUFDLFNBRkE7TUFHQUMsY0FIQTtNQUlBQyxtQkFKQTtNQUtBQyxhQUxBO01BTUFDLE9BTkE7TUFPQUM7SUFQQTtFQVNBLENBbEJBO0VBb0JBO0VBQ0FDO0lBQ0FDLE1BREEsb0JBQ0E7TUFDQUMsNEJBQ0EsbUJBREEsR0FFQSxzQkFGQTtJQUdBLENBTEE7SUFNQUMsU0FOQSx1QkFNQTtNQUFBOztNQUNBLFdBQ0FDLElBREEsQ0FFQSxxQkFDQUYsK0JBQ0FBLHlDQURBLENBSEEsRUFPQUcsSUFQQSxDQU9B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dUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDZCQUE2QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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cUNBQXFDLGVBQWUsRUFBRSxVQUFVLGVBQWUsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLGlCQUFpQixhQUFhLGlCQUFpQiw4Q0FBOEMsZUFBZSw4QkFBOEIsMEJBQTBCLG9CQUFvQiwyREFBMkQsbUJBQW1CLHdFQUF3RSxvQkFBb0IsNERBQTRELG1CQUFtQixvRUFBb0Usb0JBQW9CLDhEQUE4RCxtQkFBbUIsMkNBQTJDLG9CQUFvQiw4REFBOEQsbUJBQW1CLG9CQUFvQixTQUFTLDRCQUE0QixNQUFNLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL3NyYy9QYWdlcy9pY28vSUNPRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9pY28vSUNPRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9pY28vSUNPRGV0YWlscy52dWU/NWE0MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2ljby9JQ09EZXRhaWxzLnZ1ZT8xOWRmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMvaWNvL0lDT0RldGFpbHMudnVlPzE5NTIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWpzLWNvdW50ZG93bi9kaXN0L3Z1ZWpzLWNvdW50ZG93bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy04IGNvbC1tZC02IGNvbC1zbS0xMiBjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBhbGlnbi1pdGVtcy1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImljby5pY29uICE9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXZhdGFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCI0OHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjQ4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzcmM9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvLmljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJy9hc3NldHMvaW1hZ2VzL2ljby8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvLmljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJy9tYXJrZXQvbm90aWZpY2F0aW9uLnBuZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJmaWx0ZXI6IGdyYXlzY2FsZSgwKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHZ1ZS1za2VsZXRvbi1sb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2lyY2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6d2lkdGg9XCI0OFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjQ4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb249XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1zLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgdi1pZj1cImljby5uYW1lICE9IG51bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaWNvLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtc2tlbGV0b24tbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjMwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbj1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDprZXk9XCJpY28uc3RhdHVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJpY28uc3RhdHVzID09IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYmFkZ2UgYmctd2FybmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiVXBjb21pbmdcIikgfX08L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1lbHNlLWlmPVwiaWNvLnN0YXR1cyA9PSAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJhZGdlIGJnLXN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIlNhbGUgTGl2ZVwiKSB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJpY28uc3RhdHVzID09IDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYmFkZ2UgYmctZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgJHQoXCJTYWxlIEVuZGVkXCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImljby5zdGF0dXMgPT0gM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJiYWRnZSBiZy1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIkNhbmNlbGVkXCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWVsc2UgY2xhc3M9XCJiYWRnZSBiZy1zZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXNrZWxldG9uLWxvYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjYwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uPVwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaWNvLmRlc2MgIT0gbnVsbFwiIGNsYXNzPVwibXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uZGVzYyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1lbHNlIGNsYXNzPVwibXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXNrZWxldG9uLWxvYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aGVpZ2h0PVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uPVwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtc2tlbGV0b24tbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOndpZHRoPVwiNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpoZWlnaHQ9XCIxMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb249XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHZ1ZS1za2VsZXRvbi1sb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6d2lkdGg9XCI1MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbj1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXNrZWxldG9uLWxvYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aGVpZ2h0PVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uPVwiZmFkZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJHQoXCJQcmVzYWxlIEFkZHJlc3NcIikgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpocmVmPVwiaWNvLnByZXNhbGVfYWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXIgbm9mb2xsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgaWNvLmFkZHJlc3MgfX08L2FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJHQoXCJUb2tlbiBOYW1lXCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyBpY28ubmFtZSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlRva2VuIFN5bWJvbFwiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgaWNvLnN5bWJvbCB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlRva2VuIERlY2ltYWxzXCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyBpY28uZGVjaW1hbHMgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJHQoXCJUb2tlbiBBZGRyZXNzXCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1yLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aHJlZj1cImljby5hZGRyZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlciBub2ZvbGxvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyBpY28uYWRkcmVzcyB9fTwvYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImhlbHAgaXMtaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoe3sgJHQoXCJEbyBub3Qgc2VuZFwiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28ubmV0d29ya19zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJ0byB0aGUgdG9rZW4gYWRkcmVzc1wiKSB9fSEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICR0KFwiVG90YWwgU3VwcGx5XCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28udG90YWxfc3VwcGx5IHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlRva2VucyBGb3IgUHJlc2FsZVwiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaWNvLnByZXNhbGVfc3VwcGx5IHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlRva2VucyBGb3IgTGlxdWlkaXR5XCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28ubGlxdWlkaXR5X3N1cHBseSB8IHRvTW9uZXkoMikgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uc3ltYm9sIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJJbml0aWFsIE1hcmtldCBDYXAgKGVzdGltYXRlKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7eyBpY28uaW5pdGlhbF9jYXAgfCB0b01vbmV5KDIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICR0KFwiU29mdCBDYXBcIikgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5zb2Z0X2NhcCB8IHRvTW9uZXkoMikgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28ubmV0d29ya19zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIk1heCBPd25lciBSZWNlaXZlXCIpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28ub3duZXJfbWF4IHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5uZXR3b3JrX3N5bWJvbCB9fTxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJoYXMtdGV4dC1pbmZvIGlzLXNpemUtN1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpY28ub3duZXJfcmVjaWV2ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHt7ICR0KFwiQ3VycmVudFwiKSB9fTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljby5vd25lcl9yZWNpZXZlZCB8IHRvTW9uZXkoNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaWNvLm5ldHdvcmtfc3ltYm9sIH19KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkFtb3VudCBUaWxsIFJlYmFsYW5jZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGljbyB9fSB7eyBpY28ubmV0d29ya19zeW1ib2wgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4gLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlByZXNhbGUgU3RhcnQgVGltZVwiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvLnNvZnRfc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW9tZW50KFwiZGRkZCwgTU1NTSBEbyBZWVlZXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVVRDKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICR0KFwiUHJlc2FsZSBFbmQgVGltZVwiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvLnNvZnRfZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vbWVudChcImRkZGQsIE1NTU0gRG8gWVlZWVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFVUQylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5MaXN0aW5nIE9uPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGEgY2xhc3M9XCJtci0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3BhbmNha2Vzd2FwLmZpbmFuY2Uvc3dhcD9vdXRwdXRDdXJyZW5jeT0weDg2ODE0OWM3RWFDRDdFQjBhQjcxQTQzZjdiOUZmMjVlQzFEQzgwMjNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlciBub2ZvbGxvd1wiPlBhbmNha2Vzd2FwPC9hPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICR0KFwiTGlxdWlkaXR5IFBlcmNlbnRcIikgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGljby5saXF1aWRpdHlfcGVyY2VudCB9fSU8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJHQoXCJMaXF1aWRpdHkgTG9ja3VwIFRpbWVcIikgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5sb2NrdXAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcImRheXMgYWZ0ZXIgcG9vbCBlbmRzXCIpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy00IGNvbC1tZC02IGNvbC1zbS0xMiBjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJpY28uc3RhZ2UgIT0gbnVsbFwiIGNsYXNzPVwidGV4dC1jZW50ZXIgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb3VudGRvd25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImljby5zdGFnZSA9PSAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRlYWRsaW5lPVwiaWNvLnNvZnRfc3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L0NvdW50ZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q291bnRkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImljby5zdGFnZSA9PSAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRlYWRsaW5lPVwiaWNvLnNvZnRfZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9Db3VudGRvd24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvdW50ZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJpY28uc3RhZ2UgPT0gMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkZWFkbGluZT1cImljby5oYXJkX2VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvQ291bnRkb3duPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXNrZWxldG9uLWxvYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jZW50ZXIgbXQtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjI0MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjU1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb249XCJmYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItMVwiIDprZXk9XCJpY28uc29mdF9yYWlzZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtZGFya1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIlByb2dyZXNzXCIpIH19ICg8c3BhbiBjbGFzcz1cInRleHQtc3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGljby5zb2Z0X3JhaXNlZCAvIGljby5zb2Z0X2NhcCkgKiAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdG9Nb25leSgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0lPC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibXlSYW5nZUNvbG9yXCIgY2xhc3M9XCJwcm9ncmVzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwibXlSYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQgcHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwicHJvZ3Jlc3NiYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtdmFsdWVub3c9XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtdmFsdWVtYXg9XCIxMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdHlsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGg6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpY28uc29mdF9yYWlzZWQgLyBpY28uc29mdF9jYXApICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICclJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gOmtleT1cImljby5zb2Z0X3JhaXNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgaWNvLnNvZnRfcmFpc2VkIHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaWNvLnN5bWJvbCB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgaWNvLnNvZnRfY2FwIHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaWNvLnN5bWJvbCB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGV4dC1zdGFydFwiIGZvcj1cImFtb3VudFwiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJSZWNpZXZpbmcgV2FsbGV0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItMSB3LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyZWNfd2FsbGV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBZGQgeW91ciByZWNpZXZpbmcgd2FsbGV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInJlY193YWxsZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImNoYW5nZV9yZWNfd2FsbGV0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiU2F2ZVwiKSB9fTwvYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGV4dC1zdGFydFwiIGZvcj1cImFtb3VudFwiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJBbW91bnRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYi0xIHctYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImFtb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYW1vdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGtleXVwPVwiY29zdENhbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IHRleHQtZGFya1wiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY28uc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5NaW46PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uY2xpZW50X21pbiA/IGljby5jbGllbnRfbWluIDogMSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uc3ltYm9sIH19IC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5NYXg6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uY2xpZW50X21heCB9fSB7eyBpY28uc3ltYm9sIH19PC9zbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGV4dC1zdGFydFwiIGZvcj1cImNvc3RcIj57e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFwiQ29zdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTEgdy1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiY29zdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgdGV4dC1kYXJrXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvLm5ldHdvcmtfc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRleHQtc3RhcnRcIiBmb3I9XCJiYWxhbmNlXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcIkJhbGFuY2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOmtleT1cImJhbGFuY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJiYWxhbmNlICE9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInctMTAwIG1iLTEgYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgYmFsYW5jZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB3YWxsZXRfc3ltYm9sIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ3LTEwMCBtYi0xIGJ0biBidG4tb3V0bGluZS13YXJuaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiY3JlYXRlV2FsbGV0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiQ3JlYXRlXCIpIH19IHt7IGljby5uZXR3b3JrX3N5bWJvbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIldhbGxldFwiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtZm9vdGVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiaWNvLnN0YXR1cyA9PSAxXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJwdXJjaGFzZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIkJ1eVwiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXdhcm5pbmdcIj5NZXRhbWFzazwvYnV0dG9uPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlN0YXR1c1wiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgOmtleT1cImljby5zdGF0dXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiaWNvLnN0YXR1cyA9PSAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgJHQoXCJVcGNvbWluZ1wiKSB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJpY28uc3RhdHVzID09IDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtc3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIkluIFByb2dyZXNzXCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImljby5zdGF0dXMgPT0gMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgJHQoXCJTYWxlIEVuZGVkXCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImljby5zdGF0dXMgPT0gM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgJHQoXCJDYW5jZWxlZFwiKSB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIkN1cnJlbnQgUmF0ZVwiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSB7eyBpY28ubmV0d29ya19zeW1ib2wgfX0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5yYXRlIHwgdG9Nb25leSgyKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGljby5zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkdChcIlRvdGFsIENvbnRyaWJ1dG9yc1wiKSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgOmtleT1cImljby5jb250cmlidXRvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBpY28uY29udHJpYnV0b3JzIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQ291bnRkb3duIGZyb20gXCJ2dWVqcy1jb3VudGRvd25cIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbXCJ1c2VyXCJdLFxuICAgIC8vIGNvbXBvbmVudCBsaXN0XG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBDb3VudGRvd24sXG4gICAgfSxcblxuICAgIC8vIGNvbXBvbmVudCBkYXRhXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGljbzogW10sXG4gICAgICAgICAgICBhbW91bnQ6IDAsXG4gICAgICAgICAgICByZWNfd2FsbGV0OiBcIlwiLFxuICAgICAgICAgICAgd2FsbGV0X3N5bWJvbDogbnVsbCxcbiAgICAgICAgICAgIGJhbGFuY2U6IG51bGwsXG4gICAgICAgICAgICBjb3N0OiAwLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8vIGN1c3RvbSBtZXRob2RzXG4gICAgbWV0aG9kczoge1xuICAgICAgICBnb0JhY2soKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLiRyb3V0ZXIuZ28oLTEpXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRyb3V0ZXIucHVzaChcIi9cIik7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoRGF0YSgpIHtcbiAgICAgICAgICAgIHRoaXMuJGh0dHBcbiAgICAgICAgICAgICAgICAucG9zdChcbiAgICAgICAgICAgICAgICAgICAgXCIvdXNlci9mZXRjaC9pY28vXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmLmxhc3RJbmRleE9mKFwiL1wiKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmljbyA9IHJlc3BvbnNlLmRhdGEuaWNvKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnJlY193YWxsZXQgPSByZXNwb25zZS5kYXRhLnJlY193YWxsZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMud2FsbGV0X3N5bWJvbCA9IHJlc3BvbnNlLmRhdGEuaWNvLm5ldHdvcmtfc3ltYm9sKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmJhbGFuY2UgPSByZXNwb25zZS5kYXRhLmJhbGFuY2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwdXJjaGFzZSgpIHtcbiAgICAgICAgICAgICh0aGlzLmxvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KFwiL3VzZXIvc3RvcmUvaWNvXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogdGhpcy5hbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3N0OiB0aGlzLmFtb3VudCAvIHRoaXMuaWNvLnJhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29fc3ltYm9sOiB0aGlzLmljby5zeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29faWQ6IHRoaXMuaWNvLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiB0aGlzLmljby5uZXR3b3JrX3N5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY193YWxsZXQ6IHRoaXMucmVjX3dhbGxldCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0b2FzdFtyZXNwb25zZS5kYXRhLnR5cGVdKHJlc3BvbnNlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0b2FzdC5lcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmZXRjaFdhbGxldCgpIHtcbiAgICAgICAgICAgIHRoaXMuJGh0dHBcbiAgICAgICAgICAgICAgICAucG9zdChcIi91c2VyL2ZldGNoL3dhbGxldFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogdGhpcy53YWxsZXRfc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImZ1bmRpbmdcIixcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXNwb25zZS5kYXRhLmJhbGFuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVdhbGxldCgpIHtcbiAgICAgICAgICAgICh0aGlzLmxvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KFwiL3VzZXIvd2FsbGV0L2ovY3JlYXRlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogdGhpcy53YWxsZXRfc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJmdW5kaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaFdhbGxldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdG9hc3RbcmVzcG9uc2UuZGF0YS50eXBlXShyZXNwb25zZS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0b2FzdC5lcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VfcmVjX3dhbGxldCgpIHtcbiAgICAgICAgICAgICh0aGlzLmxvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KFwiL3VzZXIvc3RvcmUvaWNvL3JlY193YWxsZXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjX3dhbGxldDogdGhpcy5yZWNfd2FsbGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya19zeW1ib2w6IHRoaXMuaWNvLm5ldHdvcmtfc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hXYWxsZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRvYXN0W3Jlc3BvbnNlLmRhdGEudHlwZV0ocmVzcG9uc2UuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdG9hc3QuZXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29zdENhbCgpIHtcbiAgICAgICAgICAgIHRoaXMuY29zdCA9IHRoaXMuYW1vdW50IC8gdGhpcy5pY28ucmF0ZTtcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IGNyZWF0ZWRcbiAgICBjcmVhdGVkKCkge1xuICAgICAgICB0aGlzLmZldGNoRGF0YSgpO1xuICAgIH0sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgbW91bnRlZFxuICAgIG1vdW50ZWQoKSB7fSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBkZXN0cm95ZWRcbiAgICBkZXN0cm95ZWQoKSB7fSxcbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSUNPRGV0YWlscy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDIxMmZiZDYmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSUNPRGV0YWlscy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0lDT0RldGFpbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNDIxMmZiZDYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDIxMmZiZDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDIxMmZiZDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0lDT0RldGFpbHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQyMTJmYmQ2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQyMTJmYmQ2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvc3JjL1BhZ2VzL2ljby9JQ09EZXRhaWxzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JQ09EZXRhaWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC01WzBdLnJ1bGVzWzBdLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0lDT0RldGFpbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0lDT0RldGFpbHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQyMTJmYmQ2JlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtbGctOCBjb2wtbWQtNiBjb2wtc20tMTIgY29sLTEyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgIFwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZC1mbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBhbGlnbi1pdGVtcy1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5pY28uaWNvbiAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhdmF0YXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBmaWx0ZXI6IFwiZ3JheXNjYWxlKDApXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjQ4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQ4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLmljby5pY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIvYXNzZXRzL2ltYWdlcy9pY28vXCIgKyBfdm0uaWNvLmljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIi9tYXJrZXQvbm90aWZpY2F0aW9uLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwidnVlLXNrZWxldG9uLWxvYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1zLTFcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uaWNvLm5hbWUgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJoMVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmljby5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJ2dWUtc2tlbGV0b24tbG9hZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsga2V5OiBfdm0uaWNvLnN0YXR1cyB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5pY28uc3RhdHVzID09IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImJhZGdlIGJnLXdhcm5pbmdcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiVXBjb21pbmdcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uaWNvLnN0YXR1cyA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJiYWRnZSBiZy1zdWNjZXNzXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlNhbGUgTGl2ZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5pY28uc3RhdHVzID09IDJcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImJhZGdlIGJnLWRhbmdlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJTYWxlIEVuZGVkXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmljby5zdGF0dXMgPT0gM1xuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmFkZ2UgYmctc2Vjb25kYXJ5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS4kdChcIkNhbmNlbGVkXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJhZGdlIGJnLXNlY29uZGFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5pY28uZGVzYyAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm15LTFcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmljby5kZXNjKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibXktMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogXCJmYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtc2tlbGV0b24tbG9hZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IFwiZmFkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXNrZWxldG9uLWxvYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogXCJmYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJ0YWJsZVwiLCB7IHN0YXRpY0NsYXNzOiBcInRhYmxlXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcInRib2R5XCIsIFtcbiAgICAgICAgICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiUHJlc2FsZSBBZGRyZXNzXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogX3ZtLmljby5wcmVzYWxlX2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXIgbm9mb2xsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvLmFkZHJlc3MpKV1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlRva2VuIE5hbWVcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLmljby5uYW1lKSldKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUb2tlbiBTeW1ib2xcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLmljby5zeW1ib2wpKV0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlRva2VuIERlY2ltYWxzXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5pY28uZGVjaW1hbHMpKV0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlRva2VuIEFkZHJlc3NcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtci0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBfdm0uaWNvLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXIgbm9mb2xsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvLmFkZHJlc3MpKV1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJiclwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVscCBpcy1pbmZvXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJEbyBub3Qgc2VuZFwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLm5ldHdvcmtfc3ltYm9sKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcInRvIHRoZSB0b2tlbiBhZGRyZXNzXCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiISlcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiVG90YWwgU3VwcGx5XCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcInRvTW9uZXlcIikoX3ZtLmljby50b3RhbF9zdXBwbHksIDIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLnN5bWJvbCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUb2tlbnMgRm9yIFByZXNhbGVcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9Nb25leVwiKShfdm0uaWNvLnByZXNhbGVfc3VwcGx5LCAyKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmljby5zeW1ib2wpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiVG9rZW5zIEZvciBMaXF1aWRpdHlcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9Nb25leVwiKShfdm0uaWNvLmxpcXVpZGl0eV9zdXBwbHksIDIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLnN5bWJvbCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJJbml0aWFsIE1hcmtldCBDYXAgKGVzdGltYXRlKVwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiJFwiICsgX3ZtLl9zKF92bS5fZihcInRvTW9uZXlcIikoX3ZtLmljby5pbml0aWFsX2NhcCwgMikpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJTb2Z0IENhcFwiKSkpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJ0b01vbmV5XCIpKF92bS5pY28uc29mdF9jYXAsIDIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLm5ldHdvcmtfc3ltYm9sKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIk1heCBPd25lciBSZWNlaXZlXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcInRvTW9uZXlcIikoX3ZtLmljby5vd25lcl9tYXgsIDIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLm5ldHdvcmtfc3ltYm9sKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogX3ZtLmljby5vd25lcl9yZWNpZXZlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhhcy10ZXh0LWluZm8gaXMtc2l6ZS03XCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIkN1cnJlbnRcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcInRvTW9uZXlcIikoX3ZtLmljby5vd25lcl9yZWNpZXZlZCwgNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28ubmV0d29ya19zeW1ib2wpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIilcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJQcmVzYWxlIFN0YXJ0IFRpbWVcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcIm1vbWVudFwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uaWNvLnNvZnRfc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZGRkLCBNTU1NIERvIFlZWVlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFVUQylcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJQcmVzYWxlIEVuZCBUaW1lXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJtb21lbnRcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmljby5zb2Z0X2VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRkZGQsIE1NTU0gRG8gWVlZWVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVVRDKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIkxpcXVpZGl0eSBQZXJjZW50XCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5pY28ubGlxdWlkaXR5X3BlcmNlbnQpICsgXCIlXCIpXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiTGlxdWlkaXR5IExvY2t1cCBUaW1lXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28ubG9ja3VwKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJkYXlzIGFmdGVyIHBvb2wgZW5kc1wiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgXSksXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1sZy00IGNvbC1tZC02IGNvbC1zbS0xMiBjb2wtMTJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZFwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5pY28uc3RhZ2UgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgbXQtMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uaWNvLnN0YWdlID09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJDb3VudGRvd25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRlYWRsaW5lOiBfdm0uaWNvLnNvZnRfc3RhcnQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmljby5zdGFnZSA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiQ291bnRkb3duXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkZWFkbGluZTogX3ZtLmljby5zb2Z0X2VuZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uaWNvLnN0YWdlID09IDJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJDb3VudGRvd25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRlYWRsaW5lOiBfdm0uaWNvLmhhcmRfZW5kIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciBtdC0xXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI0MCxcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU1LFxuICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogXCJmYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBrZXk6IF92bS5pY28uc29mdF9yYWlzZWQsIHN0YXRpY0NsYXNzOiBcIm1iLTFcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1kYXJrXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIlByb2dyZXNzXCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgKFwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1zdWNjZXNzXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwidG9Nb25leVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF92bS5pY28uc29mdF9yYWlzZWQgLyBfdm0uaWNvLnNvZnRfY2FwKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICkgKyBcIiVcIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIpXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIpLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwibWItMVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInByb2dyZXNzXCIsIGF0dHJzOiB7IGlkOiBcIm15UmFuZ2VDb2xvclwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3RyaXBlZCBwcm9ncmVzcy1iYXItYW5pbWF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoOlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF92bS5pY28uc29mdF9yYWlzZWQgLyBfdm0uaWNvLnNvZnRfY2FwKSAqIDEwMCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXlSYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS12YWx1ZW5vd1wiOiBcIjUwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS12YWx1ZW1pblwiOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbWF4XCI6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJzbWFsbFwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IGtleTogX3ZtLmljby5zb2Z0X3JhaXNlZCB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9Nb25leVwiKShfdm0uaWNvLnNvZnRfcmFpc2VkLCAyKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLnN5bWJvbClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9Nb25leVwiKShfdm0uaWNvLnNvZnRfY2FwLCAyKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLnN5bWJvbClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1zdGFydFwiLCBhdHRyczogeyBmb3I6IFwiYW1vdW50XCIgfSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlJlY2lldmluZyBXYWxsZXRcIikpKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cCBtYi0xIHctYXV0b1wiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlY193YWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWNfd2FsbGV0XCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZWNfd2FsbGV0XCIsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFkZCB5b3VyIHJlY2lldmluZyB3YWxsZXRcIixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnJlY193YWxsZXQgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnJlY193YWxsZXQgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAtdGV4dCBidG4gYnRuLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGlzYWJsZWQ6IF92bS5sb2FkaW5nIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2hhbmdlX3JlY193YWxsZXQoKVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiU2F2ZVwiKSkpXVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXN0YXJ0XCIsIGF0dHJzOiB7IGZvcjogXCJhbW91bnRcIiB9IH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiQW1vdW50XCIpKSldXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibWItMSB3LWF1dG9cIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwibnVtYmVyXCIsIG5hbWU6IFwiYW1vdW50XCIsIG1pbjogXCIwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5hbW91bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBrZXl1cDogZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jb3N0Q2FsKClcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uYW1vdW50ID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC10ZXh0IHRleHQtZGFya1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uaWNvLnN5bWJvbCkpLFxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInNtYWxsXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtd2FybmluZ1wiIH0sIFtfdm0uX3YoXCJNaW46XCIpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmljby5jbGllbnRfbWluID8gX3ZtLmljby5jbGllbnRfbWluIDogMSkgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmljby5zeW1ib2wpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiAvXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC13YXJuaW5nXCIgfSwgW192bS5fdihcIk1heDpcIildKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLmNsaWVudF9tYXgpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28uc3ltYm9sKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQtc3RhcnRcIiwgYXR0cnM6IHsgZm9yOiBcImNvc3RcIiB9IH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiQ29zdFwiKSkpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwIG1iLTEgdy1hdXRvXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY29zdCxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCByZWFkb25seTogXCJcIiwgZGlzYWJsZWQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uY29zdCB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY29zdCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC10ZXh0IHRleHQtZGFya1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmljby5uZXR3b3JrX3N5bWJvbCkpLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1zdGFydFwiLCBhdHRyczogeyBmb3I6IFwiYmFsYW5jZVwiIH0gfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJCYWxhbmNlXCIpKSldXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsga2V5OiBfdm0uYmFsYW5jZSB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLmJhbGFuY2UgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInctMTAwIG1iLTEgYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmJhbGFuY2UpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS53YWxsZXRfc3ltYm9sKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3LTEwMCBtYi0xIGJ0biBidG4tb3V0bGluZS13YXJuaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmxvYWRpbmcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jcmVhdGVXYWxsZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJDcmVhdGVcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28ubmV0d29ya19zeW1ib2wpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIldhbGxldFwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5pY28uc3RhdHVzID09IDFcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmxvYWRpbmcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5wdXJjaGFzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIkJ1eVwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZFwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwidGFibGVcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWJsZVwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJ0Ym9keVwiLCBbXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIlN0YXR1c1wiKSkpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCB7IGtleTogX3ZtLmljby5zdGF0dXMgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uaWNvLnN0YXR1cyA9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXdhcm5pbmdcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiVXBjb21pbmdcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uaWNvLnN0YXR1cyA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXN1Y2Nlc3NcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiSW4gUHJvZ3Jlc3NcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uaWNvLnN0YXR1cyA9PSAyXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWRhbmdlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJTYWxlIEVuZGVkXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmljby5zdGF0dXMgPT0gM1xuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1zZWNvbmRhcnlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiQ2FuY2VsZWRcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIkN1cnJlbnQgUmF0ZVwiKSkpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28ubmV0d29ya19zeW1ib2wpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiID1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9Nb25leVwiKShfdm0uaWNvLnJhdGUsIDIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWNvLnN5bWJvbCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUb3RhbCBDb250cmlidXRvcnNcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBrZXk6IF92bS5pY28uY29udHJpYnV0b3JzIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pY28uY29udHJpYnV0b3JzKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgIF0pLFxuICAgICAgICBdKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwidnVlanMtY291bnRkb3duXCIsW10sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0c1tcInZ1ZWpzLWNvdW50ZG93blwiXT1lKCk6dFtcInZ1ZWpzLWNvdW50ZG93blwiXT1lKCl9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxlKSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLmQ9ZnVuY3Rpb24odCxuLHIpe2Uubyh0LG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxlLm49ZnVuY3Rpb24odCl7dmFyIG49dCYmdC5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIHQuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gdH07cmV0dXJuIGUuZChuLFwiYVwiLG4pLG59LGUubz1mdW5jdGlvbih0LGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKX0sZS5wPVwiXCIsZShlLnM9MSl9KFtmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bnVsbDtlLmRlZmF1bHQ9e25hbWU6XCJ2dWVqc0NvdW50RG93blwiLHByb3BzOntkZWFkbGluZTp7dHlwZTpTdHJpbmd9LGVuZDp7dHlwZTpTdHJpbmd9LHN0b3A6e3R5cGU6Qm9vbGVhbn19LGRhdGE6ZnVuY3Rpb24oKXtyZXR1cm57bm93Ok1hdGgudHJ1bmMoKG5ldyBEYXRlKS5nZXRUaW1lKCkvMWUzKSxkYXRlOm51bGwsZGlmZjowfX0sY3JlYXRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7aWYoIXRoaXMuZGVhZGxpbmUmJiF0aGlzLmVuZCl0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHByb3BzICdkZWFkbGluZScgb3IgJ2VuZCdcIik7dmFyIGU9dGhpcy5kZWFkbGluZT90aGlzLmRlYWRsaW5lOnRoaXMuZW5kO2lmKHRoaXMuZGF0ZT1NYXRoLnRydW5jKERhdGUucGFyc2UoZS5yZXBsYWNlKC8tL2csXCIvXCIpKS8xZTMpLCF0aGlzLmRhdGUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wcyB2YWx1ZSwgY29ycmVjdCB0aGUgJ2RlYWRsaW5lJyBvciAnZW5kJ1wiKTtyPXNldEludGVydmFsKGZ1bmN0aW9uKCl7dC5ub3c9TWF0aC50cnVuYygobmV3IERhdGUpLmdldFRpbWUoKS8xZTMpfSwxZTMpfSxjb21wdXRlZDp7c2Vjb25kczpmdW5jdGlvbigpe3JldHVybiBNYXRoLnRydW5jKHRoaXMuZGlmZiklNjB9LG1pbnV0ZXM6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC50cnVuYyh0aGlzLmRpZmYvNjApJTYwfSxob3VyczpmdW5jdGlvbigpe3JldHVybiBNYXRoLnRydW5jKHRoaXMuZGlmZi82MC82MCklMjR9LGRheXM6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC50cnVuYyh0aGlzLmRpZmYvNjAvNjAvMjQpfX0sd2F0Y2g6e25vdzpmdW5jdGlvbih0KXt0aGlzLmRpZmY9dGhpcy5kYXRlLXRoaXMubm93LCh0aGlzLmRpZmY8PTB8fHRoaXMuc3RvcCkmJih0aGlzLmRpZmY9MCxjbGVhckludGVydmFsKHIpKX19LGZpbHRlcnM6e3R3b0RpZ2l0czpmdW5jdGlvbih0KXtyZXR1cm4gdC50b1N0cmluZygpLmxlbmd0aDw9MT9cIjBcIit0LnRvU3RyaW5nKCk6dC50b1N0cmluZygpfX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbChyKX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtuKDIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMCksaT1uLm4obyk7Zm9yKHZhciBzIGluIG8pXCJkZWZhdWx0XCIhPT1zJiZmdW5jdGlvbih0KXtuLmQoZSx0LGZ1bmN0aW9uKCl7cmV0dXJuIG9bdF19KX0ocyk7dmFyIGE9big4KSx1PW4oNyksYz1yLGQ9dShpLmEsYS5hLCExLGMsbnVsbCxudWxsKTtlLmRlZmF1bHQ9ZC5leHBvcnRzfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKTtcInN0cmluZ1wiPT10eXBlb2YgciYmKHI9W1t0LmkscixcIlwiXV0pLHIubG9jYWxzJiYodC5leHBvcnRzPXIubG9jYWxzKTtuKDUpKFwiNjMwZDQ3NmVcIixyLCEwLHt9KX0sZnVuY3Rpb24odCxlLG4pe2U9dC5leHBvcnRzPW4oNCkoITEpLGUucHVzaChbdC5pLCcudnVlanMtY291bnRkb3due3BhZGRpbmc6MDttYXJnaW46MH0udnVlanMtY291bnRkb3duIGxpe2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjowIDhweDt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX0udnVlanMtY291bnRkb3duIGxpIHB7bWFyZ2luOjB9LnZ1ZWpzLWNvdW50ZG93biBsaTphZnRlcntjb250ZW50OlwiOlwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0Oi0xM3B4O2ZvbnQtc2l6ZTozMnB4fS52dWVqcy1jb3VudGRvd24gbGk6Zmlyc3Qtb2YtdHlwZXttYXJnaW4tbGVmdDowfS52dWVqcy1jb3VudGRvd24gbGk6bGFzdC1vZi10eXBle21hcmdpbi1yaWdodDowfS52dWVqcy1jb3VudGRvd24gbGk6bGFzdC1vZi10eXBlOmFmdGVye2NvbnRlbnQ6XCJcIn0udnVlanMtY291bnRkb3duIC5kaWdpdHtmb250LXNpemU6MzJweDtmb250LXdlaWdodDo2MDA7bGluZS1oZWlnaHQ6MS40O21hcmdpbi1ib3R0b206MH0udnVlanMtY291bnRkb3duIC50ZXh0e3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjEwcHh9JyxcIlwiXSl9LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbih0LGUpe3ZhciBuPXRbMV18fFwiXCIsbz10WzNdO2lmKCFvKXJldHVybiBuO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGJ0b2Epe3ZhciBpPXIobyk7cmV0dXJuW25dLmNvbmNhdChvLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHQpe3JldHVyblwiLyojIHNvdXJjZVVSTD1cIitvLnNvdXJjZVJvb3QrdCtcIiAqL1wifSkpLmNvbmNhdChbaV0pLmpvaW4oXCJcXG5cIil9cmV0dXJuW25dLmpvaW4oXCJcXG5cIil9ZnVuY3Rpb24gcih0KXtyZXR1cm5cIi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIitidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0KSkpKStcIiAqL1wifXQuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1bXTtyZXR1cm4gZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbihlKXt2YXIgcj1uKGUsdCk7cmV0dXJuIGVbMl0/XCJAbWVkaWEgXCIrZVsyXStcIntcIityK1wifVwiOnJ9KS5qb2luKFwiXCIpfSxlLmk9ZnVuY3Rpb24odCxuKXtcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9W1tudWxsLHQsXCJcIl1dKTtmb3IodmFyIHI9e30sbz0wO288dGhpcy5sZW5ndGg7bysrKXt2YXIgaT10aGlzW29dWzBdO1wibnVtYmVyXCI9PXR5cGVvZiBpJiYocltpXT0hMCl9Zm9yKG89MDtvPHQubGVuZ3RoO28rKyl7dmFyIHM9dFtvXTtcIm51bWJlclwiPT10eXBlb2Ygc1swXSYmcltzWzBdXXx8KG4mJiFzWzJdP3NbMl09bjpuJiYoc1syXT1cIihcIitzWzJdK1wiKSBhbmQgKFwiK24rXCIpXCIpLGUucHVzaChzKSl9fSxlfX0sZnVuY3Rpb24odCxlLG4pe2Z1bmN0aW9uIHIodCl7Zm9yKHZhciBlPTA7ZTx0Lmxlbmd0aDtlKyspe3ZhciBuPXRbZV0scj1kW24uaWRdO2lmKHIpe3IucmVmcysrO2Zvcih2YXIgbz0wO288ci5wYXJ0cy5sZW5ndGg7bysrKXIucGFydHNbb10obi5wYXJ0c1tvXSk7Zm9yKDtvPG4ucGFydHMubGVuZ3RoO28rKylyLnBhcnRzLnB1c2goaShuLnBhcnRzW29dKSk7ci5wYXJ0cy5sZW5ndGg+bi5wYXJ0cy5sZW5ndGgmJihyLnBhcnRzLmxlbmd0aD1uLnBhcnRzLmxlbmd0aCl9ZWxzZXtmb3IodmFyIHM9W10sbz0wO288bi5wYXJ0cy5sZW5ndGg7bysrKXMucHVzaChpKG4ucGFydHNbb10pKTtkW24uaWRdPXtpZDpuLmlkLHJlZnM6MSxwYXJ0czpzfX19fWZ1bmN0aW9uIG8oKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7cmV0dXJuIHQudHlwZT1cInRleHQvY3NzXCIsZi5hcHBlbmRDaGlsZCh0KSx0fWZ1bmN0aW9uIGkodCl7dmFyIGUsbixyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVtcIittKyd+PVwiJyt0LmlkKydcIl0nKTtpZihyKXtpZih2KXJldHVybiBoO3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyKX1pZihfKXt2YXIgaT1wKys7cj1sfHwobD1vKCkpLGU9cy5iaW5kKG51bGwscixpLCExKSxuPXMuYmluZChudWxsLHIsaSwhMCl9ZWxzZSByPW8oKSxlPWEuYmluZChudWxsLHIpLG49ZnVuY3Rpb24oKXtyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocil9O3JldHVybiBlKHQpLGZ1bmN0aW9uKHIpe2lmKHIpe2lmKHIuY3NzPT09dC5jc3MmJnIubWVkaWE9PT10Lm1lZGlhJiZyLnNvdXJjZU1hcD09PXQuc291cmNlTWFwKXJldHVybjtlKHQ9cil9ZWxzZSBuKCl9fWZ1bmN0aW9uIHModCxlLG4scil7dmFyIG89bj9cIlwiOnIuY3NzO2lmKHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD15KGUsbyk7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvKSxzPXQuY2hpbGROb2RlcztzW2VdJiZ0LnJlbW92ZUNoaWxkKHNbZV0pLHMubGVuZ3RoP3QuaW5zZXJ0QmVmb3JlKGksc1tlXSk6dC5hcHBlbmRDaGlsZChpKX19ZnVuY3Rpb24gYSh0LGUpe3ZhciBuPWUuY3NzLHI9ZS5tZWRpYSxvPWUuc291cmNlTWFwO2lmKHImJnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIixyKSxnLnNzcklkJiZ0LnNldEF0dHJpYnV0ZShtLGUuaWQpLG8mJihuKz1cIlxcbi8qIyBzb3VyY2VVUkw9XCIrby5zb3VyY2VzWzBdK1wiICovXCIsbis9XCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiK2J0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG8pKSkpK1wiICovXCIpLHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD1uO2Vsc2V7Zm9yKDt0LmZpcnN0Q2hpbGQ7KXQucmVtb3ZlQ2hpbGQodC5maXJzdENoaWxkKTt0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG4pKX19dmFyIHU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50O2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBERUJVRyYmREVCVUcmJiF1KXRocm93IG5ldyBFcnJvcihcInZ1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIik7dmFyIGM9big2KSxkPXt9LGY9dSYmKGRvY3VtZW50LmhlYWR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSksbD1udWxsLHA9MCx2PSExLGg9ZnVuY3Rpb24oKXt9LGc9bnVsbCxtPVwiZGF0YS12dWUtc3NyLWlkXCIsXz1cInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiYvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixvKXt2PW4sZz1vfHx7fTt2YXIgaT1jKHQsZSk7cmV0dXJuIHIoaSksZnVuY3Rpb24oZSl7Zm9yKHZhciBuPVtdLG89MDtvPGkubGVuZ3RoO28rKyl7dmFyIHM9aVtvXSxhPWRbcy5pZF07YS5yZWZzLS0sbi5wdXNoKGEpfWU/KGk9Yyh0LGUpLHIoaSkpOmk9W107Zm9yKHZhciBvPTA7bzxuLmxlbmd0aDtvKyspe3ZhciBhPW5bb107aWYoMD09PWEucmVmcyl7Zm9yKHZhciB1PTA7dTxhLnBhcnRzLmxlbmd0aDt1KyspYS5wYXJ0c1t1XSgpO2RlbGV0ZSBkW2EuaWRdfX19fTt2YXIgeT1mdW5jdGlvbigpe3ZhciB0PVtdO3JldHVybiBmdW5jdGlvbihlLG4pe3JldHVybiB0W2VdPW4sdC5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblwiKX19KCl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPVtdLHI9e30sbz0wO288ZS5sZW5ndGg7bysrKXt2YXIgaT1lW29dLHM9aVswXSxhPWlbMV0sdT1pWzJdLGM9aVszXSxkPXtpZDp0K1wiOlwiK28sY3NzOmEsbWVkaWE6dSxzb3VyY2VNYXA6Y307cltzXT9yW3NdLnBhcnRzLnB1c2goZCk6bi5wdXNoKHJbc109e2lkOnMscGFydHM6W2RdfSl9cmV0dXJuIG59fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixyLG8saSl7dmFyIHMsYT10PXR8fHt9LHU9dHlwZW9mIHQuZGVmYXVsdDtcIm9iamVjdFwiIT09dSYmXCJmdW5jdGlvblwiIT09dXx8KHM9dCxhPXQuZGVmYXVsdCk7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hLm9wdGlvbnM6YTtlJiYoYy5yZW5kZXI9ZS5yZW5kZXIsYy5zdGF0aWNSZW5kZXJGbnM9ZS5zdGF0aWNSZW5kZXJGbnMsYy5fY29tcGlsZWQ9ITApLG4mJihjLmZ1bmN0aW9uYWw9ITApLG8mJihjLl9zY29wZUlkPW8pO3ZhciBkO2lmKGk/KGQ9ZnVuY3Rpb24odCl7dD10fHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsdHx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fCh0PV9fVlVFX1NTUl9DT05URVhUX18pLHImJnIuY2FsbCh0aGlzLHQpLHQmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LGMuX3NzclJlZ2lzdGVyPWQpOnImJihkPXIpLGQpe3ZhciBmPWMuZnVuY3Rpb25hbCxsPWY/Yy5yZW5kZXI6Yy5iZWZvcmVDcmVhdGU7Zj8oYy5faW5qZWN0U3R5bGVzPWQsYy5yZW5kZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZC5jYWxsKGUpLGwodCxlKX0pOmMuYmVmb3JlQ3JlYXRlPWw/W10uY29uY2F0KGwsZCk6W2RdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6YSxvcHRpb25zOmN9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXQuJGNyZWF0ZUVsZW1lbnQsbj10Ll9zZWxmLl9jfHxlO3JldHVybiBuKFwidWxcIix7c3RhdGljQ2xhc3M6XCJ2dWVqcy1jb3VudGRvd25cIn0sW3QuZGF5cz4wP24oXCJsaVwiLFtuKFwicFwiLHtzdGF0aWNDbGFzczpcImRpZ2l0XCJ9LFt0Ll92KHQuX3ModC5fZihcInR3b0RpZ2l0c1wiKSh0LmRheXMpKSldKSx0Ll92KFwiIFwiKSxuKFwicFwiLHtzdGF0aWNDbGFzczpcInRleHRcIn0sW3QuX3YodC5fcyh0LmRheXM+MT9cImRheXNcIjpcImRheVwiKSldKV0pOnQuX2UoKSx0Ll92KFwiIFwiKSxuKFwibGlcIixbbihcInBcIix7c3RhdGljQ2xhc3M6XCJkaWdpdFwifSxbdC5fdih0Ll9zKHQuX2YoXCJ0d29EaWdpdHNcIikodC5ob3VycykpKV0pLHQuX3YoXCIgXCIpLG4oXCJwXCIse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbdC5fdih0Ll9zKHQuaG91cnM+MT9cImhvdXJzXCI6XCJob3VyXCIpKV0pXSksdC5fdihcIiBcIiksbihcImxpXCIsW24oXCJwXCIse3N0YXRpY0NsYXNzOlwiZGlnaXRcIn0sW3QuX3YodC5fcyh0Ll9mKFwidHdvRGlnaXRzXCIpKHQubWludXRlcykpKV0pLHQuX3YoXCIgXCIpLG4oXCJwXCIse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbdC5fdihcIm1pblwiKV0pXSksdC5fdihcIiBcIiksbihcImxpXCIsW24oXCJwXCIse3N0YXRpY0NsYXNzOlwiZGlnaXRcIn0sW3QuX3YodC5fcyh0Ll9mKFwidHdvRGlnaXRzXCIpKHQuc2Vjb25kcykpKV0pLHQuX3YoXCIgXCIpLG4oXCJwXCIse3N0YXRpY0NsYXNzOlwidGV4dFwifSxbdC5fdihcIlNlY1wiKV0pXSldKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307ZS5hPWl9XSl9KTsiXSwibmFtZXMiOlsicHJvcHMiLCJjb21wb25lbnRzIiwiQ291bnRkb3duIiwiZGF0YSIsImljbyIsImFtb3VudCIsInJlY193YWxsZXQiLCJ3YWxsZXRfc3ltYm9sIiwiYmFsYW5jZSIsImNvc3QiLCJsb2FkaW5nIiwibWV0aG9kcyIsImdvQmFjayIsIndpbmRvdyIsImZldGNoRGF0YSIsInBvc3QiLCJ0aGVuIiwicHVyY2hhc2UiLCJpY29fc3ltYm9sIiwiaWNvX2lkIiwic3ltYm9sIiwiZmV0Y2hXYWxsZXQiLCJ0eXBlIiwiY3JlYXRlV2FsbGV0IiwiY2hhbmdlX3JlY193YWxsZXQiLCJuZXR3b3JrX3N5bWJvbCIsImNvc3RDYWwiLCJjcmVhdGVkIiwibW91bnRlZCIsImRlc3Ryb3llZCJdLCJzb3VyY2VSb290IjoiIn0=