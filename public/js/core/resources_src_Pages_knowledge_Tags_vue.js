"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_Pages_knowledge_Tags_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  // component list
  components: {},
  // component data
  data: function data() {
    return {
      articles: [],
      tag: []
    };
  },
  watch: {
    $route: function $route(to) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (to.params.slug != null) {
                  _this.fetchTags();
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
    fetchTags: function fetchTags() {
      var _this2 = this;

      this.$http.get("/user/knowledge/tags/" + (this.$route.params.slug ? this.$route.params.slug + "/" : "") + this.$route.params.id).then(function (response) {
        _this2.articles = response.data.articles, _this2.tag = response.data.tag;
      })["catch"](function (error) {});
    }
  },
  // on component created
  created: function created() {},
  // on component mounted
  mounted: function mounted() {
    this.fetchTags();
  },
  // on component destroyed
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.knowledge-base-bg[data-v-77dc4c10] {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.knowledge-base-bg .kb-search-input .input-group[data-v-77dc4c10]:focus-within {\n    box-shadow: none;\n}\n.kb-search-content-info .kb-search-content .card-img-top[data-v-77dc4c10] {\n    background-color: #fcfcfc;\n}\n.kb-search-content-info .no-result.no-items[data-v-77dc4c10] {\n    display: none;\n}\n.kb-title[data-v-77dc4c10] {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n@media (min-width: 768px) {\n.knowledge-base-bg .kb-search-input .input-group[data-v-77dc4c10] {\n        width: 576px;\n        margin: 0 auto;\n}\n}\n@media (min-width: 992px) {\n.knowledge-base-bg .card-body[data-v-77dc4c10] {\n        padding: 8rem;\n}\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n.knowledge-base-bg .card-body[data-v-77dc4c10] {\n        padding: 6rem;\n}\n}\n", "",{"version":3,"sources":["webpack://./resources/src/Pages/knowledge/Tags.vue"],"names":[],"mappings":";AAiIA;IACA,sBAAA;IACA,sDAAA;AACA;AACA;IACA,gBAAA;AACA;AAEA;IACA,yBAAA;AACA;AACA;IACA,aAAA;AACA;AAEA;IACA,aAAA;IACA,mBAAA;IACA,6BAAA;AACA;AAEA;AACA;QACA,YAAA;QACA,cAAA;AACA;AACA;AACA;AACA;QACA,aAAA;AACA;AACA;AACA;AACA;QACA,aAAA;AACA;AACA","sourcesContent":["<template>\n    <div>\n        <section id=\"knowledge-base-search\">\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <div\n                        class=\"card knowledge-base-bg text-center\"\n                        style=\"\n                            background-image: url('images/banner/banner.png');\n                        \"\n                    >\n                        <div class=\"card-body\">\n                            <h2 class=\"text-primary\">\n                                {{ tag.name ? tag.name : \"...\" }}\n                                ({{ tag.articles_count }})\n                            </h2>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <!--/ Knowledge base Jumbotron -->\n\n        <!-- Knowledge base -->\n        <section id=\"knowledge-base-content\">\n            <div class=\"row kb-search-content-info match-height\">\n                <template v-if=\"articles.data != null\">\n                    <div\n                        class=\"col-md-4 col-sm-6 col-12 kb-search-content\"\n                        v-for=\"(article, index) in articles.data\"\n                        :key=\"index\"\n                    >\n                        <div class=\"card\">\n                            <router-link\n                                :to=\"\n                                    '/knowledge/articles/' +\n                                    article.slug +\n                                    '/' +\n                                    article.id\n                                \"\n                            >\n                                <img\n                                    v-if=\"article.img != null\"\n                                    :src=\"\n                                        '/assets/images/article/' + article.img\n                                    \"\n                                    class=\"card-img-top\"\n                                    alt=\"knowledge-base-image\"\n                                />\n\n                                <div class=\"card-body text-center\">\n                                    <h4>{{ article.title }}</h4>\n                                    <p class=\"text-body mt-1 mb-0\">\n                                        {{ article.short_text }}\n                                    </p>\n                                </div>\n                            </router-link>\n                        </div>\n                    </div>\n                </template>\n\n                <!-- no result -->\n                <div class=\"col-12 text-center no-result no-items\" v-else>\n                    <h4 class=\"mt-4\">{{ $t(\"Search result not found!\") }}</h4>\n                </div>\n            </div>\n        </section>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: [],\n    // component list\n    components: {},\n\n    // component data\n    data() {\n        return {\n            articles: [],\n            tag: [],\n        };\n    },\n\n    watch: {\n        async $route(to) {\n            if (to.params.slug != null) {\n                this.fetchTags();\n            }\n        },\n    },\n    // custom methods\n    methods: {\n        goBack() {\n            window.history.length > 1\n                ? this.$router.go(-1)\n                : this.$router.push(\"/\");\n        },\n        fetchTags() {\n            this.$http\n                .get(\n                    \"/user/knowledge/tags/\" +\n                        (this.$route.params.slug\n                            ? this.$route.params.slug + \"/\"\n                            : \"\") +\n                        this.$route.params.id\n                )\n                .then((response) => {\n                    (this.articles = response.data.articles),\n                        (this.tag = response.data.tag);\n                })\n                .catch((error) => {});\n        },\n    },\n\n    // on component created\n    created() {},\n\n    // on component mounted\n    mounted() {\n        this.fetchTags();\n    },\n\n    // on component destroyed\n    destroyed() {},\n};\n</script>\n\n<style scoped>\n.knowledge-base-bg {\n    background-size: cover;\n    background-color: rgba(115, 103, 240, 0.12) !important;\n}\n.knowledge-base-bg .kb-search-input .input-group:focus-within {\n    box-shadow: none;\n}\n\n.kb-search-content-info .kb-search-content .card-img-top {\n    background-color: #fcfcfc;\n}\n.kb-search-content-info .no-result.no-items {\n    display: none;\n}\n\n.kb-title {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n\n@media (min-width: 768px) {\n    .knowledge-base-bg .kb-search-input .input-group {\n        width: 576px;\n        margin: 0 auto;\n    }\n}\n@media (min-width: 992px) {\n    .knowledge-base-bg .card-body {\n        padding: 8rem;\n    }\n}\n@media (min-width: 768px) and (max-width: 991.98px) {\n    .knowledge-base-bg .card-body {\n        padding: 6rem;\n    }\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_style_index_0_id_77dc4c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_style_index_0_id_77dc4c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_style_index_0_id_77dc4c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/Pages/knowledge/Tags.vue":
/*!************************************************!*\
  !*** ./resources/src/Pages/knowledge/Tags.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=77dc4c10&scoped=true& */ "./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js&");
/* harmony import */ var _Tags_vue_vue_type_style_index_0_id_77dc4c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& */ "./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "77dc4c10",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/Pages/knowledge/Tags.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_65_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_style_index_0_id_77dc4c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-65[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=style&index=0&id=77dc4c10&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_77dc4c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=template&id=77dc4c10&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/Pages/knowledge/Tags.vue?vue&type=template&id=77dc4c10&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    _c("section", { attrs: { id: "knowledge-base-search" } }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12" }, [
          _c(
            "div",
            {
              staticClass: "card knowledge-base-bg text-center",
              staticStyle: {
                "background-image": "url('images/banner/banner.png')",
              },
            },
            [
              _c("div", { staticClass: "card-body" }, [
                _c("h2", { staticClass: "text-primary" }, [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.tag.name ? _vm.tag.name : "...") +
                      "\n                            (" +
                      _vm._s(_vm.tag.articles_count) +
                      ")\n                        "
                  ),
                ]),
              ]),
            ]
          ),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("section", { attrs: { id: "knowledge-base-content" } }, [
      _c(
        "div",
        { staticClass: "row kb-search-content-info match-height" },
        [
          _vm.articles.data != null
            ? _vm._l(_vm.articles.data, function (article, index) {
                return _c(
                  "div",
                  {
                    key: index,
                    staticClass: "col-md-4 col-sm-6 col-12 kb-search-content",
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "card" },
                      [
                        _c(
                          "router-link",
                          {
                            attrs: {
                              to:
                                "/knowledge/articles/" +
                                article.slug +
                                "/" +
                                article.id,
                            },
                          },
                          [
                            article.img != null
                              ? _c("img", {
                                  staticClass: "card-img-top",
                                  attrs: {
                                    src:
                                      "/assets/images/article/" + article.img,
                                    alt: "knowledge-base-image",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "card-body text-center" },
                              [
                                _c("h4", [_vm._v(_vm._s(article.title))]),
                                _vm._v(" "),
                                _c(
                                  "p",
                                  { staticClass: "text-body mt-1 mb-0" },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(article.short_text) +
                                        "\n                                "
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]
                )
              })
            : _c(
                "div",
                { staticClass: "col-12 text-center no-result no-items" },
                [
                  _c("h4", { staticClass: "mt-4" }, [
                    _vm._v(_vm._s(_vm.$t("Search result not found!"))),
                  ]),
                ]
              ),
        ],
        2
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX1BhZ2VzX2tub3dsZWRnZV9UYWdzX3Z1ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUVBLGlFQUFlO0VBQ2ZBLFNBREE7RUFFQTtFQUNBQyxjQUhBO0VBS0E7RUFDQUMsSUFOQSxrQkFNQTtJQUNBO01BQ0FDLFlBREE7TUFFQUM7SUFGQTtFQUlBLENBWEE7RUFhQUM7SUFDQUMsTUFEQSxrQkFDQUMsRUFEQSxFQUNBO01BQUE7O01BQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFDQTtrQkFDQTtnQkFDQTs7Y0FIQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUE7SUFJQTtFQUxBLENBYkE7RUFvQkE7RUFDQUM7SUFDQUMsTUFEQSxvQkFDQTtNQUNBQyw0QkFDQSxtQkFEQSxHQUVBLHNCQUZBO0lBR0EsQ0FMQTtJQU1BQyxTQU5BLHVCQU1BO01BQUE7O01BQ0EsV0FDQUMsR0FEQSxDQUVBLDJCQUNBLDBCQUNBLDZCQURBLEdBRUEsRUFIQSxJQUlBLHFCQU5BLEVBUUFDLElBUkEsQ0FRQTtRQUNBLDBDQUNBLDhCQURBO01BRUEsQ0FYQSxXQVlBLG1CQVpBO0lBYUE7RUFwQkEsQ0FyQkE7RUE0Q0E7RUFDQUMsT0E3Q0EscUJBNkNBLEVBN0NBO0VBK0NBO0VBQ0FDLE9BaERBLHFCQWdEQTtJQUNBO0VBQ0EsQ0FsREE7RUFvREE7RUFDQUMsU0FyREEsdUJBcURBO0FBckRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFDd0o7QUFDN0I7QUFDM0gsOEJBQThCLDRHQUEyQixDQUFDLGlJQUFxQztBQUMvRjtBQUNBLGlGQUFpRiw2QkFBNkIsNkRBQTZELEdBQUcsa0ZBQWtGLHVCQUF1QixHQUFHLDZFQUE2RSxnQ0FBZ0MsR0FBRyxnRUFBZ0Usb0JBQW9CLEdBQUcsOEJBQThCLG9CQUFvQiwwQkFBMEIsb0NBQW9DLEdBQUcsNkJBQTZCLHFFQUFxRSx1QkFBdUIseUJBQXlCLEdBQUcsR0FBRyw2QkFBNkIsa0RBQWtELHdCQUF3QixHQUFHLEdBQUcsdURBQXVELGtEQUFrRCx3QkFBd0IsR0FBRyxHQUFHLFNBQVMscUdBQXFHLE1BQU0sV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLEtBQUssVUFBVSxLQUFLLHlYQUF5WCxvTUFBb00sZ0NBQWdDLHNDQUFzQyxxQkFBcUIsa2tEQUFra0QsZ0JBQWdCLHlIQUF5SCxxQkFBcUIsdVhBQXVYLG1DQUFtQyw0SEFBNEgsMkRBQTJELHdDQUF3QyxrQkFBa0IsNkRBQTZELE9BQU8saUJBQWlCLDRCQUE0QiwyQ0FBMkMsbUNBQW1DLGVBQWUsV0FBVyxRQUFRLHdDQUF3QyxvQkFBb0IsMkhBQTJILFdBQVcsd0JBQXdCLGlXQUFpVyx3SEFBd0gsbUJBQW1CLHVDQUF1QyxFQUFFLFdBQVcsUUFBUSxrREFBa0QsaURBQWlELDJCQUEyQixPQUFPLHNEQUFzRCxLQUFLLG1EQUFtRCw2QkFBNkIsNkRBQTZELEdBQUcsaUVBQWlFLHVCQUF1QixHQUFHLDhEQUE4RCxnQ0FBZ0MsR0FBRywrQ0FBK0Msb0JBQW9CLEdBQUcsZUFBZSxvQkFBb0IsMEJBQTBCLG9DQUFvQyxHQUFHLCtCQUErQix3REFBd0QsdUJBQXVCLHlCQUF5QixPQUFPLEdBQUcsNkJBQTZCLHFDQUFxQyx3QkFBd0IsT0FBTyxHQUFHLHVEQUF1RCxxQ0FBcUMsd0JBQXdCLE9BQU8sR0FBRywrQkFBK0I7QUFDcDJNO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1AyRDtBQUNsRyxZQUF1Yjs7QUFFdmI7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsZ1lBQU87Ozs7QUFJeEIsaUVBQWUsdVlBQWMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWjREO0FBQ3ZDO0FBQ0w7QUFDbkQsQ0FBd0Y7OztBQUd4RjtBQUNnRztBQUNoRyxnQkFBZ0IsdUdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsd0ZBQU07QUFDUixFQUFFLGlHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdkNxTSxDQUFDLGlFQUFlLHlNQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUdBeE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLCtCQUErQjtBQUM1RCxrQkFBa0Isb0JBQW9CO0FBQ3RDLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBLDBCQUEwQiwwQkFBMEI7QUFDcEQsMkJBQTJCLDZCQUE2QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUyxnQ0FBZ0M7QUFDN0Q7QUFDQTtBQUNBLFVBQVUsd0RBQXdEO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0NBQXNDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msb0NBQW9DO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGtCQUFrQixzREFBc0Q7QUFDeEU7QUFDQSw2QkFBNkIscUJBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9UYWdzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9UYWdzLnZ1ZT9mOGIyIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL1RhZ3MudnVlP2I1ZTciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvVGFncy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvVGFncy52dWU/MmJiNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9UYWdzLnZ1ZT82YmUwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL1RhZ3MudnVlP2Q1MzIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9QYWdlcy9rbm93bGVkZ2UvVGFncy52dWU/MGVmOCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJrbm93bGVkZ2UtYmFzZS1zZWFyY2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FyZCBrbm93bGVkZ2UtYmFzZS1iZyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL2Jhbm5lci9iYW5uZXIucG5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHRhZy5uYW1lID8gdGFnLm5hbWUgOiBcIi4uLlwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7eyB0YWcuYXJ0aWNsZXNfY291bnQgfX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwhLS0vIEtub3dsZWRnZSBiYXNlIEp1bWJvdHJvbiAtLT5cblxuICAgICAgICA8IS0tIEtub3dsZWRnZSBiYXNlIC0tPlxuICAgICAgICA8c2VjdGlvbiBpZD1cImtub3dsZWRnZS1iYXNlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cga2Itc2VhcmNoLWNvbnRlbnQtaW5mbyBtYXRjaC1oZWlnaHRcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cImFydGljbGVzLmRhdGEgIT0gbnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNvbC1tZC00IGNvbC1zbS02IGNvbC0xMiBrYi1zZWFyY2gtY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihhcnRpY2xlLCBpbmRleCkgaW4gYXJ0aWNsZXMuZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG89XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcva25vd2xlZGdlL2FydGljbGVzLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZS5zbHVnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiYXJ0aWNsZS5pbWcgIT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9hc3NldHMvaW1hZ2VzL2FydGljbGUvJyArIGFydGljbGUuaW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLWltZy10b3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwia25vd2xlZGdlLWJhc2UtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57eyBhcnRpY2xlLnRpdGxlIH19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1ib2R5IG10LTEgbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGFydGljbGUuc2hvcnRfdGV4dCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8IS0tIG5vIHJlc3VsdCAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHRleHQtY2VudGVyIG5vLXJlc3VsdCBuby1pdGVtc1wiIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibXQtNFwiPnt7ICR0KFwiU2VhcmNoIHJlc3VsdCBub3QgZm91bmQhXCIpIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbXSxcbiAgICAvLyBjb21wb25lbnQgbGlzdFxuICAgIGNvbXBvbmVudHM6IHt9LFxuXG4gICAgLy8gY29tcG9uZW50IGRhdGFcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXJ0aWNsZXM6IFtdLFxuICAgICAgICAgICAgdGFnOiBbXSxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgYXN5bmMgJHJvdXRlKHRvKSB7XG4gICAgICAgICAgICBpZiAodG8ucGFyYW1zLnNsdWcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hUYWdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBjdXN0b20gbWV0aG9kc1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZ29CYWNrKCkge1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgID8gdGhpcy4kcm91dGVyLmdvKC0xKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kcm91dGVyLnB1c2goXCIvXCIpO1xuICAgICAgICB9LFxuICAgICAgICBmZXRjaFRhZ3MoKSB7XG4gICAgICAgICAgICB0aGlzLiRodHRwXG4gICAgICAgICAgICAgICAgLmdldChcbiAgICAgICAgICAgICAgICAgICAgXCIvdXNlci9rbm93bGVkZ2UvdGFncy9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy4kcm91dGUucGFyYW1zLnNsdWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuJHJvdXRlLnBhcmFtcy5zbHVnICsgXCIvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlLnBhcmFtcy5pZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmFydGljbGVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnRhZyA9IHJlc3BvbnNlLmRhdGEudGFnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IGNyZWF0ZWRcbiAgICBjcmVhdGVkKCkge30sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgbW91bnRlZFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hUYWdzKCk7XG4gICAgfSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBkZXN0cm95ZWRcbiAgICBkZXN0cm95ZWQoKSB7fSxcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5rbm93bGVkZ2UtYmFzZS1iZyB7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTAzLCAyNDAsIDAuMTIpICFpbXBvcnRhbnQ7XG59XG4ua25vd2xlZGdlLWJhc2UtYmcgLmtiLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXA6Zm9jdXMtd2l0aGluIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xufVxuXG4ua2Itc2VhcmNoLWNvbnRlbnQtaW5mbyAua2Itc2VhcmNoLWNvbnRlbnQgLmNhcmQtaW1nLXRvcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcbn1cbi5rYi1zZWFyY2gtY29udGVudC1pbmZvIC5uby1yZXN1bHQubm8taXRlbXMge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5rYi10aXRsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAua25vd2xlZGdlLWJhc2UtYmcgLmtiLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXAge1xuICAgICAgICB3aWR0aDogNTc2cHg7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAgIC5rbm93bGVkZ2UtYmFzZS1iZyAuY2FyZC1ib2R5IHtcbiAgICAgICAgcGFkZGluZzogOHJlbTtcbiAgICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuICAgIC5rbm93bGVkZ2UtYmFzZS1iZyAuY2FyZC1ib2R5IHtcbiAgICAgICAgcGFkZGluZzogNnJlbTtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sYXJhdmVsLW1peC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5rbm93bGVkZ2UtYmFzZS1iZ1tkYXRhLXYtNzdkYzRjMTBdIHtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTUsIDEwMywgMjQwLCAwLjEyKSAhaW1wb3J0YW50O1xcbn1cXG4ua25vd2xlZGdlLWJhc2UtYmcgLmtiLXNlYXJjaC1pbnB1dCAuaW5wdXQtZ3JvdXBbZGF0YS12LTc3ZGM0YzEwXTpmb2N1cy13aXRoaW4ge1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG4ua2Itc2VhcmNoLWNvbnRlbnQtaW5mbyAua2Itc2VhcmNoLWNvbnRlbnQgLmNhcmQtaW1nLXRvcFtkYXRhLXYtNzdkYzRjMTBdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcXG59XFxuLmtiLXNlYXJjaC1jb250ZW50LWluZm8gLm5vLXJlc3VsdC5uby1pdGVtc1tkYXRhLXYtNzdkYzRjMTBdIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuLmtiLXRpdGxlW2RhdGEtdi03N2RjNGMxMF0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuLmtub3dsZWRnZS1iYXNlLWJnIC5rYi1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwW2RhdGEtdi03N2RjNGMxMF0ge1xcbiAgICAgICAgd2lkdGg6IDU3NnB4O1xcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XFxufVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcXG4ua25vd2xlZGdlLWJhc2UtYmcgLmNhcmQtYm9keVtkYXRhLXYtNzdkYzRjMTBdIHtcXG4gICAgICAgIHBhZGRpbmc6IDhyZW07XFxufVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTEuOThweCkge1xcbi5rbm93bGVkZ2UtYmFzZS1iZyAuY2FyZC1ib2R5W2RhdGEtdi03N2RjNGMxMF0ge1xcbiAgICAgICAgcGFkZGluZzogNnJlbTtcXG59XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3Jlc291cmNlcy9zcmMvUGFnZXMva25vd2xlZGdlL1RhZ3MudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFpSUE7SUFDQSxzQkFBQTtJQUNBLHNEQUFBO0FBQ0E7QUFDQTtJQUNBLGdCQUFBO0FBQ0E7QUFFQTtJQUNBLHlCQUFBO0FBQ0E7QUFDQTtJQUNBLGFBQUE7QUFDQTtBQUVBO0lBQ0EsYUFBQTtJQUNBLG1CQUFBO0lBQ0EsNkJBQUE7QUFDQTtBQUVBO0FBQ0E7UUFDQSxZQUFBO1FBQ0EsY0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FBQ0EsYUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1FBQ0EsYUFBQTtBQUNBO0FBQ0FcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgICA8ZGl2PlxcbiAgICAgICAgPHNlY3Rpb24gaWQ9XFxcImtub3dsZWRnZS1iYXNlLXNlYXJjaFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiY2FyZCBrbm93bGVkZ2UtYmFzZS1iZyB0ZXh0LWNlbnRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL2Jhbm5lci9iYW5uZXIucG5nJyk7XFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtYm9keVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwidGV4dC1wcmltYXJ5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHRhZy5uYW1lID8gdGFnLm5hbWUgOiBcXFwiLi4uXFxcIiB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHt7IHRhZy5hcnRpY2xlc19jb3VudCB9fSlcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgIDwhLS0vIEtub3dsZWRnZSBiYXNlIEp1bWJvdHJvbiAtLT5cXG5cXG4gICAgICAgIDwhLS0gS25vd2xlZGdlIGJhc2UgLS0+XFxuICAgICAgICA8c2VjdGlvbiBpZD1cXFwia25vd2xlZGdlLWJhc2UtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IGtiLXNlYXJjaC1jb250ZW50LWluZm8gbWF0Y2gtaGVpZ2h0XFxcIj5cXG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XFxcImFydGljbGVzLmRhdGEgIT0gbnVsbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImNvbC1tZC00IGNvbC1zbS02IGNvbC0xMiBrYi1zZWFyY2gtY29udGVudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cXFwiKGFydGljbGUsIGluZGV4KSBpbiBhcnRpY2xlcy5kYXRhXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XFxcImluZGV4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0bz1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9rbm93bGVkZ2UvYXJ0aWNsZXMvJyArXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZS5zbHVnICtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLycgK1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGljbGUuaWRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcImFydGljbGUuaW1nICE9IG51bGxcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvYXNzZXRzL2ltYWdlcy9hcnRpY2xlLycgKyBhcnRpY2xlLmltZ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiY2FyZC1pbWctdG9wXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cXFwia25vd2xlZGdlLWJhc2UtaW1hZ2VcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1ib2R5IHRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3sgYXJ0aWNsZS50aXRsZSB9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInRleHQtYm9keSBtdC0xIG1iLTBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBhcnRpY2xlLnNob3J0X3RleHQgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcblxcbiAgICAgICAgICAgICAgICA8IS0tIG5vIHJlc3VsdCAtLT5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIHRleHQtY2VudGVyIG5vLXJlc3VsdCBuby1pdGVtc1xcXCIgdi1lbHNlPlxcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVxcXCJtdC00XFxcIj57eyAkdChcXFwiU2VhcmNoIHJlc3VsdCBub3QgZm91bmQhXFxcIikgfX08L2g0PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvc2VjdGlvbj5cXG4gICAgPC9kaXY+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gICAgcHJvcHM6IFtdLFxcbiAgICAvLyBjb21wb25lbnQgbGlzdFxcbiAgICBjb21wb25lbnRzOiB7fSxcXG5cXG4gICAgLy8gY29tcG9uZW50IGRhdGFcXG4gICAgZGF0YSgpIHtcXG4gICAgICAgIHJldHVybiB7XFxuICAgICAgICAgICAgYXJ0aWNsZXM6IFtdLFxcbiAgICAgICAgICAgIHRhZzogW10sXFxuICAgICAgICB9O1xcbiAgICB9LFxcblxcbiAgICB3YXRjaDoge1xcbiAgICAgICAgYXN5bmMgJHJvdXRlKHRvKSB7XFxuICAgICAgICAgICAgaWYgKHRvLnBhcmFtcy5zbHVnICE9IG51bGwpIHtcXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFRhZ3MoKTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9LFxcbiAgICB9LFxcbiAgICAvLyBjdXN0b20gbWV0aG9kc1xcbiAgICBtZXRob2RzOiB7XFxuICAgICAgICBnb0JhY2soKSB7XFxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMVxcbiAgICAgICAgICAgICAgICA/IHRoaXMuJHJvdXRlci5nbygtMSlcXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRyb3V0ZXIucHVzaChcXFwiL1xcXCIpO1xcbiAgICAgICAgfSxcXG4gICAgICAgIGZldGNoVGFncygpIHtcXG4gICAgICAgICAgICB0aGlzLiRodHRwXFxuICAgICAgICAgICAgICAgIC5nZXQoXFxuICAgICAgICAgICAgICAgICAgICBcXFwiL3VzZXIva25vd2xlZGdlL3RhZ3MvXFxcIiArXFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuJHJvdXRlLnBhcmFtcy5zbHVnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy4kcm91dGUucGFyYW1zLnNsdWcgKyBcXFwiL1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcXFwiXFxcIikgK1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlLnBhcmFtcy5pZFxcbiAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYXJ0aWNsZXMgPSByZXNwb25zZS5kYXRhLmFydGljbGVzKSxcXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy50YWcgPSByZXNwb25zZS5kYXRhLnRhZyk7XFxuICAgICAgICAgICAgICAgIH0pXFxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcXG4gICAgICAgIH0sXFxuICAgIH0sXFxuXFxuICAgIC8vIG9uIGNvbXBvbmVudCBjcmVhdGVkXFxuICAgIGNyZWF0ZWQoKSB7fSxcXG5cXG4gICAgLy8gb24gY29tcG9uZW50IG1vdW50ZWRcXG4gICAgbW91bnRlZCgpIHtcXG4gICAgICAgIHRoaXMuZmV0Y2hUYWdzKCk7XFxuICAgIH0sXFxuXFxuICAgIC8vIG9uIGNvbXBvbmVudCBkZXN0cm95ZWRcXG4gICAgZGVzdHJveWVkKCkge30sXFxufTtcXG48L3NjcmlwdD5cXG5cXG48c3R5bGUgc2NvcGVkPlxcbi5rbm93bGVkZ2UtYmFzZS1iZyB7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE1LCAxMDMsIDI0MCwgMC4xMikgIWltcG9ydGFudDtcXG59XFxuLmtub3dsZWRnZS1iYXNlLWJnIC5rYi1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwOmZvY3VzLXdpdGhpbiB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5rYi1zZWFyY2gtY29udGVudC1pbmZvIC5rYi1zZWFyY2gtY29udGVudCAuY2FyZC1pbWctdG9wIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcXG59XFxuLmtiLXNlYXJjaC1jb250ZW50LWluZm8gLm5vLXJlc3VsdC5uby1pdGVtcyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5rYi10aXRsZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gICAgLmtub3dsZWRnZS1iYXNlLWJnIC5rYi1zZWFyY2gtaW5wdXQgLmlucHV0LWdyb3VwIHtcXG4gICAgICAgIHdpZHRoOiA1NzZweDtcXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcbiAgICAua25vd2xlZGdlLWJhc2UtYmcgLmNhcmQtYm9keSB7XFxuICAgICAgICBwYWRkaW5nOiA4cmVtO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XFxuICAgIC5rbm93bGVkZ2UtYmFzZS1iZyAuY2FyZC1ib2R5IHtcXG4gICAgICAgIHBhZGRpbmc6IDZyZW07XFxuICAgIH1cXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xhcmF2ZWwtbWl4L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTY1WzBdLnJ1bGVzWzBdLnVzZVsyXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhZ3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzdkYzRjMTAmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9UYWdzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03N2RjNGMxMCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9UYWdzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVGFncy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vVGFncy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03N2RjNGMxMCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNzdkYzRjMTBcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzdkYzRjMTAnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzdkYzRjMTAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzdkYzRjMTAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1RhZ3MudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc3ZGM0YzEwJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzc3ZGM0YzEwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvc3JjL1BhZ2VzL2tub3dsZWRnZS9UYWdzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWdzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC01WzBdLnJ1bGVzWzBdLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1RhZ3MudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1taXgvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNjVbMF0ucnVsZXNbMF0udXNlWzFdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNjVbMF0ucnVsZXNbMF0udXNlWzJdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVGFncy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03N2RjNGMxMCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9UYWdzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03N2RjNGMxMCZzY29wZWQ9dHJ1ZSZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICBfYyhcInNlY3Rpb25cIiwgeyBhdHRyczogeyBpZDogXCJrbm93bGVkZ2UtYmFzZS1zZWFyY2hcIiB9IH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC0xMlwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmQga25vd2xlZGdlLWJhc2UtYmcgdGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtaW1hZ2VcIjogXCJ1cmwoJ2ltYWdlcy9iYW5uZXIvYmFubmVyLnBuZycpXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1wcmltYXJ5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS50YWcubmFtZSA/IF92bS50YWcubmFtZSA6IFwiLi4uXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0udGFnLmFydGljbGVzX2NvdW50KSArXG4gICAgICAgICAgICAgICAgICAgICAgXCIpXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgIF0pLFxuICAgICAgXSksXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcInNlY3Rpb25cIiwgeyBhdHRyczogeyBpZDogXCJrbm93bGVkZ2UtYmFzZS1jb250ZW50XCIgfSB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJyb3cga2Itc2VhcmNoLWNvbnRlbnQtaW5mbyBtYXRjaC1oZWlnaHRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLmFydGljbGVzLmRhdGEgIT0gbnVsbFxuICAgICAgICAgICAgPyBfdm0uX2woX3ZtLmFydGljbGVzLmRhdGEsIGZ1bmN0aW9uIChhcnRpY2xlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbC1tZC00IGNvbC1zbS02IGNvbC0xMiBrYi1zZWFyY2gtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL2tub3dsZWRnZS9hcnRpY2xlcy9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGljbGUuc2x1ZyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZS5pbWcgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZC1pbWctdG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIvYXNzZXRzL2ltYWdlcy9hcnRpY2xlL1wiICsgYXJ0aWNsZS5pbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IFwia25vd2xlZGdlLWJhc2UtaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5IHRleHQtY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoNFwiLCBbX3ZtLl92KF92bS5fcyhhcnRpY2xlLnRpdGxlKSldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWJvZHkgbXQtMSBtYi0wXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhhcnRpY2xlLnNob3J0X3RleHQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLTEyIHRleHQtY2VudGVyIG5vLXJlc3VsdCBuby1pdGVtc1wiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJoNFwiLCB7IHN0YXRpY0NsYXNzOiBcIm10LTRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiU2VhcmNoIHJlc3VsdCBub3QgZm91bmQhXCIpKSksXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgIF0sXG4gICAgICAgIDJcbiAgICAgICksXG4gICAgXSksXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sIm5hbWVzIjpbInByb3BzIiwiY29tcG9uZW50cyIsImRhdGEiLCJhcnRpY2xlcyIsInRhZyIsIndhdGNoIiwiJHJvdXRlIiwidG8iLCJtZXRob2RzIiwiZ29CYWNrIiwid2luZG93IiwiZmV0Y2hUYWdzIiwiZ2V0IiwidGhlbiIsImNyZWF0ZWQiLCJtb3VudGVkIiwiZGVzdHJveWVkIl0sInNvdXJjZVJvb3QiOiIifQ==