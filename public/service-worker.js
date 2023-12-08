/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-4610d9bf'], (function (workbox) { 'use strict';

  self.skipWaiting();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "/js/core/app-menu.js",
    "revision": "739ee5ffaf714d23f357d320ea0b195c"
  }, {
    "url": "/js/core/app.js",
    "revision": "5b4a501c9b4d6a75c1c6a15a98ef2f09"
  }, {
    "url": "/js/core/scripts.js",
    "revision": "99df4125bf62980c140b09703a9f0ab6"
  }, {
    "url": "/js/frontend/manifest.js",
    "revision": "828f256b98199237e737e71dfd71205d"
  }, {
    "url": "css/base/core/colors/palette-gradient.css",
    "revision": "3a156ecdd79fe4df07d0b0e31af0e340"
  }, {
    "url": "css/base/core/colors/palette-noui.css",
    "revision": "cb81890f6716d65bdf9d16e3aecd0c6f"
  }, {
    "url": "css/base/core/colors/palette-variables.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "css/base/core/menu/menu-types/horizontal-menu.css",
    "revision": "07cc302abb81abdc6eeff0c949578cd5"
  }, {
    "url": "css/base/core/menu/menu-types/vertical-menu.css",
    "revision": "19f9581466e4b022f93807eac7066ee4"
  }, {
    "url": "css/base/core/menu/menu-types/vertical-overlay-menu.css",
    "revision": "9b732a5fd845c0ca8ffdd308543ccd89"
  }, {
    "url": "css/base/core/mixins/alert.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "css/base/core/mixins/hex2rgb.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "css/base/core/mixins/main-menu-mixin.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "css/base/core/mixins/transitions.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "css/base/pages/app-calendar.css",
    "revision": "3d1ef944b86b737b47a8a241f431df98"
  }, {
    "url": "css/base/pages/app-chat-list.css",
    "revision": "98b7dec84b4152ed15822161f64d45d3"
  }, {
    "url": "css/base/pages/app-chat.css",
    "revision": "4d9a782066e64d0baf1b2c9f21530852"
  }, {
    "url": "css/base/pages/app-ecommerce-details.css",
    "revision": "f9d5b45371b6e5f4fa8dc13c2dce069f"
  }, {
    "url": "css/base/pages/app-ecommerce.css",
    "revision": "8bb6b4fccfbe120bb858da69550905f8"
  }, {
    "url": "css/base/pages/app-email.css",
    "revision": "491e6b819b594792b345c166cafea42b"
  }, {
    "url": "css/base/pages/app-file-manager.css",
    "revision": "562a4e75c5681833bc38066673a7d287"
  }, {
    "url": "css/base/pages/app-invoice-list.css",
    "revision": "100a727835e3fae701fe87d270008c8a"
  }, {
    "url": "css/base/pages/app-invoice-print.css",
    "revision": "672aca0d54e42aed268b6ad5b92cb52c"
  }, {
    "url": "css/base/pages/app-invoice.css",
    "revision": "2ca25f4f12bcf698bcc77d0966e96cf0"
  }, {
    "url": "css/base/pages/app-kanban.css",
    "revision": "b779a3a86b35b9376791f85c67399fb4"
  }, {
    "url": "css/base/pages/app-todo.css",
    "revision": "9817e2a029f13b2b89e85ba7941a117f"
  }, {
    "url": "css/base/pages/authentication.css",
    "revision": "617fd63ba7b1ca2d9490a9dcbf873a5e"
  }, {
    "url": "css/base/pages/dashboard-ecommerce.css",
    "revision": "8e1353a745e31512f0d9deede0b77396"
  }, {
    "url": "css/base/pages/modal-create-app.css",
    "revision": "b4ee8bc1e587dc7c6727208ccfbe6ad3"
  }, {
    "url": "css/base/pages/page-blog.css",
    "revision": "6a7b4f2592ef15018bfc24fc61a46741"
  }, {
    "url": "css/base/pages/page-coming-soon.css",
    "revision": "b2928901328ab4b3a7b99a420a796c8c"
  }, {
    "url": "css/base/pages/page-faq.css",
    "revision": "a8a8e12d7e788c34f4772d60ff824a40"
  }, {
    "url": "css/base/pages/page-knowledge-base.css",
    "revision": "c540947c5a3b44eb953a131e6a9cb422"
  }, {
    "url": "css/base/pages/page-misc.css",
    "revision": "560310296bd2b009c86b62bbb48141f2"
  }, {
    "url": "css/base/pages/page-pricing.css",
    "revision": "73e137ddb175c6ee406915ca6e0387e2"
  }, {
    "url": "css/base/pages/page-profile.css",
    "revision": "6f44ffb7a5a339fca1d6959b9e32bf65"
  }, {
    "url": "css/base/pages/ui-feather.css",
    "revision": "cf47589c6c6f4d46181c7c1cd322f5bf"
  }, {
    "url": "css/base/plugins/charts/chart-apex.css",
    "revision": "a23626e6d1fed43df0a1689e952a1134"
  }, {
    "url": "css/base/plugins/extensions/ext-component-context-menu.css",
    "revision": "1742b830b5dfcc00c07560575754c02f"
  }, {
    "url": "css/base/plugins/extensions/ext-component-drag-drop.css",
    "revision": "362096ef88b7404eaa8e412a8c5f050a"
  }, {
    "url": "css/base/plugins/extensions/ext-component-media-player.css",
    "revision": "47662d3a19ee4a6c0b479bebbdb0e279"
  }, {
    "url": "css/base/plugins/extensions/ext-component-ratings.css",
    "revision": "4a77a0e7009eb5f7920beb7d4c4e021d"
  }, {
    "url": "css/base/plugins/extensions/ext-component-sliders.css",
    "revision": "9c8850e3b7d8c48ec7e57b70547ced1e"
  }, {
    "url": "css/base/plugins/extensions/ext-component-sweet-alerts.css",
    "revision": "2ca3a8b54892a0320ad28b2798d2c38d"
  }, {
    "url": "css/base/plugins/extensions/ext-component-swiper.css",
    "revision": "7a01c48b236bdf95276be6f7339dd9a9"
  }, {
    "url": "css/base/plugins/extensions/ext-component-toastr.css",
    "revision": "40f839c6d71121386dbd1bfbc463c4a4"
  }, {
    "url": "css/base/plugins/extensions/ext-component-tour.css",
    "revision": "4ebec5bec76cc0d3bd1ab59dd32e385e"
  }, {
    "url": "css/base/plugins/extensions/ext-component-tree.css",
    "revision": "1348c8506676fbe25614e8224ed32da8"
  }, {
    "url": "css/base/plugins/forms/form-file-uploader.css",
    "revision": "2ec385d8ef377b3264bc561adde5b42a"
  }, {
    "url": "css/base/plugins/forms/form-number-input.css",
    "revision": "4112b3057135bbc46105c007eefce2de"
  }, {
    "url": "css/base/plugins/forms/form-quill-editor.css",
    "revision": "8202cf02587ed3a31f618e24224478b1"
  }, {
    "url": "css/base/plugins/forms/form-validation.css",
    "revision": "b5c5846a944e1d5357466a5269c9280a"
  }, {
    "url": "css/base/plugins/forms/form-wizard.css",
    "revision": "479b757da7bffa8746a48e2c37690a2a"
  }, {
    "url": "css/base/plugins/forms/pickers/form-flat-pickr.css",
    "revision": "69fe9eb7e3d44b22960fddbb97e4891e"
  }, {
    "url": "css/base/plugins/forms/pickers/form-pickadate.css",
    "revision": "bb37412d3b19d1c07b72b8a0509e43a2"
  }, {
    "url": "css/base/plugins/maps/map-leaflet.css",
    "revision": "c477fad84ab794628633d42e8be75939"
  }, {
    "url": "css/base/plugins/ui/coming-soon.css",
    "revision": "b301305fcec042c4bfc22b6f644b9324"
  }, {
    "url": "css/base/themes/dark-layout.css",
    "revision": "c6f093f679c1a9b6c1c15e175282d415"
  }, {
    "url": "css/core.css",
    "revision": "05bb4ed6bcc1d5bad5405572f22140a3"
  }, {
    "url": "css/overrides.css",
    "revision": "02bb11550b320b1a152a5dc8ad0e1fa4"
  }, {
    "url": "css/style.css",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "js/core/resources_src_Pages_Dashboard_vue.js",
    "revision": "91e9786d78e71cbc5b92d02794e73847"
  }, {
    "url": "js/core/resources_src_Pages_Forex_Forex_vue.js",
    "revision": "66c7a4836c01a61072545fae64b8999f"
  }, {
    "url": "js/core/resources_src_Pages_Forex_Trading_vue.js",
    "revision": "b74f613fdc2fc3345c374285898ba319"
  }, {
    "url": "js/core/resources_src_Pages_Market_vue.js",
    "revision": "ed14295ada4aa46f229059ef040a526e"
  }, {
    "url": "js/core/resources_src_Pages_Network_vue.js",
    "revision": "43e92a35771f145707576cf520ae59b6"
  }, {
    "url": "js/core/resources_src_Pages_News_vue.js",
    "revision": "9ca8ed4c06abfc2ac9dbe027c02b376b"
  }, {
    "url": "js/core/resources_src_Pages_Swap_vue.js",
    "revision": "7ecf045ca16a97cef4f85e617e44379a"
  }, {
    "url": "js/core/resources_src_Pages_Wallets_vue.js",
    "revision": "f1c6105d18ad427e1be23b7897112cc1"
  }, {
    "url": "js/core/resources_src_Pages_binary_Binary_vue.js",
    "revision": "a97ef6a3a9aabe66b1ff57f0eac53e49"
  }, {
    "url": "js/core/resources_src_Pages_binary_logs_Practice_vue.js",
    "revision": "9ee0495739ff1f02af53d13765f51598"
  }, {
    "url": "js/core/resources_src_Pages_binary_logs_Preview_vue.js",
    "revision": "2bc0bf6225f1d529953c82420e653143"
  }, {
    "url": "js/core/resources_src_Pages_binary_logs_Trade_vue.js",
    "revision": "ad2aa5c4dc3048c78da166d9223031f7"
  }, {
    "url": "js/core/resources_src_Pages_bot_Bots_vue.js",
    "revision": "89a81e7ad8e4ca37fe6cae8ca168325a"
  }, {
    "url": "js/core/resources_src_Pages_builder_PageBuilder_vue.js",
    "revision": "5c312a06cea983f9c1f3eb414a9f9f84"
  }, {
    "url": "js/core/resources_src_Pages_ico_ICODetails_vue.js",
    "revision": "672d8c6f1df784e0590a0ac8baae1236"
  }, {
    "url": "js/core/resources_src_Pages_ico_ICO_vue.js",
    "revision": "69dbc97c45d2894178012c520477e2bc"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_Article_vue.js",
    "revision": "c4bc451a6f784284b7ec4979de9f34a6"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_Categories_vue.js",
    "revision": "155c9bef8473065fb16b785de505bf4d"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_FaqSearch_vue.js",
    "revision": "8578b78da31f3471584e61f0fe2cf40f"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_Faq_vue.js",
    "revision": "8047d4ce565ddaf6ac8bd67163a35daf"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_Index_vue.js",
    "revision": "f58bf476d8b83855c1fbdec2df9aadc9"
  }, {
    "url": "js/core/resources_src_Pages_knowledge_Tags_vue.js",
    "revision": "518a7ec549b01296058dd6eb5fc59f5f"
  }, {
    "url": "js/core/resources_src_Pages_logs_Deposit_vue.js",
    "revision": "13cc10eb9fa7402eecb9f97819061c65"
  }, {
    "url": "js/core/resources_src_Pages_logs_Transactions_vue.js",
    "revision": "ed49d4d9bd58ccf73718f68f3ba5e436"
  }, {
    "url": "js/core/resources_src_Pages_logs_Withdraw_vue.js",
    "revision": "e29318ae3546a73fcc86da7808660037"
  }, {
    "url": "js/core/resources_src_Pages_p2p_p2p_vue.js",
    "revision": "a90998e35d47b8e003081daed1f5bcb6"
  }, {
    "url": "js/core/resources_src_Pages_staking_StakingLogs_vue.js",
    "revision": "eab9d0789265a1061e62dc800191fb54"
  }, {
    "url": "js/core/resources_src_Pages_staking_Staking_vue.js",
    "revision": "4926fe44ead5149714cf5268eebcf1f2"
  }, {
    "url": "js/core/resources_src_components_wallets_MainWalletDetail_vue.js",
    "revision": "6ecd6c37020cf2c61903815dc2bed775"
  }, {
    "url": "js/core/resources_src_components_wallets_WalletDetail_vue.js",
    "revision": "6efbd5a88bcaa08b7031138103c36723"
  }], {});
  workbox.registerRoute(/\.(?:png|jpg|jpeg|svg|js|css|woff2)$/, new workbox.CacheFirst({
    "cacheName": "images",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=service-worker.js.map
