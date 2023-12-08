"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_knowledge_FaqSearch_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      faqs: []
    };
  },
  watch: {
    $route: function $route(from, to) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (to.params.search != from.params.search && to.params.search != null) {
                  _this.fetchCategories();
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  // custom methods
  methods: {
    goBack: function goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    fetchCategories: function fetchCategories() {
      var _this2 = this;

      this.$http.get("/user/knowledge/faq/" + this.$route.params.search).then(function (response) {
        _this2.faqs = response.data.faqs;
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

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.faq-search[data-v-06e5248f] {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.faq-search .faq-search-input .input-group[data-v-06e5248f]:focus-within {\n    box-shadow: none;\n}\n.faq-contact .faq-contact-card[data-v-06e5248f] {\n    background-color: rgba(186, 191, 199, 0.12);\n}\n@media (min-width: 992px) {\n.faq-search .card-body[data-v-06e5248f] {\n        padding: 8rem !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n.faq-search .card-body[data-v-06e5248f] {\n        padding: 6rem !important;\n}\n}\n@media (min-width: 768px) {\n.faq-search .faq-search-input .input-group[data-v-06e5248f] {\n        width: 576px;\n        margin: 0 auto;\n}\n.faq-navigation[data-v-06e5248f] {\n        height: 550px;\n}\n}\n", "",{"version":3,"sources":["webpack://./resources/src/Pages/knowledge/FaqSearch.vue"],"names":[],"mappings":";AA4NA;IACA,sBAAA;IACA,sDAAA;AACA;AACA;IACA,gBAAA;AACA;AAEA;IACA,2CAAA;AACA;AAEA;AACA;QACA,wBAAA;AACA;AACA;AACA;AACA;QACA,wBAAA;AACA;AACA;AACA;AACA;QACA,YAAA;QACA,cAAA;AACA;AACA;QACA,aAAA;AACA;AACA","sourcesContent":["<template>\n    <div>\n        <section id=\"faq-search-filter\">\n            <div\n                class=\"card faq-search\"\n                style=\"background-image: url('images/banner/banner.png')\"\n            >\n                <div class=\"card-body text-center\">\n                    <!-- main title -->\n                    <h2 class=\"text-primary\">\n                        {{ $t(\"Let's answer some questions\") }}\n                    </h2>\n\n                    <!-- subtitle -->\n                    <p class=\"card-text mb-2\">\n                        {{\n                            $t(\n                                \"or choose a category to quickly find the help you need\"\n                            )\n                        }}\n                    </p>\n\n                    <!-- search input -->\n                    <form class=\"faq-search-input\" @submit.prevent=\"search()\">\n                        <div class=\"input-group input-group-merge\">\n                            <div class=\"input-group-text\">\n                                <i class=\"bi bi-search\"></i>\n                            </div>\n                            <input\n                                type=\"text\"\n                                class=\"form-control\"\n                                placeholder=\"Search faq...\"\n                                ref=\"search\"\n                            />\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </section>\n        <!--/ Knowledge base Jumbotron -->\n\n        <!-- Knowledge base -->\n        <section id=\"faq-tabs\">\n            <!-- vertical tab pill -->\n            <div class=\"row\">\n                <div class=\"col-lg-3 col-md-4 col-sm-12\">\n                    <div\n                        class=\"faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0\"\n                    >\n                        <!-- FAQ image -->\n                        <img\n                            src=\"images/illustration/faq-illustrations.svg\"\n                            class=\"img-fluid d-none d-md-block\"\n                            alt=\"demand img\"\n                        />\n                    </div>\n                </div>\n\n                <div class=\"col-lg-9 col-md-8 col-sm-12\">\n                    <template v-if=\"faqs != ''\">\n                        <div\n                            v-for=\"(faq, index) in faqs\"\n                            :key=\"index\"\n                            class=\"accordion accordion-margin mt-2\"\n                            :id=\"'#faq-question-' + faq.id\"\n                        >\n                            <div class=\"card accordion-item\">\n                                <h2\n                                    class=\"accordion-header\"\n                                    :id=\"faq.category_id + faq.id\"\n                                >\n                                    <button\n                                        class=\"accordion-button collapsed\"\n                                        data-bs-toggle=\"collapse\"\n                                        role=\"button\"\n                                        :data-bs-target=\"\n                                            '#faq-question-' + faq.id\n                                        \"\n                                        :aria-controls=\"\n                                            '#faq-question-' + faq.id\n                                        \"\n                                        aria-expanded=\"false\"\n                                    >\n                                        {{ faq.question }}\n                                    </button>\n                                </h2>\n\n                                <div\n                                    :id=\"'faq-question-' + faq.id\"\n                                    class=\"collapse accordion-collapse\"\n                                    :aria-labelledby=\"faq.category_id + faq.id\"\n                                    :data-bs-parent=\"'#faq' + faq.id\"\n                                >\n                                    <div class=\"accordion-body text-dark\">\n                                        {{ faq.answer }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </template>\n\n                    <div v-else class=\"text-muted text-center\" colspan=\"100%\">\n                        <img\n                            height=\"128px\"\n                            width=\"128px\"\n                            src=\"https://assets.staticimg.com/pro/2.0.4/images/empty.svg\"\n                            alt=\"\"\n                        />\n                        <p class=\"\">{{ $t(\"No Data Found\") }}</p>\n\n                        <section class=\"faq-contact\">\n                            <div class=\"row mt-5 pt-75\">\n                                <div class=\"col-12 text-center\">\n                                    <h2>\n                                        {{ $t(\"You still have a question\") }}?\n                                    </h2>\n                                    <p class=\"mb-3\">\n                                        {{\n                                            $t(\n                                                \"If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!\"\n                                            )\n                                        }}\n                                    </p>\n                                </div>\n                            </div>\n                        </section>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <!-- / frequently asked questions tabs pills -->\n\n        <!-- contact us -->\n        <section class=\"faq-contact\" v-if=\"faqs != ''\">\n            <div class=\"row mt-5 pt-75\">\n                <div class=\"col-12 text-center\">\n                    <h2>{{ $t(\"You still have a question\") }}?</h2>\n                    <p class=\"mb-3\">\n                        {{\n                            $t(\n                                \"If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!\"\n                            )\n                        }}\n                    </p>\n                </div>\n            </div>\n        </section>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: [],\n    // component list\n    components: {},\n\n    // component data\n    data() {\n        return {\n            faqs: [],\n        };\n    },\n\n    watch: {\n        async $route(from, to) {\n            if (\n                to.params.search != from.params.search &&\n                to.params.search != null\n            ) {\n                this.fetchCategories();\n            }\n        },\n    },\n\n    // custom methods\n    methods: {\n        goBack() {\n            window.history.length > 1\n                ? this.$router.go(-1)\n                : this.$router.push(\"/\");\n        },\n        fetchCategories() {\n            this.$http\n                .get(\"/user/knowledge/faq/\" + this.$route.params.search)\n                .then((response) => {\n                    this.faqs = response.data.faqs;\n                })\n                .catch((error) => {});\n        },\n        search() {\n            this.$router\n                .push(\"/knowledge/faq/\" + this.$refs.search.value)\n                .catch((err) => {\n                    // Ignore the vuex err regarding  navigating to the page they are already on.\n                    if (\n                        err.name !== \"NavigationDuplicated\" &&\n                        !err.message.includes(\n                            \"Avoided redundant navigation to current location\"\n                        )\n                    ) {\n                        // But print any other errors to the console\n                        logError(err);\n                    }\n                });\n        },\n    },\n\n    // on component created\n    created() {},\n\n    // on component mounted\n    mounted() {\n        this.fetchCategories();\n    },\n\n    // on component destroyed\n    destroyed() {},\n};\n</script>\n<style scoped>\n.faq-search {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.faq-search .faq-search-input .input-group:focus-within {\n    box-shadow: none;\n}\n\n.faq-contact .faq-contact-card {\n    background-color: rgba(186, 191, 199, 0.12);\n}\n\n@media (min-width: 992px) {\n    .faq-search .card-body {\n        padding: 8rem !important;\n    }\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n    .faq-search .card-body {\n        padding: 6rem !important;\n    }\n}\n@media (min-width: 768px) {\n    .faq-search .faq-search-input .input-group {\n        width: 576px;\n        margin: 0 auto;\n    }\n    .faq-navigation {\n        height: 550px;\n    }\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_style_index_0_id_06e5248f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_style_index_0_id_06e5248f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_style_index_0_id_06e5248f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/Pages/knowledge/FaqSearch.vue":
/*!*****************************************************!*\
  !*** ./resources/src/Pages/knowledge/FaqSearch.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true& */ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true&");
/* harmony import */ var _FaqSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FaqSearch.vue?vue&type=script&lang=js& */ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _FaqSearch_vue_vue_type_style_index_0_id_06e5248f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& */ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FaqSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "06e5248f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/knowledge/FaqSearch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_style_index_0_id_06e5248f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=style&index=0&id=06e5248f&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FaqSearch_vue_vue_type_template_id_06e5248f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/FaqSearch.vue?vue&type=template&id=06e5248f&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
        _vm._m(1),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-lg-9 col-md-8 col-sm-12" },
          [
            _vm.faqs != ""
              ? _vm._l(_vm.faqs, function (faq, index) {
                  return _c(
                    "div",
                    {
                      key: index,
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
                                  "\n                                    " +
                                    _vm._s(faq.question) +
                                    "\n                                "
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
                                  "\n                                    " +
                                    _vm._s(faq.answer) +
                                    "\n                                "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]
                  )
                })
              : _c(
                  "div",
                  {
                    staticClass: "text-muted text-center",
                    attrs: { colspan: "100%" },
                  },
                  [
                    _c("img", {
                      attrs: {
                        height: "128px",
                        width: "128px",
                        src: "https://assets.staticimg.com/pro/2.0.4/images/empty.svg",
                        alt: "",
                      },
                    }),
                    _vm._v(" "),
                    _c("p", {}, [_vm._v(_vm._s(_vm.$t("No Data Found")))]),
                    _vm._v(" "),
                    _c("section", { staticClass: "faq-contact" }, [
                      _c("div", { staticClass: "row mt-5 pt-75" }, [
                        _c("div", { staticClass: "col-12 text-center" }, [
                          _c("h2", [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(_vm.$t("You still have a question")) +
                                "?\n                                "
                            ),
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "mb-3" }, [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(
                                  _vm.$t(
                                    "If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!"
                                  )
                                ) +
                                "\n                                "
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]
                ),
          ],
          2
        ),
      ]),
    ]),
    _vm._v(" "),
    _vm.faqs != ""
      ? _c("section", { staticClass: "faq-contact" }, [
          _c("div", { staticClass: "row mt-5 pt-75" }, [
            _c("div", { staticClass: "col-12 text-center" }, [
              _c("h2", [
                _vm._v(_vm._s(_vm.$t("You still have a question")) + "?"),
              ]),
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
        ])
      : _vm._e(),
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
    return _c("div", { staticClass: "col-lg-3 col-md-4 col-sm-12" }, [
      _c(
        "div",
        {
          staticClass:
            "faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0",
        },
        [
          _c("img", {
            staticClass: "img-fluid d-none d-md-block",
            attrs: {
              src: "images/illustration/faq-illustrations.svg",
              alt: "demand img",
            },
          }),
        ]
      ),
    ])
  },
]
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX2tub3dsZWRnZV9GYXFTZWFyY2hfdnVlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVKQSxpRUFBZTtFQUNmQSxTQURBO0VBRUE7RUFDQUMsY0FIQTtFQUtBO0VBQ0FDLElBTkEsa0JBTUE7SUFDQTtNQUNBQztJQURBO0VBR0EsQ0FWQTtFQVlBQztJQUNBQyxNQURBLGtCQUNBQyxJQURBLEVBQ0FDLEVBREEsRUFDQTtNQUFBOztNQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQ0EsSUFDQUEsMENBQ0FBLHdCQUZBLEVBR0E7a0JBQ0E7Z0JBQ0E7O2NBTkE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBO0lBT0E7RUFSQSxDQVpBO0VBdUJBO0VBQ0FDO0lBQ0FDLE1BREEsb0JBQ0E7TUFDQUMsNEJBQ0EsbUJBREEsR0FFQSxzQkFGQTtJQUdBLENBTEE7SUFNQUMsZUFOQSw2QkFNQTtNQUFBOztNQUNBLFdBQ0FDLEdBREEsQ0FDQSxrREFEQSxFQUVBQyxJQUZBLENBRUE7UUFDQTtNQUNBLENBSkEsV0FLQSxtQkFMQTtJQU1BLENBYkE7SUFjQUMsTUFkQSxvQkFjQTtNQUNBLGFBQ0FDLElBREEsQ0FDQSwyQ0FEQSxXQUVBO1FBQ0E7UUFDQSxJQUNBQyx1Q0FDQSxzQkFDQSxrREFEQSxDQUZBLEVBS0E7VUFDQTtVQUNBQztRQUNBO01BQ0EsQ0FiQTtJQWNBO0VBN0JBLENBeEJBO0VBd0RBO0VBQ0FDLE9BekRBLHFCQXlEQSxFQXpEQTtFQTJEQTtFQUNBQyxPQTVEQSxxQkE0REE7SUFDQTtFQUNBLENBOURBO0VBZ0VBO0VBQ0FDLFNBakVBLHVCQWlFQTtBQWpFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ3dKO0FBQzdCO0FBQzNILDhCQUE4Qiw0R0FBMkIsQ0FBQyxpSUFBcUM7QUFDL0Y7QUFDQSwwRUFBMEUsNkJBQTZCLDZEQUE2RCxHQUFHLDRFQUE0RSx1QkFBdUIsR0FBRyxtREFBbUQsa0RBQWtELEdBQUcsNkJBQTZCLDJDQUEyQyxtQ0FBbUMsR0FBRyxHQUFHLHVEQUF1RCwyQ0FBMkMsbUNBQW1DLEdBQUcsR0FBRyw2QkFBNkIsK0RBQStELHVCQUF1Qix5QkFBeUIsR0FBRyxvQ0FBb0Msd0JBQXdCLEdBQUcsR0FBRyxTQUFTLDBHQUEwRyxNQUFNLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLGlhQUFpYSxzQ0FBc0Msa0pBQWtKLHdMQUF3TCw4NUZBQTg1RixlQUFlLHlrQkFBeWtCLGFBQWEsa2xCQUFrbEIsd0JBQXdCLHNSQUFzUixvQ0FBb0MsZ0pBQWdKLHFTQUFxUyx5Z0JBQXlnQixvQ0FBb0MsMEVBQTBFLHFPQUFxTyxpSkFBaUosMkRBQTJELHdDQUF3QyxrQkFBa0IsbUNBQW1DLE9BQU8saUJBQWlCLGtDQUFrQyx3SUFBd0kseUNBQXlDLGVBQWUsV0FBVyxRQUFRLDBDQUEwQyxvQkFBb0IsMkhBQTJILFdBQVcsOEJBQThCLDJJQUEySSxxREFBcUQsbUJBQW1CLHVDQUF1QyxFQUFFLFdBQVcscUJBQXFCLG1JQUFtSSxxWEFBcVgsOEdBQThHLHVCQUF1QixtQkFBbUIsRUFBRSxXQUFXLFFBQVEsa0RBQWtELGlEQUFpRCxpQ0FBaUMsT0FBTyxzREFBc0QsS0FBSywwQ0FBMEMsNkJBQTZCLDZEQUE2RCxHQUFHLDJEQUEyRCx1QkFBdUIsR0FBRyxvQ0FBb0Msa0RBQWtELEdBQUcsK0JBQStCLDhCQUE4QixtQ0FBbUMsT0FBTyxHQUFHLHVEQUF1RCw4QkFBOEIsbUNBQW1DLE9BQU8sR0FBRyw2QkFBNkIsa0RBQWtELHVCQUF1Qix5QkFBeUIsT0FBTyx1QkFBdUIsd0JBQXdCLE9BQU8sR0FBRywrQkFBK0I7QUFDNXRVO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1AyRDtBQUNsRyxZQUE0Yjs7QUFFNWI7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMscVlBQU87Ozs7QUFJeEIsaUVBQWUsNFlBQWMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWmlFO0FBQ3ZDO0FBQ0w7QUFDeEQsQ0FBNkY7OztBQUc3RjtBQUNnRztBQUNoRyxnQkFBZ0IsdUdBQVU7QUFDMUIsRUFBRSwrRUFBTTtBQUNSLEVBQUUsNkZBQU07QUFDUixFQUFFLHNHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdkMwTSxDQUFDLGlFQUFlLDhNQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUdBN087QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLDJCQUEyQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0Esc0JBQXNCLHNDQUFzQztBQUM1RCx1QkFBdUIsNkJBQTZCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLCtCQUErQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0EsNEJBQTRCLDhDQUE4QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRDQUE0QztBQUN6RSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLGtCQUFrQjtBQUMvQyxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0Q0FBNEM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwrQkFBK0I7QUFDOUQscUJBQXFCO0FBQ3JCO0FBQ0Esa0NBQWtDLG9DQUFvQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw4QkFBOEI7QUFDbkUsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MseUNBQXlDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5QyxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0Esb0NBQW9DLDRCQUE0QjtBQUNoRSxrQ0FBa0MsK0JBQStCO0FBQ2pFLG9DQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxxQkFBcUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BELHNCQUFzQiwrQkFBK0I7QUFDckQsd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlDQUFpQztBQUN4RCxnQkFBZ0IsNkJBQTZCO0FBQzdDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUE0QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXFTZWFyY2gudnVlP2Y5YzUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZT85MDIwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcVNlYXJjaC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZT81MTYwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL0ZhcVNlYXJjaC52dWU/ZWJkOSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9GYXFTZWFyY2gudnVlPzE0YWQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZT8wOGNjIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8c2VjdGlvbiBpZD1cImZhcS1zZWFyY2gtZmlsdGVyXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkIGZhcS1zZWFyY2hcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCdpbWFnZXMvYmFubmVyL2Jhbm5lci5wbmcnKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIG1haW4gdGl0bGUgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJMZXQncyBhbnN3ZXIgc29tZSBxdWVzdGlvbnNcIikgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIHN1YnRpdGxlIC0tPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yIGNob29zZSBhIGNhdGVnb3J5IHRvIHF1aWNrbHkgZmluZCB0aGUgaGVscCB5b3UgbmVlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gc2VhcmNoIGlucHV0IC0tPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImZhcS1zZWFyY2gtaW5wdXRcIiBAc3VibWl0LnByZXZlbnQ9XCJzZWFyY2goKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGlucHV0LWdyb3VwLW1lcmdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS1zZWFyY2hcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmYXEuLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPCEtLS8gS25vd2xlZGdlIGJhc2UgSnVtYm90cm9uIC0tPlxuXG4gICAgICAgIDwhLS0gS25vd2xlZGdlIGJhc2UgLS0+XG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZmFxLXRhYnNcIj5cbiAgICAgICAgICAgIDwhLS0gdmVydGljYWwgdGFiIHBpbGwgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC00IGNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZhcS1uYXZpZ2F0aW9uIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBmbGV4LWNvbHVtbiBtYi0yIG1iLW1kLTBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZBUSBpbWFnZSAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJpbWFnZXMvaWxsdXN0cmF0aW9uL2ZhcS1pbGx1c3RyYXRpb25zLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbWctZmx1aWQgZC1ub25lIGQtbWQtYmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cImRlbWFuZCBpbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTkgY29sLW1kLTggY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmFxcyAhPSAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGZhcSwgaW5kZXgpIGluIGZhcXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY2NvcmRpb24gYWNjb3JkaW9uLW1hcmdpbiBtdC0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCInI2ZhcS1xdWVzdGlvbi0nICsgZmFxLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBhY2NvcmRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYWNjb3JkaW9uLWhlYWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJmYXEuY2F0ZWdvcnlfaWQgKyBmYXEuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY2NvcmRpb24tYnV0dG9uIGNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10b2dnbGU9XCJjb2xsYXBzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGEtYnMtdGFyZ2V0PVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWNvbnRyb2xzPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZmFxLnF1ZXN0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCInZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjb2xsYXBzZSBhY2NvcmRpb24tY29sbGFwc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFyaWEtbGFiZWxsZWRieT1cImZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGF0YS1icy1wYXJlbnQ9XCInI2ZhcScgKyBmYXEuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHkgdGV4dC1kYXJrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZmFxLmFuc3dlciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJ0ZXh0LW11dGVkIHRleHQtY2VudGVyXCIgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMjhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMjhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9hc3NldHMuc3RhdGljaW1nLmNvbS9wcm8vMi4wLjQvaW1hZ2VzL2VtcHR5LnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIlwiPnt7ICR0KFwiTm8gRGF0YSBGb3VuZFwiKSB9fTwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJmYXEtY29udGFjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbXQtNSBwdC03NVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJZb3Ugc3RpbGwgaGF2ZSBhIHF1ZXN0aW9uXCIpIH19P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJZiB5b3UgY2Fubm90IGZpbmQgYSBxdWVzdGlvbiBpbiBvdXIgRkFRLCB5b3UgY2FuIGFsd2F5cyBjb250YWN0IHVzLiBXZSB3aWxsIGFuc3dlciB0byB5b3Ugc2hvcnRseSFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPCEtLSAvIGZyZXF1ZW50bHkgYXNrZWQgcXVlc3Rpb25zIHRhYnMgcGlsbHMgLS0+XG5cbiAgICAgICAgPCEtLSBjb250YWN0IHVzIC0tPlxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImZhcS1jb250YWN0XCIgdi1pZj1cImZhcXMgIT0gJydcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbXQtNSBwdC03NVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPnt7ICR0KFwiWW91IHN0aWxsIGhhdmUgYSBxdWVzdGlvblwiKSB9fT88L2gyPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSWYgeW91IGNhbm5vdCBmaW5kIGEgcXVlc3Rpb24gaW4gb3VyIEZBUSwgeW91IGNhbiBhbHdheXMgY29udGFjdCB1cy4gV2Ugd2lsbCBhbnN3ZXIgdG8geW91IHNob3J0bHkhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogW10sXG4gICAgLy8gY29tcG9uZW50IGxpc3RcbiAgICBjb21wb25lbnRzOiB7fSxcblxuICAgIC8vIGNvbXBvbmVudCBkYXRhXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZhcXM6IFtdLFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuICAgICAgICBhc3luYyAkcm91dGUoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0by5wYXJhbXMuc2VhcmNoICE9IGZyb20ucGFyYW1zLnNlYXJjaCAmJlxuICAgICAgICAgICAgICAgIHRvLnBhcmFtcy5zZWFyY2ggIT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gY3VzdG9tIG1ldGhvZHNcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdvQmFjaygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICA/IHRoaXMuJHJvdXRlci5nbygtMSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHJvdXRlci5wdXNoKFwiL1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzKCkge1xuICAgICAgICAgICAgdGhpcy4kaHR0cFxuICAgICAgICAgICAgICAgIC5nZXQoXCIvdXNlci9rbm93bGVkZ2UvZmFxL1wiICsgdGhpcy4kcm91dGUucGFyYW1zLnNlYXJjaClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXFzID0gcmVzcG9uc2UuZGF0YS5mYXFzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge30pO1xuICAgICAgICB9LFxuICAgICAgICBzZWFyY2goKSB7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXJcbiAgICAgICAgICAgICAgICAucHVzaChcIi9rbm93bGVkZ2UvZmFxL1wiICsgdGhpcy4kcmVmcy5zZWFyY2gudmFsdWUpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoZSB2dWV4IGVyciByZWdhcmRpbmcgIG5hdmlnYXRpbmcgdG8gdGhlIHBhZ2UgdGhleSBhcmUgYWxyZWFkeSBvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm5hbWUgIT09IFwiTmF2aWdhdGlvbkR1cGxpY2F0ZWRcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWVyci5tZXNzYWdlLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXZvaWRlZCByZWR1bmRhbnQgbmF2aWdhdGlvbiB0byBjdXJyZW50IGxvY2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCdXQgcHJpbnQgYW55IG90aGVyIGVycm9ycyB0byB0aGUgY29uc29sZVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgY3JlYXRlZFxuICAgIGNyZWF0ZWQoKSB7fSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBtb3VudGVkXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaENhdGVnb3JpZXMoKTtcbiAgICB9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IGRlc3Ryb3llZFxuICAgIGRlc3Ryb3llZCgpIHt9LFxufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5mYXEtc2VhcmNoIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE1LCAxMDMsIDI0MCwgMC4xMikgIWltcG9ydGFudDtcbn1cbi5mYXEtc2VhcmNoIC5mYXEtc2VhcmNoLWlucHV0IC5pbnB1dC1ncm91cDpmb2N1cy13aXRoaW4ge1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5mYXEtY29udGFjdCAuZmFxLWNvbnRhY3QtY2FyZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODYsIDE5MSwgMTk5LCAwLjEyKTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gICAgLmZhcS1zZWFyY2ggLmNhcmQtYm9keSB7XG4gICAgICAgIHBhZGRpbmc6IDhyZW0gIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuICAgIC5mYXEtc2VhcmNoIC5jYXJkLWJvZHkge1xuICAgICAgICBwYWRkaW5nOiA2cmVtICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwIHtcbiAgICAgICAgd2lkdGg6IDU3NnB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgLmZhcS1uYXZpZ2F0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiA1NTBweDtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sYXJhdmVsLW1peC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5mYXEtc2VhcmNoW2RhdGEtdi0wNmU1MjQ4Zl0ge1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTAzLCAyNDAsIDAuMTIpICFpbXBvcnRhbnQ7XFxufVxcbi5mYXEtc2VhcmNoIC5mYXEtc2VhcmNoLWlucHV0IC5pbnB1dC1ncm91cFtkYXRhLXYtMDZlNTI0OGZdOmZvY3VzLXdpdGhpbiB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcbi5mYXEtY29udGFjdCAuZmFxLWNvbnRhY3QtY2FyZFtkYXRhLXYtMDZlNTI0OGZdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODYsIDE5MSwgMTk5LCAwLjEyKTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuLmZhcS1zZWFyY2ggLmNhcmQtYm9keVtkYXRhLXYtMDZlNTI0OGZdIHtcXG4gICAgICAgIHBhZGRpbmc6IDhyZW0gIWltcG9ydGFudDtcXG59XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XFxuLmZhcS1zZWFyY2ggLmNhcmQtYm9keVtkYXRhLXYtMDZlNTI0OGZdIHtcXG4gICAgICAgIHBhZGRpbmc6IDZyZW0gIWltcG9ydGFudDtcXG59XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbi5mYXEtc2VhcmNoIC5mYXEtc2VhcmNoLWlucHV0IC5pbnB1dC1ncm91cFtkYXRhLXYtMDZlNTI0OGZdIHtcXG4gICAgICAgIHdpZHRoOiA1NzZweDtcXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4uZmFxLW5hdmlnYXRpb25bZGF0YS12LTA2ZTUyNDhmXSB7XFxuICAgICAgICBoZWlnaHQ6IDU1MHB4O1xcbn1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBNE5BO0lBQ0Esc0JBQUE7SUFDQSxzREFBQTtBQUNBO0FBQ0E7SUFDQSxnQkFBQTtBQUNBO0FBRUE7SUFDQSwyQ0FBQTtBQUNBO0FBRUE7QUFDQTtRQUNBLHdCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUFDQSx3QkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FBQ0EsWUFBQTtRQUNBLGNBQUE7QUFDQTtBQUNBO1FBQ0EsYUFBQTtBQUNBO0FBQ0FcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgICA8ZGl2PlxcbiAgICAgICAgPHNlY3Rpb24gaWQ9XFxcImZhcS1zZWFyY2gtZmlsdGVyXFxcIj5cXG4gICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJjYXJkIGZhcS1zZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2ltYWdlcy9iYW5uZXIvYmFubmVyLnBuZycpXFxcIlxcbiAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1ib2R5IHRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gbWFpbiB0aXRsZSAtLT5cXG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwidGV4dC1wcmltYXJ5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcXFwiTGV0J3MgYW5zd2VyIHNvbWUgcXVlc3Rpb25zXFxcIikgfX1cXG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8IS0tIHN1YnRpdGxlIC0tPlxcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImNhcmQtdGV4dCBtYi0yXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7e1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJvciBjaG9vc2UgYSBjYXRlZ29yeSB0byBxdWlja2x5IGZpbmQgdGhlIGhlbHAgeW91IG5lZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxcblxcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBzZWFyY2ggaW5wdXQgLS0+XFxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZmFxLXNlYXJjaC1pbnB1dFxcXCIgQHN1Ym1pdC5wcmV2ZW50PVxcXCJzZWFyY2goKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtbWVyZ2VcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC10ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJiaSBiaS1zZWFyY2hcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwiU2VhcmNoIGZhcS4uLlxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cXFwic2VhcmNoXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgIDwhLS0vIEtub3dsZWRnZSBiYXNlIEp1bWJvdHJvbiAtLT5cXG5cXG4gICAgICAgIDwhLS0gS25vd2xlZGdlIGJhc2UgLS0+XFxuICAgICAgICA8c2VjdGlvbiBpZD1cXFwiZmFxLXRhYnNcXFwiPlxcbiAgICAgICAgICAgIDwhLS0gdmVydGljYWwgdGFiIHBpbGwgLS0+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLWxnLTMgY29sLW1kLTQgY29sLXNtLTEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiZmFxLW5hdmlnYXRpb24gZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtY29sdW1uIG1iLTIgbWItbWQtMFxcXCJcXG4gICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZBUSBpbWFnZSAtLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiaW1hZ2VzL2lsbHVzdHJhdGlvbi9mYXEtaWxsdXN0cmF0aW9ucy5zdmdcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpbWctZmx1aWQgZC1ub25lIGQtbWQtYmxvY2tcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiZGVtYW5kIGltZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctOSBjb2wtbWQtOCBjb2wtc20tMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XFxcImZhcXMgIT0gJydcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XFxcIihmYXEsIGluZGV4KSBpbiBmYXFzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImFjY29yZGlvbiBhY2NvcmRpb24tbWFyZ2luIG10LTJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwiJyNmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQgYWNjb3JkaW9uLWl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImFjY29yZGlvbi1oZWFkZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVxcXCJmYXEuY2F0ZWdvcnlfaWQgKyBmYXEuaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiYWNjb3JkaW9uLWJ1dHRvbiBjb2xsYXBzZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiYnV0dG9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGF0YS1icy10YXJnZXQ9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWNvbnRyb2xzPVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjZmFxLXF1ZXN0aW9uLScgKyBmYXEuaWRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZhcS5xdWVzdGlvbiB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XFxcIidmYXEtcXVlc3Rpb24tJyArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiY29sbGFwc2UgYWNjb3JkaW9uLWNvbGxhcHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWxhYmVsbGVkYnk9XFxcImZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGF0YS1icy1wYXJlbnQ9XFxcIicjZmFxJyArIGZhcS5pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY2NvcmRpb24tYm9keSB0ZXh0LWRhcmtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBmYXEuYW5zd2VyIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcblxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XFxcInRleHQtbXV0ZWQgdGV4dC1jZW50ZXJcXFwiIGNvbHNwYW49XFxcIjEwMCVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVxcXCIxMjhweFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XFxcIjEyOHB4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XFxcImh0dHBzOi8vYXNzZXRzLnN0YXRpY2ltZy5jb20vcHJvLzIuMC40L2ltYWdlcy9lbXB0eS5zdmdcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcIlxcXCI+e3sgJHQoXFxcIk5vIERhdGEgRm91bmRcXFwiKSB9fTwvcD5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwiZmFxLWNvbnRhY3RcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNSBwdC03NVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXFxcIllvdSBzdGlsbCBoYXZlIGEgcXVlc3Rpb25cXFwiKSB9fT9cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJtYi0zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJJZiB5b3UgY2Fubm90IGZpbmQgYSBxdWVzdGlvbiBpbiBvdXIgRkFRLCB5b3UgY2FuIGFsd2F5cyBjb250YWN0IHVzLiBXZSB3aWxsIGFuc3dlciB0byB5b3Ugc2hvcnRseSFcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgIDwhLS0gLyBmcmVxdWVudGx5IGFza2VkIHF1ZXN0aW9ucyB0YWJzIHBpbGxzIC0tPlxcblxcbiAgICAgICAgPCEtLSBjb250YWN0IHVzIC0tPlxcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcImZhcS1jb250YWN0XFxcIiB2LWlmPVxcXCJmYXFzICE9ICcnXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNSBwdC03NVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiB0ZXh0LWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDI+e3sgJHQoXFxcIllvdSBzdGlsbCBoYXZlIGEgcXVlc3Rpb25cXFwiKSB9fT88L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcIm1iLTNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcIklmIHlvdSBjYW5ub3QgZmluZCBhIHF1ZXN0aW9uIGluIG91ciBGQVEsIHlvdSBjYW4gYWx3YXlzIGNvbnRhY3QgdXMuIFdlIHdpbGwgYW5zd2VyIHRvIHlvdSBzaG9ydGx5IVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XFxuICAgICAgICAgICAgICAgICAgICA8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9zZWN0aW9uPlxcbiAgICA8L2Rpdj5cXG48L3RlbXBsYXRlPlxcblxcbjxzY3JpcHQ+XFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICBwcm9wczogW10sXFxuICAgIC8vIGNvbXBvbmVudCBsaXN0XFxuICAgIGNvbXBvbmVudHM6IHt9LFxcblxcbiAgICAvLyBjb21wb25lbnQgZGF0YVxcbiAgICBkYXRhKCkge1xcbiAgICAgICAgcmV0dXJuIHtcXG4gICAgICAgICAgICBmYXFzOiBbXSxcXG4gICAgICAgIH07XFxuICAgIH0sXFxuXFxuICAgIHdhdGNoOiB7XFxuICAgICAgICBhc3luYyAkcm91dGUoZnJvbSwgdG8pIHtcXG4gICAgICAgICAgICBpZiAoXFxuICAgICAgICAgICAgICAgIHRvLnBhcmFtcy5zZWFyY2ggIT0gZnJvbS5wYXJhbXMuc2VhcmNoICYmXFxuICAgICAgICAgICAgICAgIHRvLnBhcmFtcy5zZWFyY2ggIT0gbnVsbFxcbiAgICAgICAgICAgICkge1xcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH0sXFxuICAgIH0sXFxuXFxuICAgIC8vIGN1c3RvbSBtZXRob2RzXFxuICAgIG1ldGhvZHM6IHtcXG4gICAgICAgIGdvQmFjaygpIHtcXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxXFxuICAgICAgICAgICAgICAgID8gdGhpcy4kcm91dGVyLmdvKC0xKVxcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHJvdXRlci5wdXNoKFxcXCIvXFxcIik7XFxuICAgICAgICB9LFxcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzKCkge1xcbiAgICAgICAgICAgIHRoaXMuJGh0dHBcXG4gICAgICAgICAgICAgICAgLmdldChcXFwiL3VzZXIva25vd2xlZGdlL2ZhcS9cXFwiICsgdGhpcy4kcm91dGUucGFyYW1zLnNlYXJjaClcXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhcXMgPSByZXNwb25zZS5kYXRhLmZhcXM7XFxuICAgICAgICAgICAgICAgIH0pXFxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcXG4gICAgICAgIH0sXFxuICAgICAgICBzZWFyY2goKSB7XFxuICAgICAgICAgICAgdGhpcy4kcm91dGVyXFxuICAgICAgICAgICAgICAgIC5wdXNoKFxcXCIva25vd2xlZGdlL2ZhcS9cXFwiICsgdGhpcy4kcmVmcy5zZWFyY2gudmFsdWUpXFxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhlIHZ1ZXggZXJyIHJlZ2FyZGluZyAgbmF2aWdhdGluZyB0byB0aGUgcGFnZSB0aGV5IGFyZSBhbHJlYWR5IG9uLlxcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5uYW1lICE9PSBcXFwiTmF2aWdhdGlvbkR1cGxpY2F0ZWRcXFwiICYmXFxuICAgICAgICAgICAgICAgICAgICAgICAgIWVyci5tZXNzYWdlLmluY2x1ZGVzKFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFwiQXZvaWRlZCByZWR1bmRhbnQgbmF2aWdhdGlvbiB0byBjdXJyZW50IGxvY2F0aW9uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1dCBwcmludCBhbnkgb3RoZXIgZXJyb3JzIHRvIHRoZSBjb25zb2xlXFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nRXJyb3IoZXJyKTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfSk7XFxuICAgICAgICB9LFxcbiAgICB9LFxcblxcbiAgICAvLyBvbiBjb21wb25lbnQgY3JlYXRlZFxcbiAgICBjcmVhdGVkKCkge30sXFxuXFxuICAgIC8vIG9uIGNvbXBvbmVudCBtb3VudGVkXFxuICAgIG1vdW50ZWQoKSB7XFxuICAgICAgICB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xcbiAgICB9LFxcblxcbiAgICAvLyBvbiBjb21wb25lbnQgZGVzdHJveWVkXFxuICAgIGRlc3Ryb3llZCgpIHt9LFxcbn07XFxuPC9zY3JpcHQ+XFxuPHN0eWxlIHNjb3BlZD5cXG4uZmFxLXNlYXJjaCB7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE1LCAxMDMsIDI0MCwgMC4xMikgIWltcG9ydGFudDtcXG59XFxuLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwOmZvY3VzLXdpdGhpbiB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5mYXEtY29udGFjdCAuZmFxLWNvbnRhY3QtY2FyZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTg2LCAxOTEsIDE5OSwgMC4xMik7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcbiAgICAuZmFxLXNlYXJjaCAuY2FyZC1ib2R5IHtcXG4gICAgICAgIHBhZGRpbmc6IDhyZW0gIWltcG9ydGFudDtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTEuOThweCkge1xcbiAgICAuZmFxLXNlYXJjaCAuY2FyZC1ib2R5IHtcXG4gICAgICAgIHBhZGRpbmc6IDZyZW0gIWltcG9ydGFudDtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgLmZhcS1zZWFyY2ggLmZhcS1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwIHtcXG4gICAgICAgIHdpZHRoOiA1NzZweDtcXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB9XFxuICAgIC5mYXEtbmF2aWdhdGlvbiB7XFxuICAgICAgICBoZWlnaHQ6IDU1MHB4O1xcbiAgICB9XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sYXJhdmVsLW1peC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02NVswXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02NVswXS5ydWxlc1swXS51c2VbMl0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GYXFTZWFyY2gudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MDZlNTI0OGYmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9GYXFTZWFyY2gudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA2ZTUyNDhmJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZhcVNlYXJjaC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0ZhcVNlYXJjaC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vRmFxU2VhcmNoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTA2ZTUyNDhmJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIwNmU1MjQ4ZlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcwNmU1MjQ4ZicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcwNmU1MjQ4ZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcwNmU1MjQ4ZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRmFxU2VhcmNoLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wNmU1MjQ4ZiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwNmU1MjQ4ZicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvRmFxU2VhcmNoLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GYXFTZWFyY2gudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTVbMF0ucnVsZXNbMF0udXNlWzBdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmFxU2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsyXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZhcVNlYXJjaC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wNmU1MjQ4ZiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GYXFTZWFyY2gudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA2ZTUyNDhmJnNjb3BlZD10cnVlJlwiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwic2VjdGlvblwiLCB7IGF0dHJzOiB7IGlkOiBcImZhcS1zZWFyY2gtZmlsdGVyXCIgfSB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmQgZmFxLXNlYXJjaFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7XG4gICAgICAgICAgICBcImJhY2tncm91bmQtaW1hZ2VcIjogXCJ1cmwoJ2ltYWdlcy9iYW5uZXIvYmFubmVyLnBuZycpXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5IHRleHQtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtcHJpbWFyeVwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiTGV0J3MgYW5zd2VyIHNvbWUgcXVlc3Rpb25zXCIpKSArXG4gICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC10ZXh0IG1iLTJcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICBfdm0uJHQoXG4gICAgICAgICAgICAgICAgICAgICAgXCJvciBjaG9vc2UgYSBjYXRlZ29yeSB0byBxdWlja2x5IGZpbmQgdGhlIGhlbHAgeW91IG5lZWRcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmYXEtc2VhcmNoLWlucHV0XCIsXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIHN1Ym1pdDogZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNlYXJjaCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwIGlucHV0LWdyb3VwLW1lcmdlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9tKDApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIGZhcS4uLlwiIH0sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgXVxuICAgICAgKSxcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwic2VjdGlvblwiLCB7IGF0dHJzOiB7IGlkOiBcImZhcS10YWJzXCIgfSB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgX3ZtLl9tKDEpLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLWxnLTkgY29sLW1kLTggY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0uZmFxcyAhPSBcIlwiXG4gICAgICAgICAgICAgID8gX3ZtLl9sKF92bS5mYXFzLCBmdW5jdGlvbiAoZmFxLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhY2NvcmRpb24gYWNjb3JkaW9uLW1hcmdpbiBtdC0yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwiI2ZhcS1xdWVzdGlvbi1cIiArIGZhcS5pZCB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkIGFjY29yZGlvbi1pdGVtXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiaDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFjY29yZGlvbi1oZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpZDogZmFxLmNhdGVnb3J5X2lkICsgZmFxLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFjY29yZGlvbi1idXR0b24gY29sbGFwc2VkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRvZ2dsZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdGFyZ2V0XCI6IFwiI2ZhcS1xdWVzdGlvbi1cIiArIGZhcS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtY29udHJvbHNcIjogXCIjZmFxLXF1ZXN0aW9uLVwiICsgZmFxLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoZmFxLnF1ZXN0aW9uKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29sbGFwc2UgYWNjb3JkaW9uLWNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcS1xdWVzdGlvbi1cIiArIGZhcS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IGZhcS5jYXRlZ29yeV9pZCArIGZhcS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1icy1wYXJlbnRcIjogXCIjZmFxXCIgKyBmYXEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYWNjb3JkaW9uLWJvZHkgdGV4dC1kYXJrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKGZhcS5hbnN3ZXIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1tdXRlZCB0ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xzcGFuOiBcIjEwMCVcIiB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwiaHR0cHM6Ly9hc3NldHMuc3RhdGljaW1nLmNvbS9wcm8vMi4wLjQvaW1hZ2VzL2VtcHR5LnN2Z1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwge30sIFtfdm0uX3YoX3ZtLl9zKF92bS4kdChcIk5vIERhdGEgRm91bmRcIikpKV0pLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJmYXEtY29udGFjdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvdyBtdC01IHB0LTc1XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtMTIgdGV4dC1jZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiWW91IHN0aWxsIGhhdmUgYSBxdWVzdGlvblwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj9cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1iLTNcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklmIHlvdSBjYW5ub3QgZmluZCBhIHF1ZXN0aW9uIGluIG91ciBGQVEsIHlvdSBjYW4gYWx3YXlzIGNvbnRhY3QgdXMuIFdlIHdpbGwgYW5zd2VyIHRvIHlvdSBzaG9ydGx5IVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIDJcbiAgICAgICAgKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmZhcXMgIT0gXCJcIlxuICAgICAgPyBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJmYXEtY29udGFjdFwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvdyBtdC01IHB0LTc1XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtMTIgdGV4dC1jZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiaDJcIiwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiWW91IHN0aWxsIGhhdmUgYSBxdWVzdGlvblwiKSkgKyBcIj9cIiksXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJtYi0zXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uJHQoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklmIHlvdSBjYW5ub3QgZmluZCBhIHF1ZXN0aW9uIGluIG91ciBGQVEsIHlvdSBjYW4gYWx3YXlzIGNvbnRhY3QgdXMuIFdlIHdpbGwgYW5zd2VyIHRvIHlvdSBzaG9ydGx5IVwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgIF0pLFxuICAgICAgICBdKVxuICAgICAgOiBfdm0uX2UoKSxcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwLXRleHRcIiB9LCBbXG4gICAgICBfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJiaSBiaS1zZWFyY2hcIiB9KSxcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtbGctMyBjb2wtbWQtNCBjb2wtc20tMTJcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgXCJmYXEtbmF2aWdhdGlvbiBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gZmxleC1jb2x1bW4gbWItMiBtYi1tZC0wXCIsXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbWctZmx1aWQgZC1ub25lIGQtbWQtYmxvY2tcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHNyYzogXCJpbWFnZXMvaWxsdXN0cmF0aW9uL2ZhcS1pbGx1c3RyYXRpb25zLnN2Z1wiLFxuICAgICAgICAgICAgICBhbHQ6IFwiZGVtYW5kIGltZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXVxuICAgICAgKSxcbiAgICBdKVxuICB9LFxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwibmFtZXMiOlsicHJvcHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImZhcXMiLCJ3YXRjaCIsIiRyb3V0ZSIsImZyb20iLCJ0byIsIm1ldGhvZHMiLCJnb0JhY2siLCJ3aW5kb3ciLCJmZXRjaENhdGVnb3JpZXMiLCJnZXQiLCJ0aGVuIiwic2VhcmNoIiwicHVzaCIsImVyciIsImxvZ0Vycm9yIiwiY3JlYXRlZCIsIm1vdW50ZWQiLCJkZXN0cm95ZWQiXSwic291cmNlUm9vdCI6IiJ9