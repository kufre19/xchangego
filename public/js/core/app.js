/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/js/core/app.js ***!
  \**********************************/
/*=========================================================================================
  File Name: app.js
  Description: Template related app JS.
  ----------------------------------------------------------------------------------------
  Item Name: Bicrypto - Crypto Trading Platform
  Author: MashDiv
  Author URL: hhttp://www.themeforest.net/user/mashdiv
==========================================================================================*/
window.colors = {
  solid: {
    primary: "#7367F0",
    secondary: "#82868b",
    success: "#28C76F",
    info: "#00cfe8",
    warning: "#FF9F43",
    danger: "#EA5455",
    dark: "#4b4b4b",
    black: "#000",
    white: "#fff",
    body: "#f8f8f8"
  },
  light: {
    primary: "#7367F01a",
    secondary: "#82868b1a",
    success: "#28C76F1a",
    info: "#00cfe81a",
    warning: "#FF9F431a",
    danger: "#EA54551a",
    dark: "#4b4b4b1a"
  }
};

(function (window, document, $) {
  "use strict";

  $(".custom-data-bs-table").closest(".card").find(".card-search").append('<div class="input-group float-end"><input type="text" name="search_table" class="form-control bg-white" placeholder="Search Table"><button class="btn btn-outline-primary" type="submit"><i class="bi bi-search"></i></button></div>');
  $(".custom-data-bs-table").closest(".card").find(".card-body").attr("style", "padding-top:0px");
  var tr_elements = $(".custom-data-bs-table tbody tr");
  $(document).on("input", "input[name=search_table]", function () {
    var search = $(this).val().toUpperCase();
    var match = tr_elements.filter(function (idx, elem) {
      return $(elem).text().trim().toUpperCase().indexOf(search) >= 0 ? elem : null;
    }).sort();
    var table_content = $(".custom-data-bs-table tbody");

    if (match.length == 0) {
      table_content.html('<tr><td colspan="100%" class="text-center">Data Not Found</td></tr>');
    } else {
      table_content.html(match);
    }
  });
  var img = $(".bg_img");
  img.css("background-image", function () {
    var bg = "url(" + $(this).data("background") + ")";
    return bg;
  });
  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      $("#toggleFullScreen").removeClass("bi-aspect-ratio").addClass("bi-fullscreen-exit");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        $("#toggleFullScreen").removeClass("bi-fullscreen-exit").addClass("bi-aspect-ratio");
      }
    }
  }

  $(".fullscreen-btn").on("click", function () {
    $(this).toggleClass("active");
  });

  function proPicURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var preview = $(input).parents(".thumb").find(".profilePicPreview");
        $(preview).css("background-image", "url(" + e.target.result + ")");
        $(preview).addClass("has-image");
        $(preview).hide();
        $(preview).fadeIn(650);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".profilePicUpload").on("change", function () {
    proPicURL(this);
  });
  $(".remove-image").on("click", function () {
    $(this).parents(".profilePicPreview").css("background-image", "none");
    $(this).parents(".profilePicPreview").removeClass("has-image");
    $(this).parents(".thumb").find("input[type=file]").val("");
  });
  $("form").on("change", ".file-upload-field", function () {
    $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ""));
  });
  var $html = $("html");
  var $logo = $("#logo");
  var $logo_dark = $("#logo_dark");
  var $favicon_light = $("#favicon_light");
  var $favicon_dark = $("#favicon_dark");
  var $body = $("body");
  var $textcolor = "#4e5154";
  var assetPath = "../../../app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  } // to remove sm control classes from datatables


  if ($.fn.dataTable) {
    $.extend($.fn.dataTable.ext.classes, {
      sFilterInput: "form-control",
      sLengthSelect: "form-select"
    });
  }

  $(window).on("load", function () {
    var rtl;
    var compactMenu = false;

    if ($body.hasClass("menu-collapsed") || localStorage.getItem("menuCollapsed") === "true") {
      compactMenu = true;
    }

    if ($("html").data("textdirection") == "rtl") {
      rtl = true;
    }

    setTimeout(function () {
      $html.removeClass("loading").addClass("loaded");
    }, 1200);
    $.app.menu.init(compactMenu); // Navigation configurations

    var config = {
      speed: 300 // set speed to expand / collapse menu

    };

    if ($.app.nav.initialized === false) {
      $.app.nav.init(config);
    }

    Unison.on("change", function (bp) {
      $.app.menu.change(compactMenu);
    }); // Tooltip Initialization
    // $('[data-bs-toggle="tooltip"]').tooltip({
    //   container: 'body'
    // });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    }); // Collapsible Card

    $('a[data-action="collapse"]').on("click", function (e) {
      e.preventDefault();
      $(this).closest(".card").children(".card-content").collapse("toggle");
      $(this).closest(".card").find('[data-action="collapse"]').toggleClass("rotate");
    }); // Cart dropdown touchspin

    if ($(".touchspin-cart").length > 0) {
      $(".touchspin-cart").TouchSpin({
        buttondown_class: "btn btn-primary",
        buttonup_class: "btn btn-primary",
        buttondown_txt: feather.icons["minus"].toSvg(),
        buttonup_txt: feather.icons["plus"].toSvg()
      });
    } // Do not close cart or notification dropdown on click of the items


    $(".dropdown-notification .dropdown-menu, .dropdown-cart .dropdown-menu").on("click", function (e) {
      e.stopPropagation();
    }); //  Notifications & messages scrollable

    $(".scrollable-container").each(function () {
      var scrollable_container = new PerfectScrollbar($(this)[0], {
        wheelPropagation: false
      });
    }); // Reload Card

    $('a[data-action="reload"]').on("click", function () {
      var block_ele = $(this).closest(".card");
      var reloadActionOverlay;

      if ($html.hasClass("dark-layout")) {
        var reloadActionOverlay = "#10163a";
      } else {
        var reloadActionOverlay = "#fff";
      } // Block Element


      block_ele.block({
        message: feather.icons["refresh-cw"].toSvg({
          "class": "font-medium-1 spinner text-primary"
        }),
        timeout: 2000,
        //unblock after 2 seconds
        overlayCSS: {
          backgroundColor: reloadActionOverlay,
          cursor: "wait"
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: "none"
        }
      });
    }); // Close Card

    $('a[data-action="close"]').on("click", function () {
      $(this).closest(".card").removeClass().slideUp("fast");
    });
    $('.card .heading-elements a[data-action="collapse"]').on("click", function () {
      var $this = $(this),
          card = $this.closest(".card");
      var cardHeight;

      if (parseInt(card[0].style.height, 10) > 0) {
        cardHeight = card.css("height");
        card.css("height", "").attr("data-height", cardHeight);
      } else {
        if (card.data("height")) {
          cardHeight = card.data("height");
          card.css("height", cardHeight).attr("data-height", "");
        }
      }
    }); // Add disabled class to input group when input is disabled

    $("input:disabled, textarea:disabled").closest(".input-group").addClass("disabled"); // Add sidebar group active class to active menu

    $(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active"); // Add open class to parent list item if subitem is active except compact menu

    var menuType = $body.data("menu");

    if (menuType != "horizontal-menu" && compactMenu === false) {
      $(".main-menu-content").find("li.active").parents("li").addClass("open");
    }

    if (menuType == "horizontal-menu") {
      $(".main-menu-content").find("li.active").parents("li:not(.nav-item)").addClass("open");
      $(".main-menu-content").find("li.active").closest("li.nav-item").addClass("sidebar-group-active open"); // $(".main-menu-content")
      //   .find("li.active")
      //   .parents("li")
      //   .addClass("active");
    } //  Dynamic height for the chartjs div for the chart animations to work


    var chartjsDiv = $(".chartjs"),
        canvasHeight = chartjsDiv.children("canvas").attr("height"),
        mainMenu = $(".main-menu");
    chartjsDiv.css("height", canvasHeight);

    if ($body.hasClass("boxed-layout")) {
      if ($body.hasClass("vertical-overlay-menu")) {
        var menuWidth = mainMenu.width();
        var contentPosition = $(".app-content").position().left;
        var menuPositionAdjust = contentPosition - menuWidth;

        if ($body.hasClass("menu-flipped")) {
          mainMenu.css("right", menuPositionAdjust + "px");
        } else {
          mainMenu.css("left", menuPositionAdjust + "px");
        }
      }
    }
    /* Text Area Counter Set Start */


    $(".char-textarea").on("keyup", function (event) {
      checkTextAreaMaxLength(this, event); // to later change text color in dark layout

      $(this).addClass("active");
    });
    /*
    Checks the MaxLength of the Textarea
    -----------------------------------------------------
    @prerequisite:  textBox = textarea dom element
        e = textarea event
                length = Max length of characters
    */

    function checkTextAreaMaxLength(textBox, e) {
      var maxLength = parseInt($(textBox).data("length")),
          counterValue = $(".textarea-counter-value"),
          charTextarea = $(".char-textarea");

      if (!checkSpecialKeys(e)) {
        if (textBox.value.length < maxLength - 1) textBox.value = textBox.value.substring(0, maxLength);
      }

      $(".char-count").html(textBox.value.length);

      if (textBox.value.length > maxLength) {
        counterValue.css("background-color", window.colors.solid.danger);
        charTextarea.css("color", window.colors.solid.danger); // to change text color after limit is maxedout out

        charTextarea.addClass("max-limit");
      } else {
        counterValue.css("background-color", window.colors.solid.primary);
        charTextarea.css("color", $textcolor);
        charTextarea.removeClass("max-limit");
      }

      return true;
    }
    /*
    Checks if the keyCode pressed is inside special chars
    -------------------------------------------------------
    @prerequisite:  e = e.keyCode object for the key pressed
    */


    function checkSpecialKeys(e) {
      if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) return false;else return true;
    }

    $(".content-overlay").on("click", function () {
      $(".search-list").removeClass("show");
      var searchInput = $(".search-input-close").closest(".search-input");

      if (searchInput.hasClass("open")) {
        searchInput.removeClass("open");
        searchInputInputfield.val("");
        searchInputInputfield.blur();
        searchList.removeClass("show");
      }

      $(".app-content").removeClass("show-overlay");
      $(".bookmark-wrapper .bookmark-input").removeClass("show");
    }); // To show shadow in main menu when menu scrolls

    var container = document.getElementsByClassName("main-menu-content");

    if (container.length > 0) {
      container[0].addEventListener("ps-scroll-y", function () {
        if ($(this).find(".ps__thumb-y").position().top > 0) {
          $(".shadow-bottom").css("display", "block");
        } else {
          $(".shadow-bottom").css("display", "none");
        }
      });
    }
  }); // Hide overlay menu on content overlay click on small screens

  $(document).on("click", ".sidenav-overlay", function (e) {
    // Hide menu
    $.app.menu.hide();
    return false;
  }); // Execute below code only if we find hammer js for touch swipe feature on small screen

  if (typeof Hammer !== "undefined") {
    var rtl;

    if ($("html").data("textdirection") == "rtl") {
      rtl = true;
    } // Swipe menu gesture


    var swipeInElement = document.querySelector(".drag-target"),
        swipeInAction = "panright",
        swipeOutAction = "panleft";

    if (rtl === true) {
      swipeInAction = "panleft";
      swipeOutAction = "panright";
    }

    if ($(swipeInElement).length > 0) {
      var swipeInMenu = new Hammer(swipeInElement);
      swipeInMenu.on(swipeInAction, function (ev) {
        if ($body.hasClass("vertical-overlay-menu")) {
          $.app.menu.open();
          return false;
        }
      });
    } // menu swipe out gesture


    setTimeout(function () {
      var swipeOutElement = document.querySelector(".main-menu");
      var swipeOutMenu;

      if ($(swipeOutElement).length > 0) {
        swipeOutMenu = new Hammer(swipeOutElement);
        swipeOutMenu.get("pan").set({
          direction: Hammer.DIRECTION_ALL,
          threshold: 250
        });
        swipeOutMenu.on(swipeOutAction, function (ev) {
          if ($body.hasClass("vertical-overlay-menu")) {
            $.app.menu.hide();
            return false;
          }
        });
      }
    }, 300); // menu close on overlay tap

    var swipeOutOverlayElement = document.querySelector(".sidenav-overlay");

    if ($(swipeOutOverlayElement).length > 0) {
      var swipeOutOverlayMenu = new Hammer(swipeOutOverlayElement);
      swipeOutOverlayMenu.on("tap", function (ev) {
        if ($body.hasClass("vertical-overlay-menu")) {
          $.app.menu.hide();
          return false;
        }
      });
    }
  }

  $(document).on("click", ".menu-toggle, .modern-nav-toggle", function (e) {
    e.preventDefault(); // Toggle menu

    $.app.menu.toggle();
    setTimeout(function () {
      $(window).trigger("resize");
    }, 200);

    if ($("#collapse-sidebar-switch").length > 0) {
      setTimeout(function () {
        if ($body.hasClass("menu-expanded") || $body.hasClass("menu-open")) {
          $("#collapse-sidebar-switch").prop("checked", false);
        } else {
          $("#collapse-sidebar-switch").prop("checked", true);
        }
      }, 50);
    } // Save menu collapsed status in localstorage


    if ($body.hasClass("menu-expanded") || $body.hasClass("menu-open")) {
      localStorage.setItem("menuCollapsed", false);
    } else {
      localStorage.setItem("menuCollapsed", true);
    } // Hides dropdown on click of menu toggle
    // $('[data-bs-toggle="dropdown"]').dropdown('hide');


    return false;
  }); // Add Children Class

  $(".navigation").find("li").has("ul").addClass("has-sub"); // Update manual scroller when window is resized

  $(window).resize(function () {
    $.app.menu.manualScroller.updateHeight();
  });
  $("#sidebar-page-navigation").on("click", "a.nav-link", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this),
        href = $this.attr("href");
    var offset = $(href).offset();
    var scrollto = offset.top - 80; // minus fixed header height

    $("html, body").animate({
      scrollTop: scrollto
    }, 0);
    setTimeout(function () {
      $this.parent(".nav-item").siblings(".nav-item").children(".nav-link").removeClass("active");
      $this.addClass("active");
    }, 100);
  }); // main menu internationalization
  // init i18n and load language file

  if ($body.attr("data-framework") === "laravel") {
    // change language according to data-language of dropdown item
    var language = $("html")[0].lang;

    if (language !== null) {
      // get the selected flag class
      var selectedLang = $(".dropdown-language").find("a[data-language=" + language + "]").text();
      var selectedFlag = $(".dropdown-language").find("a[data-language=" + language + "] .flag-icon").attr("class"); // set the class in button

      $("#dropdown-flag .selected-language").text(selectedLang);
      $("#dropdown-flag .flag-icon").removeClass().addClass(selectedFlag);
    }
  } else {
    i18next.use(window.i18nextXHRBackend).init({
      debug: false,
      fallbackLng: "en",
      backend: {
        loadPath: assetPath + "data/locales/{{lng}}.json"
      },
      returnObjects: true
    }, function (err, t) {
      // resources have been loaded
      jqueryI18next.init(i18next, $);
    }); // change language according to data-language of dropdown item

    $(".dropdown-language .dropdown-item").on("click", function () {
      var $this = $(this);
      $this.siblings(".selected").removeClass("selected");
      $this.addClass("selected");
      var selectedLang = $this.text();
      var selectedFlag = $this.find(".flag-icon").attr("class");
      $("#dropdown-flag .selected-language").text(selectedLang);
      $("#dropdown-flag .flag-icon").removeClass().addClass(selectedFlag);
      var currentLanguage = $this.data("language");
      i18next.changeLanguage(currentLanguage, function (err, t) {
        $(".main-menu, .horizontal-menu-wrapper").localize();
      });
    });
  } // Waves Effect


  Waves.init();
  Waves.attach(".btn:not([class*='btn-relief-']):not([class*='btn-gradient-']):not([class*='btn-outline-']):not([class*='btn-flat-'])", ["waves-float", "waves-light"]);
  Waves.attach("[class*='btn-outline-']");
  Waves.attach("[class*='btn-flat-']");
  $(".form-password-toggle .input-group-text").on("click", function (e) {
    e.preventDefault();
    var $this = $(this),
        inputGroupText = $this.closest(".form-password-toggle"),
        formPasswordToggleIcon = $this,
        formPasswordToggleInput = inputGroupText.find("input");

    if (formPasswordToggleInput.attr("type") === "text") {
      formPasswordToggleInput.attr("type", "password");

      if (feather) {
        formPasswordToggleIcon.find("svg").replaceWith(feather.icons["eye"].toSvg({
          "class": "font-small-4"
        }));
      }
    } else if (formPasswordToggleInput.attr("type") === "password") {
      formPasswordToggleInput.attr("type", "text");

      if (feather) {
        formPasswordToggleIcon.find("svg").replaceWith(feather.icons["eye-off"].toSvg({
          "class": "font-small-4"
        }));
      }
    }
  }); // on window scroll button show/hide

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 400) {
      $(".scroll-top").fadeIn();
    } else {
      $(".scroll-top").fadeOut();
    } // On Scroll navbar color on horizontal menu


    if ($body.hasClass("navbar-static")) {
      var scroll = $(window).scrollTop();

      if (scroll > 65) {
        $("html:not(.dark-layout) .horizontal-menu .header-navbar.navbar-fixed").css({
          background: "#fff",
          "box-shadow": "0 4px 20px 0 rgba(0,0,0,.05)"
        });
        $(".horizontal-menu.dark-layout .header-navbar.navbar-fixed").css({
          background: "#161d31",
          "box-shadow": "0 4px 20px 0 rgba(0,0,0,.05)"
        });
        $("html:not(.dark-layout) .horizontal-menu .horizontal-menu-wrapper.header-navbar").css("background", "#fff");
        $(".dark-layout .horizontal-menu .horizontal-menu-wrapper.header-navbar").css("background", "#161d31");
      } else {
        $("html:not(.dark-layout) .horizontal-menu .header-navbar.navbar-fixed").css({
          background: "#f8f8f8",
          "box-shadow": "none"
        });
        $(".dark-layout .horizontal-menu .header-navbar.navbar-fixed").css({
          background: "#161d31",
          "box-shadow": "none"
        });
        $("html:not(.dark-layout) .horizontal-menu .horizontal-menu-wrapper.header-navbar").css("background", "#fff");
        $(".dark-layout .horizontal-menu .horizontal-menu-wrapper.header-navbar").css("background", "#161d31");
      }
    }
  }); // Click event to scroll to top

  $(".scroll-top").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 75);
  });

  function getCurrentLayout() {
    var currentLayout = "";

    if ($html.hasClass("dark-layout")) {
      currentLayout = "dark-layout";
    } else if ($html.hasClass("bordered-layout")) {
      currentLayout = "bordered-layout";
    } else if ($html.hasClass("semi-dark-layout")) {
      currentLayout = "semi-dark-layout";
    } else {
      currentLayout = "light-layout";
    }

    return currentLayout;
  } // Get the data layout, for blank set to light layout


  var dataLayout = $html.attr("data-layout") ? $html.attr("data-layout") : "light-layout"; // Navbar Dark / Light Layout Toggle Switch

  $(".nav-link-style").on("click", function () {
    var currentLayout = getCurrentLayout(),
        switchToLayout = "",
        prevLayout = localStorage.getItem(dataLayout + "-prev-skin", currentLayout); // If currentLayout is not dark layout

    if (currentLayout !== "dark-layout") {
      // Switch to dark
      switchToLayout = "dark-layout";
    } else {
      // Switch to light
      // switchToLayout = prevLayout ? prevLayout : 'light-layout';
      if (currentLayout === prevLayout) {
        switchToLayout = "light-layout";
      } else {
        switchToLayout = prevLayout ? prevLayout : "light-layout";
      }
    } // Set Previous skin in local db


    localStorage.setItem(dataLayout + "-prev-skin", currentLayout); // Set Current skin in local db

    localStorage.setItem(dataLayout + "-current-skin", switchToLayout); // Call set layout

    setLayout(switchToLayout); // ToDo: Customizer fix

    $(".horizontal-menu .header-navbar.navbar-fixed").css({
      background: "inherit",
      "box-shadow": "inherit"
    });
    $(".horizontal-menu .horizontal-menu-wrapper.header-navbar").css("background", "inherit");
  }); // Get current local storage layout

  var currentLocalStorageLayout = localStorage.getItem(dataLayout + "-current-skin"); // Set layout on screen load
  //? Comment it if you don't want to sync layout with local db
  // setLayout(currentLocalStorageLayout);

  function setLayout(currentLocalStorageLayout) {
    var navLinkStyle = $(".nav-link-style"),
        currentLayout = getCurrentLayout(),
        mainMenu = $(".main-menu"),
        navbar = $(".header-navbar"),
        // Witch to local storage layout if we have else current layout
    switchToLayout = currentLocalStorageLayout ? currentLocalStorageLayout : currentLayout;
    $html.removeClass("semi-dark-layout dark-layout bordered-layout");

    if (switchToLayout === "dark-layout") {
      $html.addClass("dark-layout");
      mainMenu.removeClass("menu-light").addClass("menu-dark");
      navbar.removeClass("navbar-light").addClass("navbar-dark");
      $logo.toggleClass("hidden");
      $logo_dark.toggleClass("hidden");
      $favicon_light.toggleClass("hidden");
      $favicon_dark.toggleClass("hidden");
      navLinkStyle.find(".bi-moon").replaceWith('<i class="bi bi-sun"></i>');
    } else if (switchToLayout === "bordered-layout") {
      $html.addClass("bordered-layout");
      mainMenu.removeClass("menu-dark").addClass("menu-light");
      navbar.removeClass("navbar-dark").addClass("navbar-light");
      $logo_dark.toggleClass("hidden");
      $logo.toggleClass("hidden");
      $favicon_dark.toggleClass("hidden");
      $favicon_light.toggleClass("hidden");
      navLinkStyle.find(".bi-sun").replaceWith('<i class="bi bi-moon"></i>');
    } else if (switchToLayout === "semi-dark-layout") {
      $html.addClass("semi-dark-layout");
      mainMenu.removeClass("menu-dark").addClass("menu-light");
      navbar.removeClass("navbar-dark").addClass("navbar-light");
      $logo_dark.toggleClass("hidden");
      $logo.toggleClass("hidden");
      $favicon_dark.toggleClass("hidden");
      $favicon_light.toggleClass("hidden");
      navLinkStyle.find(".bi-sun").replaceWith('<i class="bi bi-moon"></i>');
    } else {
      $html.addClass("light-layout");
      mainMenu.removeClass("menu-dark").addClass("menu-light");
      navbar.removeClass("navbar-dark").addClass("navbar-light");
      $logo_dark.toggleClass("hidden");
      $logo.toggleClass("hidden");
      $favicon_dark.toggleClass("hidden");
      $favicon_light.toggleClass("hidden");
      navLinkStyle.find(".bi-sun").replaceWith('<i class="bi bi-moon"></i>');
    } // Set radio in customizer if we have


    if ($("input:radio[data-layout=" + switchToLayout + "]").length > 0) {
      setTimeout(function () {
        $("input:radio[data-layout=" + switchToLayout + "]").prop("checked", true);
      });
    }
  }
})(window, document, jQuery); // To use feather svg icons with different sizes


function featherSVG(iconSize) {
  // Feather Icons
  if (iconSize == undefined) {
    iconSize = "14";
  }

  return feather.replace({
    width: iconSize,
    height: iconSize
  });
} // jQuery Validation Global Defaults


if (typeof jQuery.validator === "function") {
  jQuery.validator.setDefaults({
    errorElement: "span",
    errorPlacement: function errorPlacement(error, element) {
      if (element.parent().hasClass("input-group") || element.hasClass("select2") || element.attr("type") === "checkbox") {
        error.insertAfter(element.parent());
      } else if (element.hasClass("form-check-input")) {
        error.insertAfter(element.parent().siblings(":last"));
      } else {
        error.insertAfter(element);
      }

      if (element.parent().hasClass("input-group")) {
        element.parent().addClass("is-invalid");
      }
    },
    highlight: function highlight(element, errorClass, validClass) {
      $(element).addClass("error");

      if ($(element).parent().hasClass("input-group")) {
        $(element).parent().addClass("is-invalid");
      }
    },
    unhighlight: function unhighlight(element, errorClass, validClass) {
      $(element).removeClass("error");

      if ($(element).parent().hasClass("input-group")) {
        $(element).parent().removeClass("is-invalid");
      }
    }
  });
} // Add validation class to input-group (input group validation fix, currently disabled but will be useful in future)

/* function inputGroupValidation(el) {
  var validEl,
    invalidEl,
    elem = $(el);

  if (elem.hasClass('form-control')) {
    if ($(elem).is('.form-control:valid, .form-control.is-valid')) {
      validEl = elem;
    }
    if ($(elem).is('.form-control:invalid, .form-control.is-invalid')) {
      invalidEl = elem;
    }
  } else {
    validEl = elem.find('.form-control:valid, .form-control.is-valid');
    invalidEl = elem.find('.form-control:invalid, .form-control.is-invalid');
  }
  if (validEl !== undefined) {
    validEl.closest('.input-group').removeClass('.is-valid is-invalid').addClass('is-valid');
  }
  if (invalidEl !== undefined) {
    invalidEl.closest('.input-group').removeClass('.is-valid is-invalid').addClass('is-invalid');
  }
} */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL2NvcmUvYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxNQUFNLENBQUNDLE1BQVAsR0FBZ0I7RUFDWkMsS0FBSyxFQUFFO0lBQ0hDLE9BQU8sRUFBRSxTQUROO0lBRUhDLFNBQVMsRUFBRSxTQUZSO0lBR0hDLE9BQU8sRUFBRSxTQUhOO0lBSUhDLElBQUksRUFBRSxTQUpIO0lBS0hDLE9BQU8sRUFBRSxTQUxOO0lBTUhDLE1BQU0sRUFBRSxTQU5MO0lBT0hDLElBQUksRUFBRSxTQVBIO0lBUUhDLEtBQUssRUFBRSxNQVJKO0lBU0hDLEtBQUssRUFBRSxNQVRKO0lBVUhDLElBQUksRUFBRTtFQVZILENBREs7RUFhWkMsS0FBSyxFQUFFO0lBQ0hWLE9BQU8sRUFBRSxXQUROO0lBRUhDLFNBQVMsRUFBRSxXQUZSO0lBR0hDLE9BQU8sRUFBRSxXQUhOO0lBSUhDLElBQUksRUFBRSxXQUpIO0lBS0hDLE9BQU8sRUFBRSxXQUxOO0lBTUhDLE1BQU0sRUFBRSxXQU5MO0lBT0hDLElBQUksRUFBRTtFQVBIO0FBYkssQ0FBaEI7O0FBdUJBLENBQUMsVUFBVVQsTUFBVixFQUFrQmMsUUFBbEIsRUFBNEJDLENBQTVCLEVBQStCO0VBQzVCOztFQUNBQSxDQUFDLENBQUMsdUJBQUQsQ0FBRCxDQUNLQyxPQURMLENBQ2EsT0FEYixFQUVLQyxJQUZMLENBRVUsY0FGVixFQUdLQyxNQUhMLENBSVEsc09BSlI7RUFNQUgsQ0FBQyxDQUFDLHVCQUFELENBQUQsQ0FDS0MsT0FETCxDQUNhLE9BRGIsRUFFS0MsSUFGTCxDQUVVLFlBRlYsRUFHS0UsSUFITCxDQUdVLE9BSFYsRUFHbUIsaUJBSG5CO0VBSUEsSUFBSUMsV0FBVyxHQUFHTCxDQUFDLENBQUMsZ0NBQUQsQ0FBbkI7RUFDQUEsQ0FBQyxDQUFDRCxRQUFELENBQUQsQ0FBWU8sRUFBWixDQUFlLE9BQWYsRUFBd0IsMEJBQXhCLEVBQW9ELFlBQVk7SUFDNUQsSUFBSUMsTUFBTSxHQUFHUCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFRLEdBQVIsR0FBY0MsV0FBZCxFQUFiO0lBQ0EsSUFBSUMsS0FBSyxHQUFHTCxXQUFXLENBQ2xCTSxNQURPLENBQ0EsVUFBVUMsR0FBVixFQUFlQyxJQUFmLEVBQXFCO01BQ3pCLE9BQU9iLENBQUMsQ0FBQ2EsSUFBRCxDQUFELENBQVFDLElBQVIsR0FBZUMsSUFBZixHQUFzQk4sV0FBdEIsR0FBb0NPLE9BQXBDLENBQTRDVCxNQUE1QyxLQUF1RCxDQUF2RCxHQUNETSxJQURDLEdBRUQsSUFGTjtJQUdILENBTE8sRUFNUEksSUFOTyxFQUFaO0lBT0EsSUFBSUMsYUFBYSxHQUFHbEIsQ0FBQyxDQUFDLDZCQUFELENBQXJCOztJQUNBLElBQUlVLEtBQUssQ0FBQ1MsTUFBTixJQUFnQixDQUFwQixFQUF1QjtNQUNuQkQsYUFBYSxDQUFDRSxJQUFkLENBQ0kscUVBREo7SUFHSCxDQUpELE1BSU87TUFDSEYsYUFBYSxDQUFDRSxJQUFkLENBQW1CVixLQUFuQjtJQUNIO0VBQ0osQ0FqQkQ7RUFtQkEsSUFBSVcsR0FBRyxHQUFHckIsQ0FBQyxDQUFDLFNBQUQsQ0FBWDtFQUNBcUIsR0FBRyxDQUFDQyxHQUFKLENBQVEsa0JBQVIsRUFBNEIsWUFBWTtJQUNwQyxJQUFJQyxFQUFFLEdBQUcsU0FBU3ZCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXdCLElBQVIsQ0FBYSxZQUFiLENBQVQsR0FBc0MsR0FBL0M7SUFDQSxPQUFPRCxFQUFQO0VBQ0gsQ0FIRDtFQUtBdkIsQ0FBQyxDQUFDLFlBQVk7SUFDVkEsQ0FBQyxDQUFDLDRCQUFELENBQUQsQ0FBZ0N5QixPQUFoQztFQUNILENBRkEsQ0FBRDs7RUFJQSxTQUFTQyxnQkFBVCxHQUE0QjtJQUN4QixJQUFJLENBQUMzQixRQUFRLENBQUM0QixpQkFBZCxFQUFpQztNQUM3QjVCLFFBQVEsQ0FBQzZCLGVBQVQsQ0FBeUJDLGlCQUF6QjtNQUNBN0IsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FDSzhCLFdBREwsQ0FDaUIsaUJBRGpCLEVBRUtDLFFBRkwsQ0FFYyxvQkFGZDtJQUdILENBTEQsTUFLTztNQUNILElBQUloQyxRQUFRLENBQUNpQyxjQUFiLEVBQTZCO1FBQ3pCakMsUUFBUSxDQUFDaUMsY0FBVDtRQUNBaEMsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FDSzhCLFdBREwsQ0FDaUIsb0JBRGpCLEVBRUtDLFFBRkwsQ0FFYyxpQkFGZDtNQUdIO0lBQ0o7RUFDSjs7RUFFRC9CLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCTSxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFZO0lBQ3pDTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFpQyxXQUFSLENBQW9CLFFBQXBCO0VBQ0gsQ0FGRDs7RUFJQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtJQUN0QixJQUFJQSxLQUFLLENBQUNDLEtBQU4sSUFBZUQsS0FBSyxDQUFDQyxLQUFOLENBQVksQ0FBWixDQUFuQixFQUFtQztNQUMvQixJQUFJQyxNQUFNLEdBQUcsSUFBSUMsVUFBSixFQUFiOztNQUNBRCxNQUFNLENBQUNFLE1BQVAsR0FBZ0IsVUFBVUMsQ0FBVixFQUFhO1FBQ3pCLElBQUlDLE9BQU8sR0FBR3pDLENBQUMsQ0FBQ21DLEtBQUQsQ0FBRCxDQUNUTyxPQURTLENBQ0QsUUFEQyxFQUVUeEMsSUFGUyxDQUVKLG9CQUZJLENBQWQ7UUFHQUYsQ0FBQyxDQUFDeUMsT0FBRCxDQUFELENBQVduQixHQUFYLENBQ0ksa0JBREosRUFFSSxTQUFTa0IsQ0FBQyxDQUFDRyxNQUFGLENBQVNDLE1BQWxCLEdBQTJCLEdBRi9CO1FBSUE1QyxDQUFDLENBQUN5QyxPQUFELENBQUQsQ0FBV1YsUUFBWCxDQUFvQixXQUFwQjtRQUNBL0IsQ0FBQyxDQUFDeUMsT0FBRCxDQUFELENBQVdJLElBQVg7UUFDQTdDLENBQUMsQ0FBQ3lDLE9BQUQsQ0FBRCxDQUFXSyxNQUFYLENBQWtCLEdBQWxCO01BQ0gsQ0FYRDs7TUFZQVQsTUFBTSxDQUFDVSxhQUFQLENBQXFCWixLQUFLLENBQUNDLEtBQU4sQ0FBWSxDQUFaLENBQXJCO0lBQ0g7RUFDSjs7RUFDRHBDLENBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCTSxFQUF2QixDQUEwQixRQUExQixFQUFvQyxZQUFZO0lBQzVDNEIsU0FBUyxDQUFDLElBQUQsQ0FBVDtFQUNILENBRkQ7RUFJQWxDLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJNLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVk7SUFDdkNOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTBDLE9BQVIsQ0FBZ0Isb0JBQWhCLEVBQXNDcEIsR0FBdEMsQ0FBMEMsa0JBQTFDLEVBQThELE1BQTlEO0lBQ0F0QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVEwQyxPQUFSLENBQWdCLG9CQUFoQixFQUFzQ1osV0FBdEMsQ0FBa0QsV0FBbEQ7SUFDQTlCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTBDLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEJ4QyxJQUExQixDQUErQixrQkFBL0IsRUFBbURNLEdBQW5ELENBQXVELEVBQXZEO0VBQ0gsQ0FKRDtFQU1BUixDQUFDLENBQUMsTUFBRCxDQUFELENBQVVNLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLG9CQUF2QixFQUE2QyxZQUFZO0lBQ3JETixDQUFDLENBQUMsSUFBRCxDQUFELENBQ0tnRCxNQURMLENBQ1ksc0JBRFosRUFFSzVDLElBRkwsQ0FHUSxXQUhSLEVBSVFKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FDS1EsR0FETCxHQUVLeUMsT0FGTCxDQUVhLFdBRmIsRUFFMEIsRUFGMUIsQ0FKUjtFQVFILENBVEQ7RUFVQSxJQUFJQyxLQUFLLEdBQUdsRCxDQUFDLENBQUMsTUFBRCxDQUFiO0VBQ0EsSUFBSW1ELEtBQUssR0FBR25ELENBQUMsQ0FBQyxPQUFELENBQWI7RUFDQSxJQUFJb0QsVUFBVSxHQUFHcEQsQ0FBQyxDQUFDLFlBQUQsQ0FBbEI7RUFDQSxJQUFJcUQsY0FBYyxHQUFHckQsQ0FBQyxDQUFDLGdCQUFELENBQXRCO0VBQ0EsSUFBSXNELGFBQWEsR0FBR3RELENBQUMsQ0FBQyxlQUFELENBQXJCO0VBQ0EsSUFBSXVELEtBQUssR0FBR3ZELENBQUMsQ0FBQyxNQUFELENBQWI7RUFDQSxJQUFJd0QsVUFBVSxHQUFHLFNBQWpCO0VBQ0EsSUFBSUMsU0FBUyxHQUFHLHNCQUFoQjs7RUFFQSxJQUFJekQsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVSSxJQUFWLENBQWUsZ0JBQWYsTUFBcUMsU0FBekMsRUFBb0Q7SUFDaERxRCxTQUFTLEdBQUd6RCxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVJLElBQVYsQ0FBZSxpQkFBZixDQUFaO0VBQ0gsQ0EvRzJCLENBaUg1Qjs7O0VBQ0EsSUFBSUosQ0FBQyxDQUFDMEQsRUFBRixDQUFLQyxTQUFULEVBQW9CO0lBQ2hCM0QsQ0FBQyxDQUFDNEQsTUFBRixDQUFTNUQsQ0FBQyxDQUFDMEQsRUFBRixDQUFLQyxTQUFMLENBQWVFLEdBQWYsQ0FBbUJDLE9BQTVCLEVBQXFDO01BQ2pDQyxZQUFZLEVBQUUsY0FEbUI7TUFFakNDLGFBQWEsRUFBRTtJQUZrQixDQUFyQztFQUlIOztFQUVEaEUsQ0FBQyxDQUFDZixNQUFELENBQUQsQ0FBVXFCLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7SUFDN0IsSUFBSTJELEdBQUo7SUFDQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7O0lBRUEsSUFDSVgsS0FBSyxDQUFDWSxRQUFOLENBQWUsZ0JBQWYsS0FDQUMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLE1BRjlDLEVBR0U7TUFDRUgsV0FBVyxHQUFHLElBQWQ7SUFDSDs7SUFFRCxJQUFJbEUsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVd0IsSUFBVixDQUFlLGVBQWYsS0FBbUMsS0FBdkMsRUFBOEM7TUFDMUN5QyxHQUFHLEdBQUcsSUFBTjtJQUNIOztJQUVESyxVQUFVLENBQUMsWUFBWTtNQUNuQnBCLEtBQUssQ0FBQ3BCLFdBQU4sQ0FBa0IsU0FBbEIsRUFBNkJDLFFBQTdCLENBQXNDLFFBQXRDO0lBQ0gsQ0FGUyxFQUVQLElBRk8sQ0FBVjtJQUlBL0IsQ0FBQyxDQUFDdUUsR0FBRixDQUFNQyxJQUFOLENBQVdDLElBQVgsQ0FBZ0JQLFdBQWhCLEVBbkI2QixDQXFCN0I7O0lBQ0EsSUFBSVEsTUFBTSxHQUFHO01BQ1RDLEtBQUssRUFBRSxHQURFLENBQ0c7O0lBREgsQ0FBYjs7SUFHQSxJQUFJM0UsQ0FBQyxDQUFDdUUsR0FBRixDQUFNSyxHQUFOLENBQVVDLFdBQVYsS0FBMEIsS0FBOUIsRUFBcUM7TUFDakM3RSxDQUFDLENBQUN1RSxHQUFGLENBQU1LLEdBQU4sQ0FBVUgsSUFBVixDQUFlQyxNQUFmO0lBQ0g7O0lBRURJLE1BQU0sQ0FBQ3hFLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFVBQVV5RSxFQUFWLEVBQWM7TUFDOUIvRSxDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBV1EsTUFBWCxDQUFrQmQsV0FBbEI7SUFDSCxDQUZELEVBN0I2QixDQWlDN0I7SUFDQTtJQUNBO0lBQ0E7O0lBQ0EsSUFBSWUsa0JBQWtCLEdBQUcsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQ3JCcEYsUUFBUSxDQUFDcUYsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBRHFCLENBQXpCO0lBR0EsSUFBSUMsV0FBVyxHQUFHSixrQkFBa0IsQ0FBQ0ssR0FBbkIsQ0FBdUIsVUFBVUMsZ0JBQVYsRUFBNEI7TUFDakUsT0FBTyxJQUFJQyxTQUFTLENBQUNDLE9BQWQsQ0FBc0JGLGdCQUF0QixDQUFQO0lBQ0gsQ0FGaUIsQ0FBbEIsQ0F4QzZCLENBNEM3Qjs7SUFDQXZGLENBQUMsQ0FBQywyQkFBRCxDQUFELENBQStCTSxFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxVQUFVa0MsQ0FBVixFQUFhO01BQ3BEQSxDQUFDLENBQUNrRCxjQUFGO01BQ0ExRixDQUFDLENBQUMsSUFBRCxDQUFELENBQ0tDLE9BREwsQ0FDYSxPQURiLEVBRUswRixRQUZMLENBRWMsZUFGZCxFQUdLQyxRQUhMLENBR2MsUUFIZDtNQUlBNUYsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUNLQyxPQURMLENBQ2EsT0FEYixFQUVLQyxJQUZMLENBRVUsMEJBRlYsRUFHSytCLFdBSEwsQ0FHaUIsUUFIakI7SUFJSCxDQVZELEVBN0M2QixDQXlEN0I7O0lBQ0EsSUFBSWpDLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCbUIsTUFBckIsR0FBOEIsQ0FBbEMsRUFBcUM7TUFDakNuQixDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQjZGLFNBQXJCLENBQStCO1FBQzNCQyxnQkFBZ0IsRUFBRSxpQkFEUztRQUUzQkMsY0FBYyxFQUFFLGlCQUZXO1FBRzNCQyxjQUFjLEVBQUVDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLE9BQWQsRUFBdUJDLEtBQXZCLEVBSFc7UUFJM0JDLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxLQUFSLENBQWMsTUFBZCxFQUFzQkMsS0FBdEI7TUFKYSxDQUEvQjtJQU1ILENBakU0QixDQW1FN0I7OztJQUNBbkcsQ0FBQyxDQUNHLHNFQURILENBQUQsQ0FFRU0sRUFGRixDQUVLLE9BRkwsRUFFYyxVQUFVa0MsQ0FBVixFQUFhO01BQ3ZCQSxDQUFDLENBQUM2RCxlQUFGO0lBQ0gsQ0FKRCxFQXBFNkIsQ0EwRTdCOztJQUNBckcsQ0FBQyxDQUFDLHVCQUFELENBQUQsQ0FBMkJzRyxJQUEzQixDQUFnQyxZQUFZO01BQ3hDLElBQUlDLG9CQUFvQixHQUFHLElBQUlDLGdCQUFKLENBQXFCeEcsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLENBQVIsQ0FBckIsRUFBaUM7UUFDeER5RyxnQkFBZ0IsRUFBRTtNQURzQyxDQUFqQyxDQUEzQjtJQUdILENBSkQsRUEzRTZCLENBaUY3Qjs7SUFDQXpHLENBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCTSxFQUE3QixDQUFnQyxPQUFoQyxFQUF5QyxZQUFZO01BQ2pELElBQUlvRyxTQUFTLEdBQUcxRyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFDLE9BQVIsQ0FBZ0IsT0FBaEIsQ0FBaEI7TUFDQSxJQUFJMEcsbUJBQUo7O01BQ0EsSUFBSXpELEtBQUssQ0FBQ2lCLFFBQU4sQ0FBZSxhQUFmLENBQUosRUFBbUM7UUFDL0IsSUFBSXdDLG1CQUFtQixHQUFHLFNBQTFCO01BQ0gsQ0FGRCxNQUVPO1FBQ0gsSUFBSUEsbUJBQW1CLEdBQUcsTUFBMUI7TUFDSCxDQVBnRCxDQVFqRDs7O01BQ0FELFNBQVMsQ0FBQ0UsS0FBVixDQUFnQjtRQUNaQyxPQUFPLEVBQUVaLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFlBQWQsRUFBNEJDLEtBQTVCLENBQWtDO1VBQ3ZDLFNBQU87UUFEZ0MsQ0FBbEMsQ0FERztRQUlaVyxPQUFPLEVBQUUsSUFKRztRQUlHO1FBQ2ZDLFVBQVUsRUFBRTtVQUNSQyxlQUFlLEVBQUVMLG1CQURUO1VBRVJNLE1BQU0sRUFBRTtRQUZBLENBTEE7UUFTWjNGLEdBQUcsRUFBRTtVQUNENEYsTUFBTSxFQUFFLENBRFA7VUFFREMsT0FBTyxFQUFFLENBRlI7VUFHREgsZUFBZSxFQUFFO1FBSGhCO01BVE8sQ0FBaEI7SUFlSCxDQXhCRCxFQWxGNkIsQ0E0RzdCOztJQUNBaEgsQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEJNLEVBQTVCLENBQStCLE9BQS9CLEVBQXdDLFlBQVk7TUFDaEROLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUMsT0FBUixDQUFnQixPQUFoQixFQUF5QjZCLFdBQXpCLEdBQXVDc0YsT0FBdkMsQ0FBK0MsTUFBL0M7SUFDSCxDQUZEO0lBSUFwSCxDQUFDLENBQUMsbURBQUQsQ0FBRCxDQUF1RE0sRUFBdkQsQ0FDSSxPQURKLEVBRUksWUFBWTtNQUNSLElBQUkrRyxLQUFLLEdBQUdySCxDQUFDLENBQUMsSUFBRCxDQUFiO01BQUEsSUFDSXNILElBQUksR0FBR0QsS0FBSyxDQUFDcEgsT0FBTixDQUFjLE9BQWQsQ0FEWDtNQUVBLElBQUlzSCxVQUFKOztNQUVBLElBQUlDLFFBQVEsQ0FBQ0YsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxLQUFSLENBQWNDLE1BQWYsRUFBdUIsRUFBdkIsQ0FBUixHQUFxQyxDQUF6QyxFQUE0QztRQUN4Q0gsVUFBVSxHQUFHRCxJQUFJLENBQUNoRyxHQUFMLENBQVMsUUFBVCxDQUFiO1FBQ0FnRyxJQUFJLENBQUNoRyxHQUFMLENBQVMsUUFBVCxFQUFtQixFQUFuQixFQUF1QmxCLElBQXZCLENBQTRCLGFBQTVCLEVBQTJDbUgsVUFBM0M7TUFDSCxDQUhELE1BR087UUFDSCxJQUFJRCxJQUFJLENBQUM5RixJQUFMLENBQVUsUUFBVixDQUFKLEVBQXlCO1VBQ3JCK0YsVUFBVSxHQUFHRCxJQUFJLENBQUM5RixJQUFMLENBQVUsUUFBVixDQUFiO1VBQ0E4RixJQUFJLENBQUNoRyxHQUFMLENBQVMsUUFBVCxFQUFtQmlHLFVBQW5CLEVBQStCbkgsSUFBL0IsQ0FBb0MsYUFBcEMsRUFBbUQsRUFBbkQ7UUFDSDtNQUNKO0lBQ0osQ0FoQkwsRUFqSDZCLENBb0k3Qjs7SUFDQUosQ0FBQyxDQUFDLG1DQUFELENBQUQsQ0FDS0MsT0FETCxDQUNhLGNBRGIsRUFFSzhCLFFBRkwsQ0FFYyxVQUZkLEVBckk2QixDQXlJN0I7O0lBQ0EvQixDQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUNLRSxJQURMLENBQ1UsV0FEVixFQUVLd0MsT0FGTCxDQUVhLElBRmIsRUFHS1gsUUFITCxDQUdjLHNCQUhkLEVBMUk2QixDQStJN0I7O0lBQ0EsSUFBSTRGLFFBQVEsR0FBR3BFLEtBQUssQ0FBQy9CLElBQU4sQ0FBVyxNQUFYLENBQWY7O0lBQ0EsSUFBSW1HLFFBQVEsSUFBSSxpQkFBWixJQUFpQ3pELFdBQVcsS0FBSyxLQUFyRCxFQUE0RDtNQUN4RGxFLENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQ0tFLElBREwsQ0FDVSxXQURWLEVBRUt3QyxPQUZMLENBRWEsSUFGYixFQUdLWCxRQUhMLENBR2MsTUFIZDtJQUlIOztJQUNELElBQUk0RixRQUFRLElBQUksaUJBQWhCLEVBQW1DO01BQy9CM0gsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FDS0UsSUFETCxDQUNVLFdBRFYsRUFFS3dDLE9BRkwsQ0FFYSxtQkFGYixFQUdLWCxRQUhMLENBR2MsTUFIZDtNQUlBL0IsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FDS0UsSUFETCxDQUNVLFdBRFYsRUFFS0QsT0FGTCxDQUVhLGFBRmIsRUFHSzhCLFFBSEwsQ0FHYywyQkFIZCxFQUwrQixDQVMvQjtNQUNBO01BQ0E7TUFDQTtJQUNILENBcEs0QixDQXNLN0I7OztJQUNBLElBQUk2RixVQUFVLEdBQUc1SCxDQUFDLENBQUMsVUFBRCxDQUFsQjtJQUFBLElBQ0k2SCxZQUFZLEdBQUdELFVBQVUsQ0FBQ2pDLFFBQVgsQ0FBb0IsUUFBcEIsRUFBOEJ2RixJQUE5QixDQUFtQyxRQUFuQyxDQURuQjtJQUFBLElBRUkwSCxRQUFRLEdBQUc5SCxDQUFDLENBQUMsWUFBRCxDQUZoQjtJQUdBNEgsVUFBVSxDQUFDdEcsR0FBWCxDQUFlLFFBQWYsRUFBeUJ1RyxZQUF6Qjs7SUFFQSxJQUFJdEUsS0FBSyxDQUFDWSxRQUFOLENBQWUsY0FBZixDQUFKLEVBQW9DO01BQ2hDLElBQUlaLEtBQUssQ0FBQ1ksUUFBTixDQUFlLHVCQUFmLENBQUosRUFBNkM7UUFDekMsSUFBSTRELFNBQVMsR0FBR0QsUUFBUSxDQUFDRSxLQUFULEVBQWhCO1FBQ0EsSUFBSUMsZUFBZSxHQUFHakksQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQmtJLFFBQWxCLEdBQTZCQyxJQUFuRDtRQUNBLElBQUlDLGtCQUFrQixHQUFHSCxlQUFlLEdBQUdGLFNBQTNDOztRQUNBLElBQUl4RSxLQUFLLENBQUNZLFFBQU4sQ0FBZSxjQUFmLENBQUosRUFBb0M7VUFDaEMyRCxRQUFRLENBQUN4RyxHQUFULENBQWEsT0FBYixFQUFzQjhHLGtCQUFrQixHQUFHLElBQTNDO1FBQ0gsQ0FGRCxNQUVPO1VBQ0hOLFFBQVEsQ0FBQ3hHLEdBQVQsQ0FBYSxNQUFiLEVBQXFCOEcsa0JBQWtCLEdBQUcsSUFBMUM7UUFDSDtNQUNKO0lBQ0o7SUFFRDs7O0lBRUFwSSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQk0sRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBVStILEtBQVYsRUFBaUI7TUFDN0NDLHNCQUFzQixDQUFDLElBQUQsRUFBT0QsS0FBUCxDQUF0QixDQUQ2QyxDQUU3Qzs7TUFDQXJJLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUStCLFFBQVIsQ0FBaUIsUUFBakI7SUFDSCxDQUpEO0lBTUE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ1EsU0FBU3VHLHNCQUFULENBQWdDQyxPQUFoQyxFQUF5Qy9GLENBQXpDLEVBQTRDO01BQ3hDLElBQUlnRyxTQUFTLEdBQUdoQixRQUFRLENBQUN4SCxDQUFDLENBQUN1SSxPQUFELENBQUQsQ0FBVy9HLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBRCxDQUF4QjtNQUFBLElBQ0lpSCxZQUFZLEdBQUd6SSxDQUFDLENBQUMseUJBQUQsQ0FEcEI7TUFBQSxJQUVJMEksWUFBWSxHQUFHMUksQ0FBQyxDQUFDLGdCQUFELENBRnBCOztNQUlBLElBQUksQ0FBQzJJLGdCQUFnQixDQUFDbkcsQ0FBRCxDQUFyQixFQUEwQjtRQUN0QixJQUFJK0YsT0FBTyxDQUFDSyxLQUFSLENBQWN6SCxNQUFkLEdBQXVCcUgsU0FBUyxHQUFHLENBQXZDLEVBQ0lELE9BQU8sQ0FBQ0ssS0FBUixHQUFnQkwsT0FBTyxDQUFDSyxLQUFSLENBQWNDLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkJMLFNBQTNCLENBQWhCO01BQ1A7O01BQ0R4SSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCb0IsSUFBakIsQ0FBc0JtSCxPQUFPLENBQUNLLEtBQVIsQ0FBY3pILE1BQXBDOztNQUVBLElBQUlvSCxPQUFPLENBQUNLLEtBQVIsQ0FBY3pILE1BQWQsR0FBdUJxSCxTQUEzQixFQUFzQztRQUNsQ0MsWUFBWSxDQUFDbkgsR0FBYixDQUNJLGtCQURKLEVBRUlyQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsS0FBZCxDQUFvQk0sTUFGeEI7UUFJQWlKLFlBQVksQ0FBQ3BILEdBQWIsQ0FBaUIsT0FBakIsRUFBMEJyQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsS0FBZCxDQUFvQk0sTUFBOUMsRUFMa0MsQ0FNbEM7O1FBQ0FpSixZQUFZLENBQUMzRyxRQUFiLENBQXNCLFdBQXRCO01BQ0gsQ0FSRCxNQVFPO1FBQ0gwRyxZQUFZLENBQUNuSCxHQUFiLENBQ0ksa0JBREosRUFFSXJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxLQUFkLENBQW9CQyxPQUZ4QjtRQUlBc0osWUFBWSxDQUFDcEgsR0FBYixDQUFpQixPQUFqQixFQUEwQmtDLFVBQTFCO1FBQ0FrRixZQUFZLENBQUM1RyxXQUFiLENBQXlCLFdBQXpCO01BQ0g7O01BRUQsT0FBTyxJQUFQO0lBQ0g7SUFDRDtBQUNSO0FBQ0E7QUFDQTtBQUNBOzs7SUFDUSxTQUFTNkcsZ0JBQVQsQ0FBMEJuRyxDQUExQixFQUE2QjtNQUN6QixJQUNJQSxDQUFDLENBQUNzRyxPQUFGLElBQWEsQ0FBYixJQUNBdEcsQ0FBQyxDQUFDc0csT0FBRixJQUFhLEVBRGIsSUFFQXRHLENBQUMsQ0FBQ3NHLE9BQUYsSUFBYSxFQUZiLElBR0F0RyxDQUFDLENBQUNzRyxPQUFGLElBQWEsRUFIYixJQUlBdEcsQ0FBQyxDQUFDc0csT0FBRixJQUFhLEVBSmIsSUFLQXRHLENBQUMsQ0FBQ3NHLE9BQUYsSUFBYSxFQU5qQixFQVFJLE9BQU8sS0FBUCxDQVJKLEtBU0ssT0FBTyxJQUFQO0lBQ1I7O0lBRUQ5SSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQk0sRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBWTtNQUMxQ04sQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQjhCLFdBQWxCLENBQThCLE1BQTlCO01BQ0EsSUFBSWlILFdBQVcsR0FBRy9JLENBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCQyxPQUF6QixDQUFpQyxlQUFqQyxDQUFsQjs7TUFDQSxJQUFJOEksV0FBVyxDQUFDNUUsUUFBWixDQUFxQixNQUFyQixDQUFKLEVBQWtDO1FBQzlCNEUsV0FBVyxDQUFDakgsV0FBWixDQUF3QixNQUF4QjtRQUNBa0gscUJBQXFCLENBQUN4SSxHQUF0QixDQUEwQixFQUExQjtRQUNBd0kscUJBQXFCLENBQUNDLElBQXRCO1FBQ0FDLFVBQVUsQ0FBQ3BILFdBQVgsQ0FBdUIsTUFBdkI7TUFDSDs7TUFFRDlCLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0I4QixXQUFsQixDQUE4QixjQUE5QjtNQUNBOUIsQ0FBQyxDQUFDLG1DQUFELENBQUQsQ0FBdUM4QixXQUF2QyxDQUFtRCxNQUFuRDtJQUNILENBWkQsRUF4UDZCLENBc1E3Qjs7SUFDQSxJQUFJcUgsU0FBUyxHQUFHcEosUUFBUSxDQUFDcUosc0JBQVQsQ0FBZ0MsbUJBQWhDLENBQWhCOztJQUNBLElBQUlELFNBQVMsQ0FBQ2hJLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7TUFDdEJnSSxTQUFTLENBQUMsQ0FBRCxDQUFULENBQWFFLGdCQUFiLENBQThCLGFBQTlCLEVBQTZDLFlBQVk7UUFDckQsSUFBSXJKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUUsSUFBUixDQUFhLGNBQWIsRUFBNkJnSSxRQUE3QixHQUF3Q29CLEdBQXhDLEdBQThDLENBQWxELEVBQXFEO1VBQ2pEdEosQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JzQixHQUFwQixDQUF3QixTQUF4QixFQUFtQyxPQUFuQztRQUNILENBRkQsTUFFTztVQUNIdEIsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JzQixHQUFwQixDQUF3QixTQUF4QixFQUFtQyxNQUFuQztRQUNIO01BQ0osQ0FORDtJQU9IO0VBQ0osQ0FqUkQsRUF6SDRCLENBNFk1Qjs7RUFDQXRCLENBQUMsQ0FBQ0QsUUFBRCxDQUFELENBQVlPLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGtCQUF4QixFQUE0QyxVQUFVa0MsQ0FBVixFQUFhO0lBQ3JEO0lBQ0F4QyxDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBVzNCLElBQVg7SUFDQSxPQUFPLEtBQVA7RUFDSCxDQUpELEVBN1k0QixDQW1aNUI7O0VBQ0EsSUFBSSxPQUFPMEcsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUMvQixJQUFJdEYsR0FBSjs7SUFDQSxJQUFJakUsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVd0IsSUFBVixDQUFlLGVBQWYsS0FBbUMsS0FBdkMsRUFBOEM7TUFDMUN5QyxHQUFHLEdBQUcsSUFBTjtJQUNILENBSjhCLENBTS9COzs7SUFDQSxJQUFJdUYsY0FBYyxHQUFHekosUUFBUSxDQUFDMEosYUFBVCxDQUF1QixjQUF2QixDQUFyQjtJQUFBLElBQ0lDLGFBQWEsR0FBRyxVQURwQjtJQUFBLElBRUlDLGNBQWMsR0FBRyxTQUZyQjs7SUFJQSxJQUFJMUYsR0FBRyxLQUFLLElBQVosRUFBa0I7TUFDZHlGLGFBQWEsR0FBRyxTQUFoQjtNQUNBQyxjQUFjLEdBQUcsVUFBakI7SUFDSDs7SUFFRCxJQUFJM0osQ0FBQyxDQUFDd0osY0FBRCxDQUFELENBQWtCckksTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7TUFDOUIsSUFBSXlJLFdBQVcsR0FBRyxJQUFJTCxNQUFKLENBQVdDLGNBQVgsQ0FBbEI7TUFFQUksV0FBVyxDQUFDdEosRUFBWixDQUFlb0osYUFBZixFQUE4QixVQUFVRyxFQUFWLEVBQWM7UUFDeEMsSUFBSXRHLEtBQUssQ0FBQ1ksUUFBTixDQUFlLHVCQUFmLENBQUosRUFBNkM7VUFDekNuRSxDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBV3NGLElBQVg7VUFDQSxPQUFPLEtBQVA7UUFDSDtNQUNKLENBTEQ7SUFNSCxDQXpCOEIsQ0EyQi9COzs7SUFDQXhGLFVBQVUsQ0FBQyxZQUFZO01BQ25CLElBQUl5RixlQUFlLEdBQUdoSyxRQUFRLENBQUMwSixhQUFULENBQXVCLFlBQXZCLENBQXRCO01BQ0EsSUFBSU8sWUFBSjs7TUFFQSxJQUFJaEssQ0FBQyxDQUFDK0osZUFBRCxDQUFELENBQW1CNUksTUFBbkIsR0FBNEIsQ0FBaEMsRUFBbUM7UUFDL0I2SSxZQUFZLEdBQUcsSUFBSVQsTUFBSixDQUFXUSxlQUFYLENBQWY7UUFFQUMsWUFBWSxDQUFDQyxHQUFiLENBQWlCLEtBQWpCLEVBQXdCQyxHQUF4QixDQUE0QjtVQUN4QkMsU0FBUyxFQUFFWixNQUFNLENBQUNhLGFBRE07VUFFeEJDLFNBQVMsRUFBRTtRQUZhLENBQTVCO1FBS0FMLFlBQVksQ0FBQzFKLEVBQWIsQ0FBZ0JxSixjQUFoQixFQUFnQyxVQUFVRSxFQUFWLEVBQWM7VUFDMUMsSUFBSXRHLEtBQUssQ0FBQ1ksUUFBTixDQUFlLHVCQUFmLENBQUosRUFBNkM7WUFDekNuRSxDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBVzNCLElBQVg7WUFDQSxPQUFPLEtBQVA7VUFDSDtRQUNKLENBTEQ7TUFNSDtJQUNKLENBbkJTLEVBbUJQLEdBbkJPLENBQVYsQ0E1QitCLENBaUQvQjs7SUFDQSxJQUFJeUgsc0JBQXNCLEdBQUd2SyxRQUFRLENBQUMwSixhQUFULENBQXVCLGtCQUF2QixDQUE3Qjs7SUFFQSxJQUFJekosQ0FBQyxDQUFDc0ssc0JBQUQsQ0FBRCxDQUEwQm5KLE1BQTFCLEdBQW1DLENBQXZDLEVBQTBDO01BQ3RDLElBQUlvSixtQkFBbUIsR0FBRyxJQUFJaEIsTUFBSixDQUFXZSxzQkFBWCxDQUExQjtNQUVBQyxtQkFBbUIsQ0FBQ2pLLEVBQXBCLENBQXVCLEtBQXZCLEVBQThCLFVBQVV1SixFQUFWLEVBQWM7UUFDeEMsSUFBSXRHLEtBQUssQ0FBQ1ksUUFBTixDQUFlLHVCQUFmLENBQUosRUFBNkM7VUFDekNuRSxDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBVzNCLElBQVg7VUFDQSxPQUFPLEtBQVA7UUFDSDtNQUNKLENBTEQ7SUFNSDtFQUNKOztFQUVEN0MsQ0FBQyxDQUFDRCxRQUFELENBQUQsQ0FBWU8sRUFBWixDQUFlLE9BQWYsRUFBd0Isa0NBQXhCLEVBQTRELFVBQVVrQyxDQUFWLEVBQWE7SUFDckVBLENBQUMsQ0FBQ2tELGNBQUYsR0FEcUUsQ0FHckU7O0lBQ0ExRixDQUFDLENBQUN1RSxHQUFGLENBQU1DLElBQU4sQ0FBV2dHLE1BQVg7SUFFQWxHLFVBQVUsQ0FBQyxZQUFZO01BQ25CdEUsQ0FBQyxDQUFDZixNQUFELENBQUQsQ0FBVXdMLE9BQVYsQ0FBa0IsUUFBbEI7SUFDSCxDQUZTLEVBRVAsR0FGTyxDQUFWOztJQUlBLElBQUl6SyxDQUFDLENBQUMsMEJBQUQsQ0FBRCxDQUE4Qm1CLE1BQTlCLEdBQXVDLENBQTNDLEVBQThDO01BQzFDbUQsVUFBVSxDQUFDLFlBQVk7UUFDbkIsSUFDSWYsS0FBSyxDQUFDWSxRQUFOLENBQWUsZUFBZixLQUNBWixLQUFLLENBQUNZLFFBQU4sQ0FBZSxXQUFmLENBRkosRUFHRTtVQUNFbkUsQ0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEIwSyxJQUE5QixDQUFtQyxTQUFuQyxFQUE4QyxLQUE5QztRQUNILENBTEQsTUFLTztVQUNIMUssQ0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEIwSyxJQUE5QixDQUFtQyxTQUFuQyxFQUE4QyxJQUE5QztRQUNIO01BQ0osQ0FUUyxFQVNQLEVBVE8sQ0FBVjtJQVVILENBckJvRSxDQXVCckU7OztJQUNBLElBQUluSCxLQUFLLENBQUNZLFFBQU4sQ0FBZSxlQUFmLEtBQW1DWixLQUFLLENBQUNZLFFBQU4sQ0FBZSxXQUFmLENBQXZDLEVBQW9FO01BQ2hFQyxZQUFZLENBQUN1RyxPQUFiLENBQXFCLGVBQXJCLEVBQXNDLEtBQXRDO0lBQ0gsQ0FGRCxNQUVPO01BQ0h2RyxZQUFZLENBQUN1RyxPQUFiLENBQXFCLGVBQXJCLEVBQXNDLElBQXRDO0lBQ0gsQ0E1Qm9FLENBOEJyRTtJQUNBOzs7SUFFQSxPQUFPLEtBQVA7RUFDSCxDQWxDRCxFQXBkNEIsQ0F3ZjVCOztFQUNBM0ssQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQkUsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIwSyxHQUE1QixDQUFnQyxJQUFoQyxFQUFzQzdJLFFBQXRDLENBQStDLFNBQS9DLEVBemY0QixDQTBmNUI7O0VBQ0EvQixDQUFDLENBQUNmLE1BQUQsQ0FBRCxDQUFVNEwsTUFBVixDQUFpQixZQUFZO0lBQ3pCN0ssQ0FBQyxDQUFDdUUsR0FBRixDQUFNQyxJQUFOLENBQVdzRyxjQUFYLENBQTBCQyxZQUExQjtFQUNILENBRkQ7RUFJQS9LLENBQUMsQ0FBQywwQkFBRCxDQUFELENBQThCTSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUExQyxFQUF3RCxVQUFVa0MsQ0FBVixFQUFhO0lBQ2pFQSxDQUFDLENBQUNrRCxjQUFGO0lBQ0FsRCxDQUFDLENBQUM2RCxlQUFGO0lBQ0EsSUFBSWdCLEtBQUssR0FBR3JILENBQUMsQ0FBQyxJQUFELENBQWI7SUFBQSxJQUNJZ0wsSUFBSSxHQUFHM0QsS0FBSyxDQUFDakgsSUFBTixDQUFXLE1BQVgsQ0FEWDtJQUVBLElBQUk2SyxNQUFNLEdBQUdqTCxDQUFDLENBQUNnTCxJQUFELENBQUQsQ0FBUUMsTUFBUixFQUFiO0lBQ0EsSUFBSUMsUUFBUSxHQUFHRCxNQUFNLENBQUMzQixHQUFQLEdBQWEsRUFBNUIsQ0FOaUUsQ0FNakM7O0lBQ2hDdEosQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQm1MLE9BQWhCLENBQ0k7TUFDSUMsU0FBUyxFQUFFRjtJQURmLENBREosRUFJSSxDQUpKO0lBTUE1RyxVQUFVLENBQUMsWUFBWTtNQUNuQitDLEtBQUssQ0FDQXJFLE1BREwsQ0FDWSxXQURaLEVBRUtxSSxRQUZMLENBRWMsV0FGZCxFQUdLMUYsUUFITCxDQUdjLFdBSGQsRUFJSzdELFdBSkwsQ0FJaUIsUUFKakI7TUFLQXVGLEtBQUssQ0FBQ3RGLFFBQU4sQ0FBZSxRQUFmO0lBQ0gsQ0FQUyxFQU9QLEdBUE8sQ0FBVjtFQVFILENBckJELEVBL2Y0QixDQXNoQjVCO0VBRUE7O0VBQ0EsSUFBSXdCLEtBQUssQ0FBQ25ELElBQU4sQ0FBVyxnQkFBWCxNQUFpQyxTQUFyQyxFQUFnRDtJQUM1QztJQUNBLElBQUlrTCxRQUFRLEdBQUd0TCxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsQ0FBVixFQUFhdUwsSUFBNUI7O0lBQ0EsSUFBSUQsUUFBUSxLQUFLLElBQWpCLEVBQXVCO01BQ25CO01BQ0EsSUFBSUUsWUFBWSxHQUFHeEwsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FDZEUsSUFEYyxDQUNULHFCQUFxQm9MLFFBQXJCLEdBQWdDLEdBRHZCLEVBRWR4SyxJQUZjLEVBQW5CO01BR0EsSUFBSTJLLFlBQVksR0FBR3pMLENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQ2RFLElBRGMsQ0FDVCxxQkFBcUJvTCxRQUFyQixHQUFnQyxjQUR2QixFQUVkbEwsSUFGYyxDQUVULE9BRlMsQ0FBbkIsQ0FMbUIsQ0FRbkI7O01BQ0FKLENBQUMsQ0FBQyxtQ0FBRCxDQUFELENBQXVDYyxJQUF2QyxDQUE0QzBLLFlBQTVDO01BQ0F4TCxDQUFDLENBQUMsMkJBQUQsQ0FBRCxDQUErQjhCLFdBQS9CLEdBQTZDQyxRQUE3QyxDQUFzRDBKLFlBQXREO0lBQ0g7RUFDSixDQWZELE1BZU87SUFDSEMsT0FBTyxDQUFDQyxHQUFSLENBQVkxTSxNQUFNLENBQUMyTSxpQkFBbkIsRUFBc0NuSCxJQUF0QyxDQUNJO01BQ0lvSCxLQUFLLEVBQUUsS0FEWDtNQUVJQyxXQUFXLEVBQUUsSUFGakI7TUFHSUMsT0FBTyxFQUFFO1FBQ0xDLFFBQVEsRUFBRXZJLFNBQVMsR0FBRztNQURqQixDQUhiO01BTUl3SSxhQUFhLEVBQUU7SUFObkIsQ0FESixFQVNJLFVBQVVDLEdBQVYsRUFBZUMsQ0FBZixFQUFrQjtNQUNkO01BQ0FDLGFBQWEsQ0FBQzNILElBQWQsQ0FBbUJpSCxPQUFuQixFQUE0QjFMLENBQTVCO0lBQ0gsQ0FaTCxFQURHLENBZ0JIOztJQUNBQSxDQUFDLENBQUMsbUNBQUQsQ0FBRCxDQUF1Q00sRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsWUFBWTtNQUMzRCxJQUFJK0csS0FBSyxHQUFHckgsQ0FBQyxDQUFDLElBQUQsQ0FBYjtNQUNBcUgsS0FBSyxDQUFDZ0UsUUFBTixDQUFlLFdBQWYsRUFBNEJ2SixXQUE1QixDQUF3QyxVQUF4QztNQUNBdUYsS0FBSyxDQUFDdEYsUUFBTixDQUFlLFVBQWY7TUFDQSxJQUFJeUosWUFBWSxHQUFHbkUsS0FBSyxDQUFDdkcsSUFBTixFQUFuQjtNQUNBLElBQUkySyxZQUFZLEdBQUdwRSxLQUFLLENBQUNuSCxJQUFOLENBQVcsWUFBWCxFQUF5QkUsSUFBekIsQ0FBOEIsT0FBOUIsQ0FBbkI7TUFDQUosQ0FBQyxDQUFDLG1DQUFELENBQUQsQ0FBdUNjLElBQXZDLENBQTRDMEssWUFBNUM7TUFDQXhMLENBQUMsQ0FBQywyQkFBRCxDQUFELENBQStCOEIsV0FBL0IsR0FBNkNDLFFBQTdDLENBQXNEMEosWUFBdEQ7TUFDQSxJQUFJWSxlQUFlLEdBQUdoRixLQUFLLENBQUM3RixJQUFOLENBQVcsVUFBWCxDQUF0QjtNQUNBa0ssT0FBTyxDQUFDWSxjQUFSLENBQXVCRCxlQUF2QixFQUF3QyxVQUFVSCxHQUFWLEVBQWVDLENBQWYsRUFBa0I7UUFDdERuTSxDQUFDLENBQUMsc0NBQUQsQ0FBRCxDQUEwQ3VNLFFBQTFDO01BQ0gsQ0FGRDtJQUdILENBWkQ7RUFhSCxDQXRrQjJCLENBd2tCNUI7OztFQUNBQyxLQUFLLENBQUMvSCxJQUFOO0VBQ0ErSCxLQUFLLENBQUNDLE1BQU4sQ0FDSSx1SEFESixFQUVJLENBQUMsYUFBRCxFQUFnQixhQUFoQixDQUZKO0VBSUFELEtBQUssQ0FBQ0MsTUFBTixDQUFhLHlCQUFiO0VBQ0FELEtBQUssQ0FBQ0MsTUFBTixDQUFhLHNCQUFiO0VBRUF6TSxDQUFDLENBQUMseUNBQUQsQ0FBRCxDQUE2Q00sRUFBN0MsQ0FBZ0QsT0FBaEQsRUFBeUQsVUFBVWtDLENBQVYsRUFBYTtJQUNsRUEsQ0FBQyxDQUFDa0QsY0FBRjtJQUNBLElBQUkyQixLQUFLLEdBQUdySCxDQUFDLENBQUMsSUFBRCxDQUFiO0lBQUEsSUFDSTBNLGNBQWMsR0FBR3JGLEtBQUssQ0FBQ3BILE9BQU4sQ0FBYyx1QkFBZCxDQURyQjtJQUFBLElBRUkwTSxzQkFBc0IsR0FBR3RGLEtBRjdCO0lBQUEsSUFHSXVGLHVCQUF1QixHQUFHRixjQUFjLENBQUN4TSxJQUFmLENBQW9CLE9BQXBCLENBSDlCOztJQUtBLElBQUkwTSx1QkFBdUIsQ0FBQ3hNLElBQXhCLENBQTZCLE1BQTdCLE1BQXlDLE1BQTdDLEVBQXFEO01BQ2pEd00sdUJBQXVCLENBQUN4TSxJQUF4QixDQUE2QixNQUE3QixFQUFxQyxVQUFyQzs7TUFDQSxJQUFJNkYsT0FBSixFQUFhO1FBQ1QwRyxzQkFBc0IsQ0FDakJ6TSxJQURMLENBQ1UsS0FEVixFQUVLMk0sV0FGTCxDQUdRNUcsT0FBTyxDQUFDQyxLQUFSLENBQWMsS0FBZCxFQUFxQkMsS0FBckIsQ0FBMkI7VUFBRSxTQUFPO1FBQVQsQ0FBM0IsQ0FIUjtNQUtIO0lBQ0osQ0FURCxNQVNPLElBQUl5Ryx1QkFBdUIsQ0FBQ3hNLElBQXhCLENBQTZCLE1BQTdCLE1BQXlDLFVBQTdDLEVBQXlEO01BQzVEd00sdUJBQXVCLENBQUN4TSxJQUF4QixDQUE2QixNQUE3QixFQUFxQyxNQUFyQzs7TUFDQSxJQUFJNkYsT0FBSixFQUFhO1FBQ1QwRyxzQkFBc0IsQ0FBQ3pNLElBQXZCLENBQTRCLEtBQTVCLEVBQW1DMk0sV0FBbkMsQ0FDSTVHLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFNBQWQsRUFBeUJDLEtBQXpCLENBQStCO1VBQzNCLFNBQU87UUFEb0IsQ0FBL0IsQ0FESjtNQUtIO0lBQ0o7RUFDSixDQTFCRCxFQWpsQjRCLENBNm1CNUI7O0VBQ0FuRyxDQUFDLENBQUNmLE1BQUQsQ0FBRCxDQUFVcUIsRUFBVixDQUFhLFFBQWIsRUFBdUIsWUFBWTtJQUMvQixJQUFJTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFvTCxTQUFSLEtBQXNCLEdBQTFCLEVBQStCO01BQzNCcEwsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQjhDLE1BQWpCO0lBQ0gsQ0FGRCxNQUVPO01BQ0g5QyxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCOE0sT0FBakI7SUFDSCxDQUw4QixDQU8vQjs7O0lBQ0EsSUFBSXZKLEtBQUssQ0FBQ1ksUUFBTixDQUFlLGVBQWYsQ0FBSixFQUFxQztNQUNqQyxJQUFJNEksTUFBTSxHQUFHL00sQ0FBQyxDQUFDZixNQUFELENBQUQsQ0FBVW1NLFNBQVYsRUFBYjs7TUFFQSxJQUFJMkIsTUFBTSxHQUFHLEVBQWIsRUFBaUI7UUFDYi9NLENBQUMsQ0FDRyxxRUFESCxDQUFELENBRUVzQixHQUZGLENBRU07VUFDRjBMLFVBQVUsRUFBRSxNQURWO1VBRUYsY0FBYztRQUZaLENBRk47UUFNQWhOLENBQUMsQ0FDRywwREFESCxDQUFELENBRUVzQixHQUZGLENBRU07VUFDRjBMLFVBQVUsRUFBRSxTQURWO1VBRUYsY0FBYztRQUZaLENBRk47UUFNQWhOLENBQUMsQ0FDRyxnRkFESCxDQUFELENBRUVzQixHQUZGLENBRU0sWUFGTixFQUVvQixNQUZwQjtRQUdBdEIsQ0FBQyxDQUNHLHNFQURILENBQUQsQ0FFRXNCLEdBRkYsQ0FFTSxZQUZOLEVBRW9CLFNBRnBCO01BR0gsQ0FuQkQsTUFtQk87UUFDSHRCLENBQUMsQ0FDRyxxRUFESCxDQUFELENBRUVzQixHQUZGLENBRU07VUFDRjBMLFVBQVUsRUFBRSxTQURWO1VBRUYsY0FBYztRQUZaLENBRk47UUFNQWhOLENBQUMsQ0FDRywyREFESCxDQUFELENBRUVzQixHQUZGLENBRU07VUFDRjBMLFVBQVUsRUFBRSxTQURWO1VBRUYsY0FBYztRQUZaLENBRk47UUFNQWhOLENBQUMsQ0FDRyxnRkFESCxDQUFELENBRUVzQixHQUZGLENBRU0sWUFGTixFQUVvQixNQUZwQjtRQUdBdEIsQ0FBQyxDQUNHLHNFQURILENBQUQsQ0FFRXNCLEdBRkYsQ0FFTSxZQUZOLEVBRW9CLFNBRnBCO01BR0g7SUFDSjtFQUNKLENBbkRELEVBOW1CNEIsQ0FtcUI1Qjs7RUFDQXRCLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJNLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFlBQVk7SUFDckNOLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JtTCxPQUFoQixDQUF3QjtNQUFFQyxTQUFTLEVBQUU7SUFBYixDQUF4QixFQUEwQyxFQUExQztFQUNILENBRkQ7O0VBSUEsU0FBUzZCLGdCQUFULEdBQTRCO0lBQ3hCLElBQUlDLGFBQWEsR0FBRyxFQUFwQjs7SUFDQSxJQUFJaEssS0FBSyxDQUFDaUIsUUFBTixDQUFlLGFBQWYsQ0FBSixFQUFtQztNQUMvQitJLGFBQWEsR0FBRyxhQUFoQjtJQUNILENBRkQsTUFFTyxJQUFJaEssS0FBSyxDQUFDaUIsUUFBTixDQUFlLGlCQUFmLENBQUosRUFBdUM7TUFDMUMrSSxhQUFhLEdBQUcsaUJBQWhCO0lBQ0gsQ0FGTSxNQUVBLElBQUloSyxLQUFLLENBQUNpQixRQUFOLENBQWUsa0JBQWYsQ0FBSixFQUF3QztNQUMzQytJLGFBQWEsR0FBRyxrQkFBaEI7SUFDSCxDQUZNLE1BRUE7TUFDSEEsYUFBYSxHQUFHLGNBQWhCO0lBQ0g7O0lBQ0QsT0FBT0EsYUFBUDtFQUNILENBcHJCMkIsQ0FzckI1Qjs7O0VBQ0EsSUFBSUMsVUFBVSxHQUFHakssS0FBSyxDQUFDOUMsSUFBTixDQUFXLGFBQVgsSUFDWDhDLEtBQUssQ0FBQzlDLElBQU4sQ0FBVyxhQUFYLENBRFcsR0FFWCxjQUZOLENBdnJCNEIsQ0EyckI1Qjs7RUFDQUosQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJNLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVk7SUFDekMsSUFBSTRNLGFBQWEsR0FBR0QsZ0JBQWdCLEVBQXBDO0lBQUEsSUFDSUcsY0FBYyxHQUFHLEVBRHJCO0lBQUEsSUFFSUMsVUFBVSxHQUFHakosWUFBWSxDQUFDQyxPQUFiLENBQ1Q4SSxVQUFVLEdBQUcsWUFESixFQUVURCxhQUZTLENBRmpCLENBRHlDLENBUXpDOztJQUNBLElBQUlBLGFBQWEsS0FBSyxhQUF0QixFQUFxQztNQUNqQztNQUNBRSxjQUFjLEdBQUcsYUFBakI7SUFDSCxDQUhELE1BR087TUFDSDtNQUNBO01BQ0EsSUFBSUYsYUFBYSxLQUFLRyxVQUF0QixFQUFrQztRQUM5QkQsY0FBYyxHQUFHLGNBQWpCO01BQ0gsQ0FGRCxNQUVPO1FBQ0hBLGNBQWMsR0FBR0MsVUFBVSxHQUFHQSxVQUFILEdBQWdCLGNBQTNDO01BQ0g7SUFDSixDQXBCd0MsQ0FxQnpDOzs7SUFDQWpKLFlBQVksQ0FBQ3VHLE9BQWIsQ0FBcUJ3QyxVQUFVLEdBQUcsWUFBbEMsRUFBZ0RELGFBQWhELEVBdEJ5QyxDQXVCekM7O0lBQ0E5SSxZQUFZLENBQUN1RyxPQUFiLENBQXFCd0MsVUFBVSxHQUFHLGVBQWxDLEVBQW1EQyxjQUFuRCxFQXhCeUMsQ0EwQnpDOztJQUNBRSxTQUFTLENBQUNGLGNBQUQsQ0FBVCxDQTNCeUMsQ0E2QnpDOztJQUNBcE4sQ0FBQyxDQUFDLDhDQUFELENBQUQsQ0FBa0RzQixHQUFsRCxDQUFzRDtNQUNsRDBMLFVBQVUsRUFBRSxTQURzQztNQUVsRCxjQUFjO0lBRm9DLENBQXREO0lBSUFoTixDQUFDLENBQUMseURBQUQsQ0FBRCxDQUE2RHNCLEdBQTdELENBQ0ksWUFESixFQUVJLFNBRko7RUFJSCxDQXRDRCxFQTVyQjRCLENBb3VCNUI7O0VBQ0EsSUFBSWlNLHlCQUF5QixHQUFHbkosWUFBWSxDQUFDQyxPQUFiLENBQzVCOEksVUFBVSxHQUFHLGVBRGUsQ0FBaEMsQ0FydUI0QixDQXl1QjVCO0VBQ0E7RUFDQTs7RUFFQSxTQUFTRyxTQUFULENBQW1CQyx5QkFBbkIsRUFBOEM7SUFDMUMsSUFBSUMsWUFBWSxHQUFHeE4sQ0FBQyxDQUFDLGlCQUFELENBQXBCO0lBQUEsSUFDSWtOLGFBQWEsR0FBR0QsZ0JBQWdCLEVBRHBDO0lBQUEsSUFFSW5GLFFBQVEsR0FBRzlILENBQUMsQ0FBQyxZQUFELENBRmhCO0lBQUEsSUFHSXlOLE1BQU0sR0FBR3pOLENBQUMsQ0FBQyxnQkFBRCxDQUhkO0lBQUEsSUFJSTtJQUNBb04sY0FBYyxHQUFHRyx5QkFBeUIsR0FDcENBLHlCQURvQyxHQUVwQ0wsYUFQVjtJQVNBaEssS0FBSyxDQUFDcEIsV0FBTixDQUFrQiw4Q0FBbEI7O0lBRUEsSUFBSXNMLGNBQWMsS0FBSyxhQUF2QixFQUFzQztNQUNsQ2xLLEtBQUssQ0FBQ25CLFFBQU4sQ0FBZSxhQUFmO01BQ0ErRixRQUFRLENBQUNoRyxXQUFULENBQXFCLFlBQXJCLEVBQW1DQyxRQUFuQyxDQUE0QyxXQUE1QztNQUNBMEwsTUFBTSxDQUFDM0wsV0FBUCxDQUFtQixjQUFuQixFQUFtQ0MsUUFBbkMsQ0FBNEMsYUFBNUM7TUFDQW9CLEtBQUssQ0FBQ2xCLFdBQU4sQ0FBa0IsUUFBbEI7TUFDQW1CLFVBQVUsQ0FBQ25CLFdBQVgsQ0FBdUIsUUFBdkI7TUFDQW9CLGNBQWMsQ0FBQ3BCLFdBQWYsQ0FBMkIsUUFBM0I7TUFDQXFCLGFBQWEsQ0FBQ3JCLFdBQWQsQ0FBMEIsUUFBMUI7TUFDQXVMLFlBQVksQ0FDUHROLElBREwsQ0FDVSxVQURWLEVBRUsyTSxXQUZMLENBRWlCLDJCQUZqQjtJQUdILENBWEQsTUFXTyxJQUFJTyxjQUFjLEtBQUssaUJBQXZCLEVBQTBDO01BQzdDbEssS0FBSyxDQUFDbkIsUUFBTixDQUFlLGlCQUFmO01BQ0ErRixRQUFRLENBQUNoRyxXQUFULENBQXFCLFdBQXJCLEVBQWtDQyxRQUFsQyxDQUEyQyxZQUEzQztNQUNBMEwsTUFBTSxDQUFDM0wsV0FBUCxDQUFtQixhQUFuQixFQUFrQ0MsUUFBbEMsQ0FBMkMsY0FBM0M7TUFDQXFCLFVBQVUsQ0FBQ25CLFdBQVgsQ0FBdUIsUUFBdkI7TUFDQWtCLEtBQUssQ0FBQ2xCLFdBQU4sQ0FBa0IsUUFBbEI7TUFDQXFCLGFBQWEsQ0FBQ3JCLFdBQWQsQ0FBMEIsUUFBMUI7TUFDQW9CLGNBQWMsQ0FBQ3BCLFdBQWYsQ0FBMkIsUUFBM0I7TUFDQXVMLFlBQVksQ0FDUHROLElBREwsQ0FDVSxTQURWLEVBRUsyTSxXQUZMLENBRWlCLDRCQUZqQjtJQUdILENBWE0sTUFXQSxJQUFJTyxjQUFjLEtBQUssa0JBQXZCLEVBQTJDO01BQzlDbEssS0FBSyxDQUFDbkIsUUFBTixDQUFlLGtCQUFmO01BQ0ErRixRQUFRLENBQUNoRyxXQUFULENBQXFCLFdBQXJCLEVBQWtDQyxRQUFsQyxDQUEyQyxZQUEzQztNQUNBMEwsTUFBTSxDQUFDM0wsV0FBUCxDQUFtQixhQUFuQixFQUFrQ0MsUUFBbEMsQ0FBMkMsY0FBM0M7TUFDQXFCLFVBQVUsQ0FBQ25CLFdBQVgsQ0FBdUIsUUFBdkI7TUFDQWtCLEtBQUssQ0FBQ2xCLFdBQU4sQ0FBa0IsUUFBbEI7TUFDQXFCLGFBQWEsQ0FBQ3JCLFdBQWQsQ0FBMEIsUUFBMUI7TUFDQW9CLGNBQWMsQ0FBQ3BCLFdBQWYsQ0FBMkIsUUFBM0I7TUFDQXVMLFlBQVksQ0FDUHROLElBREwsQ0FDVSxTQURWLEVBRUsyTSxXQUZMLENBRWlCLDRCQUZqQjtJQUdILENBWE0sTUFXQTtNQUNIM0osS0FBSyxDQUFDbkIsUUFBTixDQUFlLGNBQWY7TUFDQStGLFFBQVEsQ0FBQ2hHLFdBQVQsQ0FBcUIsV0FBckIsRUFBa0NDLFFBQWxDLENBQTJDLFlBQTNDO01BQ0EwTCxNQUFNLENBQUMzTCxXQUFQLENBQW1CLGFBQW5CLEVBQWtDQyxRQUFsQyxDQUEyQyxjQUEzQztNQUNBcUIsVUFBVSxDQUFDbkIsV0FBWCxDQUF1QixRQUF2QjtNQUNBa0IsS0FBSyxDQUFDbEIsV0FBTixDQUFrQixRQUFsQjtNQUNBcUIsYUFBYSxDQUFDckIsV0FBZCxDQUEwQixRQUExQjtNQUNBb0IsY0FBYyxDQUFDcEIsV0FBZixDQUEyQixRQUEzQjtNQUNBdUwsWUFBWSxDQUNQdE4sSUFETCxDQUNVLFNBRFYsRUFFSzJNLFdBRkwsQ0FFaUIsNEJBRmpCO0lBR0gsQ0F4RHlDLENBeUQxQzs7O0lBQ0EsSUFBSTdNLENBQUMsQ0FBQyw2QkFBNkJvTixjQUE3QixHQUE4QyxHQUEvQyxDQUFELENBQXFEak0sTUFBckQsR0FBOEQsQ0FBbEUsRUFBcUU7TUFDakVtRCxVQUFVLENBQUMsWUFBWTtRQUNuQnRFLENBQUMsQ0FBQyw2QkFBNkJvTixjQUE3QixHQUE4QyxHQUEvQyxDQUFELENBQXFEMUMsSUFBckQsQ0FDSSxTQURKLEVBRUksSUFGSjtNQUlILENBTFMsQ0FBVjtJQU1IO0VBQ0o7QUFDSixDQWh6QkQsRUFnekJHekwsTUFoekJILEVBZ3pCV2MsUUFoekJYLEVBZ3pCcUIyTixNQWh6QnJCLEdBa3pCQTs7O0FBQ0EsU0FBU0MsVUFBVCxDQUFvQkMsUUFBcEIsRUFBOEI7RUFDMUI7RUFDQSxJQUFJQSxRQUFRLElBQUlDLFNBQWhCLEVBQTJCO0lBQ3ZCRCxRQUFRLEdBQUcsSUFBWDtFQUNIOztFQUNELE9BQU8zSCxPQUFPLENBQUNoRCxPQUFSLENBQWdCO0lBQUUrRSxLQUFLLEVBQUU0RixRQUFUO0lBQW1CbEcsTUFBTSxFQUFFa0c7RUFBM0IsQ0FBaEIsQ0FBUDtBQUNILEVBRUQ7OztBQUNBLElBQUksT0FBT0YsTUFBTSxDQUFDSSxTQUFkLEtBQTRCLFVBQWhDLEVBQTRDO0VBQ3hDSixNQUFNLENBQUNJLFNBQVAsQ0FBaUJDLFdBQWpCLENBQTZCO0lBQ3pCQyxZQUFZLEVBQUUsTUFEVztJQUV6QkMsY0FBYyxFQUFFLHdCQUFVQyxLQUFWLEVBQWlCQyxPQUFqQixFQUEwQjtNQUN0QyxJQUNJQSxPQUFPLENBQUNuTCxNQUFSLEdBQWlCbUIsUUFBakIsQ0FBMEIsYUFBMUIsS0FDQWdLLE9BQU8sQ0FBQ2hLLFFBQVIsQ0FBaUIsU0FBakIsQ0FEQSxJQUVBZ0ssT0FBTyxDQUFDL04sSUFBUixDQUFhLE1BQWIsTUFBeUIsVUFIN0IsRUFJRTtRQUNFOE4sS0FBSyxDQUFDRSxXQUFOLENBQWtCRCxPQUFPLENBQUNuTCxNQUFSLEVBQWxCO01BQ0gsQ0FORCxNQU1PLElBQUltTCxPQUFPLENBQUNoSyxRQUFSLENBQWlCLGtCQUFqQixDQUFKLEVBQTBDO1FBQzdDK0osS0FBSyxDQUFDRSxXQUFOLENBQWtCRCxPQUFPLENBQUNuTCxNQUFSLEdBQWlCcUksUUFBakIsQ0FBMEIsT0FBMUIsQ0FBbEI7TUFDSCxDQUZNLE1BRUE7UUFDSDZDLEtBQUssQ0FBQ0UsV0FBTixDQUFrQkQsT0FBbEI7TUFDSDs7TUFFRCxJQUFJQSxPQUFPLENBQUNuTCxNQUFSLEdBQWlCbUIsUUFBakIsQ0FBMEIsYUFBMUIsQ0FBSixFQUE4QztRQUMxQ2dLLE9BQU8sQ0FBQ25MLE1BQVIsR0FBaUJqQixRQUFqQixDQUEwQixZQUExQjtNQUNIO0lBQ0osQ0FsQndCO0lBbUJ6QnNNLFNBQVMsRUFBRSxtQkFBVUYsT0FBVixFQUFtQkcsVUFBbkIsRUFBK0JDLFVBQS9CLEVBQTJDO01BQ2xEdk8sQ0FBQyxDQUFDbU8sT0FBRCxDQUFELENBQVdwTSxRQUFYLENBQW9CLE9BQXBCOztNQUNBLElBQUkvQixDQUFDLENBQUNtTyxPQUFELENBQUQsQ0FBV25MLE1BQVgsR0FBb0JtQixRQUFwQixDQUE2QixhQUE3QixDQUFKLEVBQWlEO1FBQzdDbkUsQ0FBQyxDQUFDbU8sT0FBRCxDQUFELENBQVduTCxNQUFYLEdBQW9CakIsUUFBcEIsQ0FBNkIsWUFBN0I7TUFDSDtJQUNKLENBeEJ3QjtJQXlCekJ5TSxXQUFXLEVBQUUscUJBQVVMLE9BQVYsRUFBbUJHLFVBQW5CLEVBQStCQyxVQUEvQixFQUEyQztNQUNwRHZPLENBQUMsQ0FBQ21PLE9BQUQsQ0FBRCxDQUFXck0sV0FBWCxDQUF1QixPQUF2Qjs7TUFDQSxJQUFJOUIsQ0FBQyxDQUFDbU8sT0FBRCxDQUFELENBQVduTCxNQUFYLEdBQW9CbUIsUUFBcEIsQ0FBNkIsYUFBN0IsQ0FBSixFQUFpRDtRQUM3Q25FLENBQUMsQ0FBQ21PLE9BQUQsQ0FBRCxDQUFXbkwsTUFBWCxHQUFvQmxCLFdBQXBCLENBQWdDLFlBQWhDO01BQ0g7SUFDSjtFQTlCd0IsQ0FBN0I7QUFnQ0gsRUFFRDs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29yZS9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICBGaWxlIE5hbWU6IGFwcC5qc1xuICBEZXNjcmlwdGlvbjogVGVtcGxhdGUgcmVsYXRlZCBhcHAgSlMuXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgSXRlbSBOYW1lOiBCaWNyeXB0byAtIENyeXB0byBUcmFkaW5nIFBsYXRmb3JtXG4gIEF1dGhvcjogTWFzaERpdlxuICBBdXRob3IgVVJMOiBoaHR0cDovL3d3dy50aGVtZWZvcmVzdC5uZXQvdXNlci9tYXNoZGl2XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xud2luZG93LmNvbG9ycyA9IHtcbiAgICBzb2xpZDoge1xuICAgICAgICBwcmltYXJ5OiBcIiM3MzY3RjBcIixcbiAgICAgICAgc2Vjb25kYXJ5OiBcIiM4Mjg2OGJcIixcbiAgICAgICAgc3VjY2VzczogXCIjMjhDNzZGXCIsXG4gICAgICAgIGluZm86IFwiIzAwY2ZlOFwiLFxuICAgICAgICB3YXJuaW5nOiBcIiNGRjlGNDNcIixcbiAgICAgICAgZGFuZ2VyOiBcIiNFQTU0NTVcIixcbiAgICAgICAgZGFyazogXCIjNGI0YjRiXCIsXG4gICAgICAgIGJsYWNrOiBcIiMwMDBcIixcbiAgICAgICAgd2hpdGU6IFwiI2ZmZlwiLFxuICAgICAgICBib2R5OiBcIiNmOGY4ZjhcIixcbiAgICB9LFxuICAgIGxpZ2h0OiB7XG4gICAgICAgIHByaW1hcnk6IFwiIzczNjdGMDFhXCIsXG4gICAgICAgIHNlY29uZGFyeTogXCIjODI4NjhiMWFcIixcbiAgICAgICAgc3VjY2VzczogXCIjMjhDNzZGMWFcIixcbiAgICAgICAgaW5mbzogXCIjMDBjZmU4MWFcIixcbiAgICAgICAgd2FybmluZzogXCIjRkY5RjQzMWFcIixcbiAgICAgICAgZGFuZ2VyOiBcIiNFQTU0NTUxYVwiLFxuICAgICAgICBkYXJrOiBcIiM0YjRiNGIxYVwiLFxuICAgIH0sXG59O1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50LCAkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgJChcIi5jdXN0b20tZGF0YS1icy10YWJsZVwiKVxuICAgICAgICAuY2xvc2VzdChcIi5jYXJkXCIpXG4gICAgICAgIC5maW5kKFwiLmNhcmQtc2VhcmNoXCIpXG4gICAgICAgIC5hcHBlbmQoXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZsb2F0LWVuZFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hfdGFibGVcIiBjbGFzcz1cImZvcm0tY29udHJvbCBiZy13aGl0ZVwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFRhYmxlXCI+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiPjxpIGNsYXNzPVwiYmkgYmktc2VhcmNoXCI+PC9pPjwvYnV0dG9uPjwvZGl2PidcbiAgICAgICAgKTtcbiAgICAkKFwiLmN1c3RvbS1kYXRhLWJzLXRhYmxlXCIpXG4gICAgICAgIC5jbG9zZXN0KFwiLmNhcmRcIilcbiAgICAgICAgLmZpbmQoXCIuY2FyZC1ib2R5XCIpXG4gICAgICAgIC5hdHRyKFwic3R5bGVcIiwgXCJwYWRkaW5nLXRvcDowcHhcIik7XG4gICAgdmFyIHRyX2VsZW1lbnRzID0gJChcIi5jdXN0b20tZGF0YS1icy10YWJsZSB0Ym9keSB0clwiKTtcbiAgICAkKGRvY3VtZW50KS5vbihcImlucHV0XCIsIFwiaW5wdXRbbmFtZT1zZWFyY2hfdGFibGVdXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQodGhpcykudmFsKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgdmFyIG1hdGNoID0gdHJfZWxlbWVudHNcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGlkeCwgZWxlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKGVsZW0pLnRleHQoKS50cmltKCkudG9VcHBlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgPj0gMFxuICAgICAgICAgICAgICAgICAgICA/IGVsZW1cbiAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KCk7XG4gICAgICAgIHZhciB0YWJsZV9jb250ZW50ID0gJChcIi5jdXN0b20tZGF0YS1icy10YWJsZSB0Ym9keVwiKTtcbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0YWJsZV9jb250ZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgJzx0cj48dGQgY29sc3Bhbj1cIjEwMCVcIiBjbGFzcz1cInRleHQtY2VudGVyXCI+RGF0YSBOb3QgRm91bmQ8L3RkPjwvdHI+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhYmxlX2NvbnRlbnQuaHRtbChtYXRjaCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBpbWcgPSAkKFwiLmJnX2ltZ1wiKTtcbiAgICBpbWcuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBiZyA9IFwidXJsKFwiICsgJCh0aGlzKS5kYXRhKFwiYmFja2dyb3VuZFwiKSArIFwiKVwiO1xuICAgICAgICByZXR1cm4gYmc7XG4gICAgfSk7XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnW2RhdGEtYnMtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTY3JlZW4oKSB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgJChcIiN0b2dnbGVGdWxsU2NyZWVuXCIpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYmktYXNwZWN0LXJhdGlvXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYmktZnVsbHNjcmVlbi1leGl0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgICAgICAkKFwiI3RvZ2dsZUZ1bGxTY3JlZW5cIilcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYmktZnVsbHNjcmVlbi1leGl0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImJpLWFzcGVjdC1yYXRpb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoXCIuZnVsbHNjcmVlbi1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwcm9QaWNVUkwoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzWzBdKSB7XG4gICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aWV3ID0gJChpbnB1dClcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudHMoXCIudGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoXCIucHJvZmlsZVBpY1ByZXZpZXdcIik7XG4gICAgICAgICAgICAgICAgJChwcmV2aWV3KS5jc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInVybChcIiArIGUudGFyZ2V0LnJlc3VsdCArIFwiKVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAkKHByZXZpZXcpLmFkZENsYXNzKFwiaGFzLWltYWdlXCIpO1xuICAgICAgICAgICAgICAgICQocHJldmlldykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQocHJldmlldykuZmFkZUluKDY1MCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoaW5wdXQuZmlsZXNbMF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgICQoXCIucHJvZmlsZVBpY1VwbG9hZFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb1BpY1VSTCh0aGlzKTtcbiAgICB9KTtcblxuICAgICQoXCIucmVtb3ZlLWltYWdlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoXCIucHJvZmlsZVBpY1ByZXZpZXdcIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcIm5vbmVcIik7XG4gICAgICAgICQodGhpcykucGFyZW50cyhcIi5wcm9maWxlUGljUHJldmlld1wiKS5yZW1vdmVDbGFzcyhcImhhcy1pbWFnZVwiKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKFwiLnRodW1iXCIpLmZpbmQoXCJpbnB1dFt0eXBlPWZpbGVdXCIpLnZhbChcIlwiKTtcbiAgICB9KTtcblxuICAgICQoXCJmb3JtXCIpLm9uKFwiY2hhbmdlXCIsIFwiLmZpbGUtdXBsb2FkLWZpZWxkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudChcIi5maWxlLXVwbG9hZC13cmFwcGVyXCIpXG4gICAgICAgICAgICAuYXR0cihcbiAgICAgICAgICAgICAgICBcImRhdGEtdGV4dFwiLFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnZhbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8uKihcXC98XFxcXCkvLCBcIlwiKVxuICAgICAgICAgICAgKTtcbiAgICB9KTtcbiAgICB2YXIgJGh0bWwgPSAkKFwiaHRtbFwiKTtcbiAgICB2YXIgJGxvZ28gPSAkKFwiI2xvZ29cIik7XG4gICAgdmFyICRsb2dvX2RhcmsgPSAkKFwiI2xvZ29fZGFya1wiKTtcbiAgICB2YXIgJGZhdmljb25fbGlnaHQgPSAkKFwiI2Zhdmljb25fbGlnaHRcIik7XG4gICAgdmFyICRmYXZpY29uX2RhcmsgPSAkKFwiI2Zhdmljb25fZGFya1wiKTtcbiAgICB2YXIgJGJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICB2YXIgJHRleHRjb2xvciA9IFwiIzRlNTE1NFwiO1xuICAgIHZhciBhc3NldFBhdGggPSBcIi4uLy4uLy4uL2FwcC1hc3NldHMvXCI7XG5cbiAgICBpZiAoJChcImJvZHlcIikuYXR0cihcImRhdGEtZnJhbWV3b3JrXCIpID09PSBcImxhcmF2ZWxcIikge1xuICAgICAgICBhc3NldFBhdGggPSAkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1hc3NldC1wYXRoXCIpO1xuICAgIH1cblxuICAgIC8vIHRvIHJlbW92ZSBzbSBjb250cm9sIGNsYXNzZXMgZnJvbSBkYXRhdGFibGVzXG4gICAgaWYgKCQuZm4uZGF0YVRhYmxlKSB7XG4gICAgICAgICQuZXh0ZW5kKCQuZm4uZGF0YVRhYmxlLmV4dC5jbGFzc2VzLCB7XG4gICAgICAgICAgICBzRmlsdGVySW5wdXQ6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICBzTGVuZ3RoU2VsZWN0OiBcImZvcm0tc2VsZWN0XCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcnRsO1xuICAgICAgICB2YXIgY29tcGFjdE1lbnUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkYm9keS5oYXNDbGFzcyhcIm1lbnUtY29sbGFwc2VkXCIpIHx8XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1lbnVDb2xsYXBzZWRcIikgPT09IFwidHJ1ZVwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29tcGFjdE1lbnUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQoXCJodG1sXCIpLmRhdGEoXCJ0ZXh0ZGlyZWN0aW9uXCIpID09IFwicnRsXCIpIHtcbiAgICAgICAgICAgIHJ0bCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKS5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgICAgICAgfSwgMTIwMCk7XG5cbiAgICAgICAgJC5hcHAubWVudS5pbml0KGNvbXBhY3RNZW51KTtcblxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGNvbmZpZ3VyYXRpb25zXG4gICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICBzcGVlZDogMzAwLCAvLyBzZXQgc3BlZWQgdG8gZXhwYW5kIC8gY29sbGFwc2UgbWVudVxuICAgICAgICB9O1xuICAgICAgICBpZiAoJC5hcHAubmF2LmluaXRpYWxpemVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgJC5hcHAubmF2LmluaXQoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFVuaXNvbi5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoYnApIHtcbiAgICAgICAgICAgICQuYXBwLm1lbnUuY2hhbmdlKGNvbXBhY3RNZW51KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVG9vbHRpcCBJbml0aWFsaXphdGlvblxuICAgICAgICAvLyAkKCdbZGF0YS1icy10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgICAgIC8vICAgY29udGFpbmVyOiAnYm9keSdcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHZhciB0b29sdGlwVHJpZ2dlckxpc3QgPSBbXS5zbGljZS5jYWxsKFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYnMtdG9nZ2xlPVwidG9vbHRpcFwiXScpXG4gICAgICAgICk7XG4gICAgICAgIHZhciB0b29sdGlwTGlzdCA9IHRvb2x0aXBUcmlnZ2VyTGlzdC5tYXAoZnVuY3Rpb24gKHRvb2x0aXBUcmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgYm9vdHN0cmFwLlRvb2x0aXAodG9vbHRpcFRyaWdnZXJFbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNpYmxlIENhcmRcbiAgICAgICAgJCgnYVtkYXRhLWFjdGlvbj1cImNvbGxhcHNlXCJdJykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KFwiLmNhcmRcIilcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oXCIuY2FyZC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmNvbGxhcHNlKFwidG9nZ2xlXCIpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KFwiLmNhcmRcIilcbiAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtYWN0aW9uPVwiY29sbGFwc2VcIl0nKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcInJvdGF0ZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2FydCBkcm9wZG93biB0b3VjaHNwaW5cbiAgICAgICAgaWYgKCQoXCIudG91Y2hzcGluLWNhcnRcIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJChcIi50b3VjaHNwaW4tY2FydFwiKS5Ub3VjaFNwaW4oe1xuICAgICAgICAgICAgICAgIGJ1dHRvbmRvd25fY2xhc3M6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgYnV0dG9udXBfY2xhc3M6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgYnV0dG9uZG93bl90eHQ6IGZlYXRoZXIuaWNvbnNbXCJtaW51c1wiXS50b1N2ZygpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnVwX3R4dDogZmVhdGhlci5pY29uc1tcInBsdXNcIl0udG9TdmcoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gbm90IGNsb3NlIGNhcnQgb3Igbm90aWZpY2F0aW9uIGRyb3Bkb3duIG9uIGNsaWNrIG9mIHRoZSBpdGVtc1xuICAgICAgICAkKFxuICAgICAgICAgICAgXCIuZHJvcGRvd24tbm90aWZpY2F0aW9uIC5kcm9wZG93bi1tZW51LCAuZHJvcGRvd24tY2FydCAuZHJvcGRvd24tbWVudVwiXG4gICAgICAgICkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIE5vdGlmaWNhdGlvbnMgJiBtZXNzYWdlcyBzY3JvbGxhYmxlXG4gICAgICAgICQoXCIuc2Nyb2xsYWJsZS1jb250YWluZXJcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsYWJsZV9jb250YWluZXIgPSBuZXcgUGVyZmVjdFNjcm9sbGJhcigkKHRoaXMpWzBdLCB7XG4gICAgICAgICAgICAgICAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVsb2FkIENhcmRcbiAgICAgICAgJCgnYVtkYXRhLWFjdGlvbj1cInJlbG9hZFwiXScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGJsb2NrX2VsZSA9ICQodGhpcykuY2xvc2VzdChcIi5jYXJkXCIpO1xuICAgICAgICAgICAgdmFyIHJlbG9hZEFjdGlvbk92ZXJsYXk7XG4gICAgICAgICAgICBpZiAoJGh0bWwuaGFzQ2xhc3MoXCJkYXJrLWxheW91dFwiKSkge1xuICAgICAgICAgICAgICAgIHZhciByZWxvYWRBY3Rpb25PdmVybGF5ID0gXCIjMTAxNjNhXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByZWxvYWRBY3Rpb25PdmVybGF5ID0gXCIjZmZmXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBCbG9jayBFbGVtZW50XG4gICAgICAgICAgICBibG9ja19lbGUuYmxvY2soe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZlYXRoZXIuaWNvbnNbXCJyZWZyZXNoLWN3XCJdLnRvU3ZnKHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFwiZm9udC1tZWRpdW0tMSBzcGlubmVyIHRleHQtcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAsIC8vdW5ibG9jayBhZnRlciAyIHNlY29uZHNcbiAgICAgICAgICAgICAgICBvdmVybGF5Q1NTOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogcmVsb2FkQWN0aW9uT3ZlcmxheSxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBcIndhaXRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbG9zZSBDYXJkXG4gICAgICAgICQoJ2FbZGF0YS1hY3Rpb249XCJjbG9zZVwiXScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmNhcmRcIikucmVtb3ZlQ2xhc3MoKS5zbGlkZVVwKFwiZmFzdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNhcmQgLmhlYWRpbmctZWxlbWVudHMgYVtkYXRhLWFjdGlvbj1cImNvbGxhcHNlXCJdJykub24oXG4gICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgY2FyZCA9ICR0aGlzLmNsb3Nlc3QoXCIuY2FyZFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZEhlaWdodDtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChjYXJkWzBdLnN0eWxlLmhlaWdodCwgMTApID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYXJkSGVpZ2h0ID0gY2FyZC5jc3MoXCJoZWlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQuY3NzKFwiaGVpZ2h0XCIsIFwiXCIpLmF0dHIoXCJkYXRhLWhlaWdodFwiLCBjYXJkSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC5kYXRhKFwiaGVpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkSGVpZ2h0ID0gY2FyZC5kYXRhKFwiaGVpZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5jc3MoXCJoZWlnaHRcIiwgY2FyZEhlaWdodCkuYXR0cihcImRhdGEtaGVpZ2h0XCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEFkZCBkaXNhYmxlZCBjbGFzcyB0byBpbnB1dCBncm91cCB3aGVuIGlucHV0IGlzIGRpc2FibGVkXG4gICAgICAgICQoXCJpbnB1dDpkaXNhYmxlZCwgdGV4dGFyZWE6ZGlzYWJsZWRcIilcbiAgICAgICAgICAgIC5jbG9zZXN0KFwiLmlucHV0LWdyb3VwXCIpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICAvLyBBZGQgc2lkZWJhciBncm91cCBhY3RpdmUgY2xhc3MgdG8gYWN0aXZlIG1lbnVcbiAgICAgICAgJChcIi5tYWluLW1lbnUtY29udGVudFwiKVxuICAgICAgICAgICAgLmZpbmQoXCJsaS5hY3RpdmVcIilcbiAgICAgICAgICAgIC5wYXJlbnRzKFwibGlcIilcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcInNpZGViYXItZ3JvdXAtYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIEFkZCBvcGVuIGNsYXNzIHRvIHBhcmVudCBsaXN0IGl0ZW0gaWYgc3ViaXRlbSBpcyBhY3RpdmUgZXhjZXB0IGNvbXBhY3QgbWVudVxuICAgICAgICB2YXIgbWVudVR5cGUgPSAkYm9keS5kYXRhKFwibWVudVwiKTtcbiAgICAgICAgaWYgKG1lbnVUeXBlICE9IFwiaG9yaXpvbnRhbC1tZW51XCIgJiYgY29tcGFjdE1lbnUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAkKFwiLm1haW4tbWVudS1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJsaS5hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAucGFyZW50cyhcImxpXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVudVR5cGUgPT0gXCJob3Jpem9udGFsLW1lbnVcIikge1xuICAgICAgICAgICAgJChcIi5tYWluLW1lbnUtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5maW5kKFwibGkuYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhcmVudHMoXCJsaTpub3QoLm5hdi1pdGVtKVwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgICAgICAkKFwiLm1haW4tbWVudS1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJsaS5hY3RpdmVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2VzdChcImxpLm5hdi1pdGVtXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwic2lkZWJhci1ncm91cC1hY3RpdmUgb3BlblwiKTtcbiAgICAgICAgICAgIC8vICQoXCIubWFpbi1tZW51LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC8vICAgLmZpbmQoXCJsaS5hY3RpdmVcIilcbiAgICAgICAgICAgIC8vICAgLnBhcmVudHMoXCJsaVwiKVxuICAgICAgICAgICAgLy8gICAuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgRHluYW1pYyBoZWlnaHQgZm9yIHRoZSBjaGFydGpzIGRpdiBmb3IgdGhlIGNoYXJ0IGFuaW1hdGlvbnMgdG8gd29ya1xuICAgICAgICB2YXIgY2hhcnRqc0RpdiA9ICQoXCIuY2hhcnRqc1wiKSxcbiAgICAgICAgICAgIGNhbnZhc0hlaWdodCA9IGNoYXJ0anNEaXYuY2hpbGRyZW4oXCJjYW52YXNcIikuYXR0cihcImhlaWdodFwiKSxcbiAgICAgICAgICAgIG1haW5NZW51ID0gJChcIi5tYWluLW1lbnVcIik7XG4gICAgICAgIGNoYXJ0anNEaXYuY3NzKFwiaGVpZ2h0XCIsIGNhbnZhc0hlaWdodCk7XG5cbiAgICAgICAgaWYgKCRib2R5Lmhhc0NsYXNzKFwiYm94ZWQtbGF5b3V0XCIpKSB7XG4gICAgICAgICAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoXCJ2ZXJ0aWNhbC1vdmVybGF5LW1lbnVcIikpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVudVdpZHRoID0gbWFpbk1lbnUud2lkdGgoKTtcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudFBvc2l0aW9uID0gJChcIi5hcHAtY29udGVudFwiKS5wb3NpdGlvbigpLmxlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIG1lbnVQb3NpdGlvbkFkanVzdCA9IGNvbnRlbnRQb3NpdGlvbiAtIG1lbnVXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoXCJtZW51LWZsaXBwZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbk1lbnUuY3NzKFwicmlnaHRcIiwgbWVudVBvc2l0aW9uQWRqdXN0ICsgXCJweFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYWluTWVudS5jc3MoXCJsZWZ0XCIsIG1lbnVQb3NpdGlvbkFkanVzdCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogVGV4dCBBcmVhIENvdW50ZXIgU2V0IFN0YXJ0ICovXG5cbiAgICAgICAgJChcIi5jaGFyLXRleHRhcmVhXCIpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjaGVja1RleHRBcmVhTWF4TGVuZ3RoKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIC8vIHRvIGxhdGVyIGNoYW5nZSB0ZXh0IGNvbG9yIGluIGRhcmsgbGF5b3V0XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKlxuICAgIENoZWNrcyB0aGUgTWF4TGVuZ3RoIG9mIHRoZSBUZXh0YXJlYVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQHByZXJlcXVpc2l0ZTogIHRleHRCb3ggPSB0ZXh0YXJlYSBkb20gZWxlbWVudFxuICAgICAgICAgICAgZSA9IHRleHRhcmVhIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IE1heCBsZW5ndGggb2YgY2hhcmFjdGVyc1xuICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVGV4dEFyZWFNYXhMZW5ndGgodGV4dEJveCwgZSkge1xuICAgICAgICAgICAgdmFyIG1heExlbmd0aCA9IHBhcnNlSW50KCQodGV4dEJveCkuZGF0YShcImxlbmd0aFwiKSksXG4gICAgICAgICAgICAgICAgY291bnRlclZhbHVlID0gJChcIi50ZXh0YXJlYS1jb3VudGVyLXZhbHVlXCIpLFxuICAgICAgICAgICAgICAgIGNoYXJUZXh0YXJlYSA9ICQoXCIuY2hhci10ZXh0YXJlYVwiKTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja1NwZWNpYWxLZXlzKGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRCb3gudmFsdWUubGVuZ3RoIDwgbWF4TGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGV4dEJveC52YWx1ZSA9IHRleHRCb3gudmFsdWUuc3Vic3RyaW5nKDAsIG1heExlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiLmNoYXItY291bnRcIikuaHRtbCh0ZXh0Qm94LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmICh0ZXh0Qm94LnZhbHVlLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJWYWx1ZS5jc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY29sb3JzLnNvbGlkLmRhbmdlclxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY2hhclRleHRhcmVhLmNzcyhcImNvbG9yXCIsIHdpbmRvdy5jb2xvcnMuc29saWQuZGFuZ2VyKTtcbiAgICAgICAgICAgICAgICAvLyB0byBjaGFuZ2UgdGV4dCBjb2xvciBhZnRlciBsaW1pdCBpcyBtYXhlZG91dCBvdXRcbiAgICAgICAgICAgICAgICBjaGFyVGV4dGFyZWEuYWRkQ2xhc3MoXCJtYXgtbGltaXRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJWYWx1ZS5jc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY29sb3JzLnNvbGlkLnByaW1hcnlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNoYXJUZXh0YXJlYS5jc3MoXCJjb2xvclwiLCAkdGV4dGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjaGFyVGV4dGFyZWEucmVtb3ZlQ2xhc3MoXCJtYXgtbGltaXRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgQ2hlY2tzIGlmIHRoZSBrZXlDb2RlIHByZXNzZWQgaXMgaW5zaWRlIHNwZWNpYWwgY2hhcnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQHByZXJlcXVpc2l0ZTogIGUgPSBlLmtleUNvZGUgb2JqZWN0IGZvciB0aGUga2V5IHByZXNzZWRcbiAgICAqL1xuICAgICAgICBmdW5jdGlvbiBjaGVja1NwZWNpYWxLZXlzKGUpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBlLmtleUNvZGUgIT0gOCAmJlxuICAgICAgICAgICAgICAgIGUua2V5Q29kZSAhPSA0NiAmJlxuICAgICAgICAgICAgICAgIGUua2V5Q29kZSAhPSAzNyAmJlxuICAgICAgICAgICAgICAgIGUua2V5Q29kZSAhPSAzOCAmJlxuICAgICAgICAgICAgICAgIGUua2V5Q29kZSAhPSAzOSAmJlxuICAgICAgICAgICAgICAgIGUua2V5Q29kZSAhPSA0MFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiLmNvbnRlbnQtb3ZlcmxheVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCIuc2VhcmNoLWxpc3RcIikucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJChcIi5zZWFyY2gtaW5wdXQtY2xvc2VcIikuY2xvc2VzdChcIi5zZWFyY2gtaW5wdXRcIik7XG4gICAgICAgICAgICBpZiAoc2VhcmNoSW5wdXQuaGFzQ2xhc3MoXCJvcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXQucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0SW5wdXRmaWVsZC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXRJbnB1dGZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hMaXN0LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5hcHAtY29udGVudFwiKS5yZW1vdmVDbGFzcyhcInNob3ctb3ZlcmxheVwiKTtcbiAgICAgICAgICAgICQoXCIuYm9va21hcmstd3JhcHBlciAuYm9va21hcmstaW5wdXRcIikucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUbyBzaG93IHNoYWRvdyBpbiBtYWluIG1lbnUgd2hlbiBtZW51IHNjcm9sbHNcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtYWluLW1lbnUtY29udGVudFwiKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb250YWluZXJbMF0uYWRkRXZlbnRMaXN0ZW5lcihcInBzLXNjcm9sbC15XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKFwiLnBzX190aHVtYi15XCIpLnBvc2l0aW9uKCkudG9wID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnNoYWRvdy1ib3R0b21cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2hhZG93LWJvdHRvbVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSGlkZSBvdmVybGF5IG1lbnUgb24gY29udGVudCBvdmVybGF5IGNsaWNrIG9uIHNtYWxsIHNjcmVlbnNcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNpZGVuYXYtb3ZlcmxheVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBIaWRlIG1lbnVcbiAgICAgICAgJC5hcHAubWVudS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEV4ZWN1dGUgYmVsb3cgY29kZSBvbmx5IGlmIHdlIGZpbmQgaGFtbWVyIGpzIGZvciB0b3VjaCBzd2lwZSBmZWF0dXJlIG9uIHNtYWxsIHNjcmVlblxuICAgIGlmICh0eXBlb2YgSGFtbWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhciBydGw7XG4gICAgICAgIGlmICgkKFwiaHRtbFwiKS5kYXRhKFwidGV4dGRpcmVjdGlvblwiKSA9PSBcInJ0bFwiKSB7XG4gICAgICAgICAgICBydGwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3dpcGUgbWVudSBnZXN0dXJlXG4gICAgICAgIHZhciBzd2lwZUluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJhZy10YXJnZXRcIiksXG4gICAgICAgICAgICBzd2lwZUluQWN0aW9uID0gXCJwYW5yaWdodFwiLFxuICAgICAgICAgICAgc3dpcGVPdXRBY3Rpb24gPSBcInBhbmxlZnRcIjtcblxuICAgICAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzd2lwZUluQWN0aW9uID0gXCJwYW5sZWZ0XCI7XG4gICAgICAgICAgICBzd2lwZU91dEFjdGlvbiA9IFwicGFucmlnaHRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHN3aXBlSW5FbGVtZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgc3dpcGVJbk1lbnUgPSBuZXcgSGFtbWVyKHN3aXBlSW5FbGVtZW50KTtcblxuICAgICAgICAgICAgc3dpcGVJbk1lbnUub24oc3dpcGVJbkFjdGlvbiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCRib2R5Lmhhc0NsYXNzKFwidmVydGljYWwtb3ZlcmxheS1tZW51XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICQuYXBwLm1lbnUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtZW51IHN3aXBlIG91dCBnZXN0dXJlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN3aXBlT3V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1tZW51XCIpO1xuICAgICAgICAgICAgdmFyIHN3aXBlT3V0TWVudTtcblxuICAgICAgICAgICAgaWYgKCQoc3dpcGVPdXRFbGVtZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3dpcGVPdXRNZW51ID0gbmV3IEhhbW1lcihzd2lwZU91dEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgc3dpcGVPdXRNZW51LmdldChcInBhblwiKS5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMLFxuICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDI1MCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN3aXBlT3V0TWVudS5vbihzd2lwZU91dEFjdGlvbiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkYm9keS5oYXNDbGFzcyhcInZlcnRpY2FsLW92ZXJsYXktbWVudVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5hcHAubWVudS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICAvLyBtZW51IGNsb3NlIG9uIG92ZXJsYXkgdGFwXG4gICAgICAgIHZhciBzd2lwZU91dE92ZXJsYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlbmF2LW92ZXJsYXlcIik7XG5cbiAgICAgICAgaWYgKCQoc3dpcGVPdXRPdmVybGF5RWxlbWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHN3aXBlT3V0T3ZlcmxheU1lbnUgPSBuZXcgSGFtbWVyKHN3aXBlT3V0T3ZlcmxheUVsZW1lbnQpO1xuXG4gICAgICAgICAgICBzd2lwZU91dE92ZXJsYXlNZW51Lm9uKFwidGFwXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIGlmICgkYm9keS5oYXNDbGFzcyhcInZlcnRpY2FsLW92ZXJsYXktbWVudVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAkLmFwcC5tZW51LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5tZW51LXRvZ2dsZSwgLm1vZGVybi1uYXYtdG9nZ2xlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBUb2dnbGUgbWVudVxuICAgICAgICAkLmFwcC5tZW51LnRvZ2dsZSgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJyZXNpemVcIik7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgaWYgKCQoXCIjY29sbGFwc2Utc2lkZWJhci1zd2l0Y2hcIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAkYm9keS5oYXNDbGFzcyhcIm1lbnUtZXhwYW5kZWRcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuaGFzQ2xhc3MoXCJtZW51LW9wZW5cIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjb2xsYXBzZS1zaWRlYmFyLXN3aXRjaFwiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjb2xsYXBzZS1zaWRlYmFyLXN3aXRjaFwiKS5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTYXZlIG1lbnUgY29sbGFwc2VkIHN0YXR1cyBpbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgaWYgKCRib2R5Lmhhc0NsYXNzKFwibWVudS1leHBhbmRlZFwiKSB8fCAkYm9keS5oYXNDbGFzcyhcIm1lbnUtb3BlblwiKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtZW51Q29sbGFwc2VkXCIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWVudUNvbGxhcHNlZFwiLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZGVzIGRyb3Bkb3duIG9uIGNsaWNrIG9mIG1lbnUgdG9nZ2xlXG4gICAgICAgIC8vICQoJ1tkYXRhLWJzLXRvZ2dsZT1cImRyb3Bkb3duXCJdJykuZHJvcGRvd24oJ2hpZGUnKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgQ2hpbGRyZW4gQ2xhc3NcbiAgICAkKFwiLm5hdmlnYXRpb25cIikuZmluZChcImxpXCIpLmhhcyhcInVsXCIpLmFkZENsYXNzKFwiaGFzLXN1YlwiKTtcbiAgICAvLyBVcGRhdGUgbWFudWFsIHNjcm9sbGVyIHdoZW4gd2luZG93IGlzIHJlc2l6ZWRcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJC5hcHAubWVudS5tYW51YWxTY3JvbGxlci51cGRhdGVIZWlnaHQoKTtcbiAgICB9KTtcblxuICAgICQoXCIjc2lkZWJhci1wYWdlLW5hdmlnYXRpb25cIikub24oXCJjbGlja1wiLCBcImEubmF2LWxpbmtcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgaHJlZiA9ICR0aGlzLmF0dHIoXCJocmVmXCIpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gJChocmVmKS5vZmZzZXQoKTtcbiAgICAgICAgdmFyIHNjcm9sbHRvID0gb2Zmc2V0LnRvcCAtIDgwOyAvLyBtaW51cyBmaXhlZCBoZWFkZXIgaGVpZ2h0XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGx0byxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHRoaXNcbiAgICAgICAgICAgICAgICAucGFyZW50KFwiLm5hdi1pdGVtXCIpXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKFwiLm5hdi1pdGVtXCIpXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKFwiLm5hdi1saW5rXCIpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBtYWluIG1lbnUgaW50ZXJuYXRpb25hbGl6YXRpb25cblxuICAgIC8vIGluaXQgaTE4biBhbmQgbG9hZCBsYW5ndWFnZSBmaWxlXG4gICAgaWYgKCRib2R5LmF0dHIoXCJkYXRhLWZyYW1ld29ya1wiKSA9PT0gXCJsYXJhdmVsXCIpIHtcbiAgICAgICAgLy8gY2hhbmdlIGxhbmd1YWdlIGFjY29yZGluZyB0byBkYXRhLWxhbmd1YWdlIG9mIGRyb3Bkb3duIGl0ZW1cbiAgICAgICAgdmFyIGxhbmd1YWdlID0gJChcImh0bWxcIilbMF0ubGFuZztcbiAgICAgICAgaWYgKGxhbmd1YWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHNlbGVjdGVkIGZsYWcgY2xhc3NcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZExhbmcgPSAkKFwiLmRyb3Bkb3duLWxhbmd1YWdlXCIpXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJhW2RhdGEtbGFuZ3VhZ2U9XCIgKyBsYW5ndWFnZSArIFwiXVwiKVxuICAgICAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRGbGFnID0gJChcIi5kcm9wZG93bi1sYW5ndWFnZVwiKVxuICAgICAgICAgICAgICAgIC5maW5kKFwiYVtkYXRhLWxhbmd1YWdlPVwiICsgbGFuZ3VhZ2UgKyBcIl0gLmZsYWctaWNvblwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGNsYXNzIGluIGJ1dHRvblxuICAgICAgICAgICAgJChcIiNkcm9wZG93bi1mbGFnIC5zZWxlY3RlZC1sYW5ndWFnZVwiKS50ZXh0KHNlbGVjdGVkTGFuZyk7XG4gICAgICAgICAgICAkKFwiI2Ryb3Bkb3duLWZsYWcgLmZsYWctaWNvblwiKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHNlbGVjdGVkRmxhZyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpMThuZXh0LnVzZSh3aW5kb3cuaTE4bmV4dFhIUkJhY2tlbmQpLmluaXQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZhbGxiYWNrTG5nOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYmFja2VuZDoge1xuICAgICAgICAgICAgICAgICAgICBsb2FkUGF0aDogYXNzZXRQYXRoICsgXCJkYXRhL2xvY2FsZXMve3tsbmd9fS5qc29uXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXR1cm5PYmplY3RzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIsIHQpIHtcbiAgICAgICAgICAgICAgICAvLyByZXNvdXJjZXMgaGF2ZSBiZWVuIGxvYWRlZFxuICAgICAgICAgICAgICAgIGpxdWVyeUkxOG5leHQuaW5pdChpMThuZXh0LCAkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBjaGFuZ2UgbGFuZ3VhZ2UgYWNjb3JkaW5nIHRvIGRhdGEtbGFuZ3VhZ2Ugb2YgZHJvcGRvd24gaXRlbVxuICAgICAgICAkKFwiLmRyb3Bkb3duLWxhbmd1YWdlIC5kcm9wZG93bi1pdGVtXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICR0aGlzLnNpYmxpbmdzKFwiLnNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkTGFuZyA9ICR0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEZsYWcgPSAkdGhpcy5maW5kKFwiLmZsYWctaWNvblwiKS5hdHRyKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAkKFwiI2Ryb3Bkb3duLWZsYWcgLnNlbGVjdGVkLWxhbmd1YWdlXCIpLnRleHQoc2VsZWN0ZWRMYW5nKTtcbiAgICAgICAgICAgICQoXCIjZHJvcGRvd24tZmxhZyAuZmxhZy1pY29uXCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2VsZWN0ZWRGbGFnKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TGFuZ3VhZ2UgPSAkdGhpcy5kYXRhKFwibGFuZ3VhZ2VcIik7XG4gICAgICAgICAgICBpMThuZXh0LmNoYW5nZUxhbmd1YWdlKGN1cnJlbnRMYW5ndWFnZSwgZnVuY3Rpb24gKGVyciwgdCkge1xuICAgICAgICAgICAgICAgICQoXCIubWFpbi1tZW51LCAuaG9yaXpvbnRhbC1tZW51LXdyYXBwZXJcIikubG9jYWxpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXYXZlcyBFZmZlY3RcbiAgICBXYXZlcy5pbml0KCk7XG4gICAgV2F2ZXMuYXR0YWNoKFxuICAgICAgICBcIi5idG46bm90KFtjbGFzcyo9J2J0bi1yZWxpZWYtJ10pOm5vdChbY2xhc3MqPSdidG4tZ3JhZGllbnQtJ10pOm5vdChbY2xhc3MqPSdidG4tb3V0bGluZS0nXSk6bm90KFtjbGFzcyo9J2J0bi1mbGF0LSddKVwiLFxuICAgICAgICBbXCJ3YXZlcy1mbG9hdFwiLCBcIndhdmVzLWxpZ2h0XCJdXG4gICAgKTtcbiAgICBXYXZlcy5hdHRhY2goXCJbY2xhc3MqPSdidG4tb3V0bGluZS0nXVwiKTtcbiAgICBXYXZlcy5hdHRhY2goXCJbY2xhc3MqPSdidG4tZmxhdC0nXVwiKTtcblxuICAgICQoXCIuZm9ybS1wYXNzd29yZC10b2dnbGUgLmlucHV0LWdyb3VwLXRleHRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICBpbnB1dEdyb3VwVGV4dCA9ICR0aGlzLmNsb3Nlc3QoXCIuZm9ybS1wYXNzd29yZC10b2dnbGVcIiksXG4gICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJY29uID0gJHRoaXMsXG4gICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJbnB1dCA9IGlucHV0R3JvdXBUZXh0LmZpbmQoXCJpbnB1dFwiKTtcblxuICAgICAgICBpZiAoZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQuYXR0cihcInR5cGVcIikgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJbnB1dC5hdHRyKFwidHlwZVwiLCBcInBhc3N3b3JkXCIpO1xuICAgICAgICAgICAgaWYgKGZlYXRoZXIpIHtcbiAgICAgICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJY29uXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlV2l0aChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXRoZXIuaWNvbnNbXCJleWVcIl0udG9TdmcoeyBjbGFzczogXCJmb250LXNtYWxsLTRcIiB9KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LmF0dHIoXCJ0eXBlXCIpID09PSBcInBhc3N3b3JkXCIpIHtcbiAgICAgICAgICAgIGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LmF0dHIoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgIGlmIChmZWF0aGVyKSB7XG4gICAgICAgICAgICAgICAgZm9ybVBhc3N3b3JkVG9nZ2xlSWNvbi5maW5kKFwic3ZnXCIpLnJlcGxhY2VXaXRoKFxuICAgICAgICAgICAgICAgICAgICBmZWF0aGVyLmljb25zW1wiZXllLW9mZlwiXS50b1N2Zyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJmb250LXNtYWxsLTRcIixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBvbiB3aW5kb3cgc2Nyb2xsIGJ1dHRvbiBzaG93L2hpZGVcbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDQwMCkge1xuICAgICAgICAgICAgJChcIi5zY3JvbGwtdG9wXCIpLmZhZGVJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIi5zY3JvbGwtdG9wXCIpLmZhZGVPdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9uIFNjcm9sbCBuYXZiYXIgY29sb3Igb24gaG9yaXpvbnRhbCBtZW51XG4gICAgICAgIGlmICgkYm9keS5oYXNDbGFzcyhcIm5hdmJhci1zdGF0aWNcIikpIHtcbiAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGwgPiA2NSkge1xuICAgICAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgICAgIFwiaHRtbDpub3QoLmRhcmstbGF5b3V0KSAuaG9yaXpvbnRhbC1tZW51IC5oZWFkZXItbmF2YmFyLm5hdmJhci1maXhlZFwiXG4gICAgICAgICAgICAgICAgKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3gtc2hhZG93XCI6IFwiMCA0cHggMjBweCAwIHJnYmEoMCwwLDAsLjA1KVwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgICAgIFwiLmhvcml6b250YWwtbWVudS5kYXJrLWxheW91dCAuaGVhZGVyLW5hdmJhci5uYXZiYXItZml4ZWRcIlxuICAgICAgICAgICAgICAgICkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjMTYxZDMxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm94LXNoYWRvd1wiOiBcIjAgNHB4IDIwcHggMCByZ2JhKDAsMCwwLC4wNSlcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICAgICBcImh0bWw6bm90KC5kYXJrLWxheW91dCkgLmhvcml6b250YWwtbWVudSAuaG9yaXpvbnRhbC1tZW51LXdyYXBwZXIuaGVhZGVyLW5hdmJhclwiXG4gICAgICAgICAgICAgICAgKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiI2ZmZlwiKTtcbiAgICAgICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICAgICBcIi5kYXJrLWxheW91dCAuaG9yaXpvbnRhbC1tZW51IC5ob3Jpem9udGFsLW1lbnUtd3JhcHBlci5oZWFkZXItbmF2YmFyXCJcbiAgICAgICAgICAgICAgICApLmNzcyhcImJhY2tncm91bmRcIiwgXCIjMTYxZDMxXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICAgICBcImh0bWw6bm90KC5kYXJrLWxheW91dCkgLmhvcml6b250YWwtbWVudSAuaGVhZGVyLW5hdmJhci5uYXZiYXItZml4ZWRcIlxuICAgICAgICAgICAgICAgICkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjZjhmOGY4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm94LXNoYWRvd1wiOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICAgICBcIi5kYXJrLWxheW91dCAuaG9yaXpvbnRhbC1tZW51IC5oZWFkZXItbmF2YmFyLm5hdmJhci1maXhlZFwiXG4gICAgICAgICAgICAgICAgKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiMxNjFkMzFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3gtc2hhZG93XCI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgICAgIFwiaHRtbDpub3QoLmRhcmstbGF5b3V0KSAuaG9yaXpvbnRhbC1tZW51IC5ob3Jpem9udGFsLW1lbnUtd3JhcHBlci5oZWFkZXItbmF2YmFyXCJcbiAgICAgICAgICAgICAgICApLmNzcyhcImJhY2tncm91bmRcIiwgXCIjZmZmXCIpO1xuICAgICAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgICAgIFwiLmRhcmstbGF5b3V0IC5ob3Jpem9udGFsLW1lbnUgLmhvcml6b250YWwtbWVudS13cmFwcGVyLmhlYWRlci1uYXZiYXJcIlxuICAgICAgICAgICAgICAgICkuY3NzKFwiYmFja2dyb3VuZFwiLCBcIiMxNjFkMzFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKFwiLnNjcm9sbC10b3BcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNzUpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudExheW91dCgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRMYXlvdXQgPSBcIlwiO1xuICAgICAgICBpZiAoJGh0bWwuaGFzQ2xhc3MoXCJkYXJrLWxheW91dFwiKSkge1xuICAgICAgICAgICAgY3VycmVudExheW91dCA9IFwiZGFyay1sYXlvdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmICgkaHRtbC5oYXNDbGFzcyhcImJvcmRlcmVkLWxheW91dFwiKSkge1xuICAgICAgICAgICAgY3VycmVudExheW91dCA9IFwiYm9yZGVyZWQtbGF5b3V0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoJGh0bWwuaGFzQ2xhc3MoXCJzZW1pLWRhcmstbGF5b3V0XCIpKSB7XG4gICAgICAgICAgICBjdXJyZW50TGF5b3V0ID0gXCJzZW1pLWRhcmstbGF5b3V0XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50TGF5b3V0ID0gXCJsaWdodC1sYXlvdXRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudExheW91dDtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGRhdGEgbGF5b3V0LCBmb3IgYmxhbmsgc2V0IHRvIGxpZ2h0IGxheW91dFxuICAgIHZhciBkYXRhTGF5b3V0ID0gJGh0bWwuYXR0cihcImRhdGEtbGF5b3V0XCIpXG4gICAgICAgID8gJGh0bWwuYXR0cihcImRhdGEtbGF5b3V0XCIpXG4gICAgICAgIDogXCJsaWdodC1sYXlvdXRcIjtcblxuICAgIC8vIE5hdmJhciBEYXJrIC8gTGlnaHQgTGF5b3V0IFRvZ2dsZSBTd2l0Y2hcbiAgICAkKFwiLm5hdi1saW5rLXN0eWxlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VycmVudExheW91dCA9IGdldEN1cnJlbnRMYXlvdXQoKSxcbiAgICAgICAgICAgIHN3aXRjaFRvTGF5b3V0ID0gXCJcIixcbiAgICAgICAgICAgIHByZXZMYXlvdXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgICAgICAgICAgICBkYXRhTGF5b3V0ICsgXCItcHJldi1za2luXCIsXG4gICAgICAgICAgICAgICAgY3VycmVudExheW91dFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBJZiBjdXJyZW50TGF5b3V0IGlzIG5vdCBkYXJrIGxheW91dFxuICAgICAgICBpZiAoY3VycmVudExheW91dCAhPT0gXCJkYXJrLWxheW91dFwiKSB7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggdG8gZGFya1xuICAgICAgICAgICAgc3dpdGNoVG9MYXlvdXQgPSBcImRhcmstbGF5b3V0XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggdG8gbGlnaHRcbiAgICAgICAgICAgIC8vIHN3aXRjaFRvTGF5b3V0ID0gcHJldkxheW91dCA/IHByZXZMYXlvdXQgOiAnbGlnaHQtbGF5b3V0JztcbiAgICAgICAgICAgIGlmIChjdXJyZW50TGF5b3V0ID09PSBwcmV2TGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoVG9MYXlvdXQgPSBcImxpZ2h0LWxheW91dFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hUb0xheW91dCA9IHByZXZMYXlvdXQgPyBwcmV2TGF5b3V0IDogXCJsaWdodC1sYXlvdXRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgUHJldmlvdXMgc2tpbiBpbiBsb2NhbCBkYlxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkYXRhTGF5b3V0ICsgXCItcHJldi1za2luXCIsIGN1cnJlbnRMYXlvdXQpO1xuICAgICAgICAvLyBTZXQgQ3VycmVudCBza2luIGluIGxvY2FsIGRiXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRhdGFMYXlvdXQgKyBcIi1jdXJyZW50LXNraW5cIiwgc3dpdGNoVG9MYXlvdXQpO1xuXG4gICAgICAgIC8vIENhbGwgc2V0IGxheW91dFxuICAgICAgICBzZXRMYXlvdXQoc3dpdGNoVG9MYXlvdXQpO1xuXG4gICAgICAgIC8vIFRvRG86IEN1c3RvbWl6ZXIgZml4XG4gICAgICAgICQoXCIuaG9yaXpvbnRhbC1tZW51IC5oZWFkZXItbmF2YmFyLm5hdmJhci1maXhlZFwiKS5jc3Moe1xuICAgICAgICAgICAgYmFja2dyb3VuZDogXCJpbmhlcml0XCIsXG4gICAgICAgICAgICBcImJveC1zaGFkb3dcIjogXCJpbmhlcml0XCIsXG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLmhvcml6b250YWwtbWVudSAuaG9yaXpvbnRhbC1tZW51LXdyYXBwZXIuaGVhZGVyLW5hdmJhclwiKS5jc3MoXG4gICAgICAgICAgICBcImJhY2tncm91bmRcIixcbiAgICAgICAgICAgIFwiaW5oZXJpdFwiXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBHZXQgY3VycmVudCBsb2NhbCBzdG9yYWdlIGxheW91dFxuICAgIHZhciBjdXJyZW50TG9jYWxTdG9yYWdlTGF5b3V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgIGRhdGFMYXlvdXQgKyBcIi1jdXJyZW50LXNraW5cIlxuICAgICk7XG5cbiAgICAvLyBTZXQgbGF5b3V0IG9uIHNjcmVlbiBsb2FkXG4gICAgLy8/IENvbW1lbnQgaXQgaWYgeW91IGRvbid0IHdhbnQgdG8gc3luYyBsYXlvdXQgd2l0aCBsb2NhbCBkYlxuICAgIC8vIHNldExheW91dChjdXJyZW50TG9jYWxTdG9yYWdlTGF5b3V0KTtcblxuICAgIGZ1bmN0aW9uIHNldExheW91dChjdXJyZW50TG9jYWxTdG9yYWdlTGF5b3V0KSB7XG4gICAgICAgIHZhciBuYXZMaW5rU3R5bGUgPSAkKFwiLm5hdi1saW5rLXN0eWxlXCIpLFxuICAgICAgICAgICAgY3VycmVudExheW91dCA9IGdldEN1cnJlbnRMYXlvdXQoKSxcbiAgICAgICAgICAgIG1haW5NZW51ID0gJChcIi5tYWluLW1lbnVcIiksXG4gICAgICAgICAgICBuYXZiYXIgPSAkKFwiLmhlYWRlci1uYXZiYXJcIiksXG4gICAgICAgICAgICAvLyBXaXRjaCB0byBsb2NhbCBzdG9yYWdlIGxheW91dCBpZiB3ZSBoYXZlIGVsc2UgY3VycmVudCBsYXlvdXRcbiAgICAgICAgICAgIHN3aXRjaFRvTGF5b3V0ID0gY3VycmVudExvY2FsU3RvcmFnZUxheW91dFxuICAgICAgICAgICAgICAgID8gY3VycmVudExvY2FsU3RvcmFnZUxheW91dFxuICAgICAgICAgICAgICAgIDogY3VycmVudExheW91dDtcblxuICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcyhcInNlbWktZGFyay1sYXlvdXQgZGFyay1sYXlvdXQgYm9yZGVyZWQtbGF5b3V0XCIpO1xuXG4gICAgICAgIGlmIChzd2l0Y2hUb0xheW91dCA9PT0gXCJkYXJrLWxheW91dFwiKSB7XG4gICAgICAgICAgICAkaHRtbC5hZGRDbGFzcyhcImRhcmstbGF5b3V0XCIpO1xuICAgICAgICAgICAgbWFpbk1lbnUucmVtb3ZlQ2xhc3MoXCJtZW51LWxpZ2h0XCIpLmFkZENsYXNzKFwibWVudS1kYXJrXCIpO1xuICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKFwibmF2YmFyLWxpZ2h0XCIpLmFkZENsYXNzKFwibmF2YmFyLWRhcmtcIik7XG4gICAgICAgICAgICAkbG9nby50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICRsb2dvX2RhcmsudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkZmF2aWNvbl9saWdodC50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICRmYXZpY29uX2RhcmsudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBuYXZMaW5rU3R5bGVcbiAgICAgICAgICAgICAgICAuZmluZChcIi5iaS1tb29uXCIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2VXaXRoKCc8aSBjbGFzcz1cImJpIGJpLXN1blwiPjwvaT4nKTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2l0Y2hUb0xheW91dCA9PT0gXCJib3JkZXJlZC1sYXlvdXRcIikge1xuICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoXCJib3JkZXJlZC1sYXlvdXRcIik7XG4gICAgICAgICAgICBtYWluTWVudS5yZW1vdmVDbGFzcyhcIm1lbnUtZGFya1wiKS5hZGRDbGFzcyhcIm1lbnUtbGlnaHRcIik7XG4gICAgICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoXCJuYXZiYXItZGFya1wiKS5hZGRDbGFzcyhcIm5hdmJhci1saWdodFwiKTtcbiAgICAgICAgICAgICRsb2dvX2RhcmsudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkbG9nby50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgICRmYXZpY29uX2RhcmsudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkZmF2aWNvbl9saWdodC50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICAgICAgIG5hdkxpbmtTdHlsZVxuICAgICAgICAgICAgICAgIC5maW5kKFwiLmJpLXN1blwiKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlV2l0aCgnPGkgY2xhc3M9XCJiaSBiaS1tb29uXCI+PC9pPicpO1xuICAgICAgICB9IGVsc2UgaWYgKHN3aXRjaFRvTGF5b3V0ID09PSBcInNlbWktZGFyay1sYXlvdXRcIikge1xuICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoXCJzZW1pLWRhcmstbGF5b3V0XCIpO1xuICAgICAgICAgICAgbWFpbk1lbnUucmVtb3ZlQ2xhc3MoXCJtZW51LWRhcmtcIikuYWRkQ2xhc3MoXCJtZW51LWxpZ2h0XCIpO1xuICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKFwibmF2YmFyLWRhcmtcIikuYWRkQ2xhc3MoXCJuYXZiYXItbGlnaHRcIik7XG4gICAgICAgICAgICAkbG9nb19kYXJrLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgJGxvZ28udG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkZmF2aWNvbl9kYXJrLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgJGZhdmljb25fbGlnaHQudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBuYXZMaW5rU3R5bGVcbiAgICAgICAgICAgICAgICAuZmluZChcIi5iaS1zdW5cIilcbiAgICAgICAgICAgICAgICAucmVwbGFjZVdpdGgoJzxpIGNsYXNzPVwiYmkgYmktbW9vblwiPjwvaT4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRodG1sLmFkZENsYXNzKFwibGlnaHQtbGF5b3V0XCIpO1xuICAgICAgICAgICAgbWFpbk1lbnUucmVtb3ZlQ2xhc3MoXCJtZW51LWRhcmtcIikuYWRkQ2xhc3MoXCJtZW51LWxpZ2h0XCIpO1xuICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKFwibmF2YmFyLWRhcmtcIikuYWRkQ2xhc3MoXCJuYXZiYXItbGlnaHRcIik7XG4gICAgICAgICAgICAkbG9nb19kYXJrLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgJGxvZ28udG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkZmF2aWNvbl9kYXJrLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgJGZhdmljb25fbGlnaHQudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBuYXZMaW5rU3R5bGVcbiAgICAgICAgICAgICAgICAuZmluZChcIi5iaS1zdW5cIilcbiAgICAgICAgICAgICAgICAucmVwbGFjZVdpdGgoJzxpIGNsYXNzPVwiYmkgYmktbW9vblwiPjwvaT4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgcmFkaW8gaW4gY3VzdG9taXplciBpZiB3ZSBoYXZlXG4gICAgICAgIGlmICgkKFwiaW5wdXQ6cmFkaW9bZGF0YS1sYXlvdXQ9XCIgKyBzd2l0Y2hUb0xheW91dCArIFwiXVwiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKFwiaW5wdXQ6cmFkaW9bZGF0YS1sYXlvdXQ9XCIgKyBzd2l0Y2hUb0xheW91dCArIFwiXVwiKS5wcm9wKFxuICAgICAgICAgICAgICAgICAgICBcImNoZWNrZWRcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKHdpbmRvdywgZG9jdW1lbnQsIGpRdWVyeSk7XG5cbi8vIFRvIHVzZSBmZWF0aGVyIHN2ZyBpY29ucyB3aXRoIGRpZmZlcmVudCBzaXplc1xuZnVuY3Rpb24gZmVhdGhlclNWRyhpY29uU2l6ZSkge1xuICAgIC8vIEZlYXRoZXIgSWNvbnNcbiAgICBpZiAoaWNvblNpemUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGljb25TaXplID0gXCIxNFwiO1xuICAgIH1cbiAgICByZXR1cm4gZmVhdGhlci5yZXBsYWNlKHsgd2lkdGg6IGljb25TaXplLCBoZWlnaHQ6IGljb25TaXplIH0pO1xufVxuXG4vLyBqUXVlcnkgVmFsaWRhdGlvbiBHbG9iYWwgRGVmYXVsdHNcbmlmICh0eXBlb2YgalF1ZXJ5LnZhbGlkYXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgalF1ZXJ5LnZhbGlkYXRvci5zZXREZWZhdWx0cyh7XG4gICAgICAgIGVycm9yRWxlbWVudDogXCJzcGFuXCIsXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoZXJyb3IsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCgpLmhhc0NsYXNzKFwiaW5wdXQtZ3JvdXBcIikgfHxcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmhhc0NsYXNzKFwic2VsZWN0MlwiKSB8fFxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY2hlY2tib3hcIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5wYXJlbnQoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoXCJmb3JtLWNoZWNrLWlucHV0XCIpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5wYXJlbnQoKS5zaWJsaW5ncyhcIjpsYXN0XCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LnBhcmVudCgpLmhhc0NsYXNzKFwiaW5wdXQtZ3JvdXBcIikpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCgpLmFkZENsYXNzKFwiaXMtaW52YWxpZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xuICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgaWYgKCQoZWxlbWVudCkucGFyZW50KCkuaGFzQ2xhc3MoXCJpbnB1dC1ncm91cFwiKSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYWRkQ2xhc3MoXCJpcy1pbnZhbGlkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLnBhcmVudCgpLmhhc0NsYXNzKFwiaW5wdXQtZ3JvdXBcIikpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwiaXMtaW52YWxpZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuLy8gQWRkIHZhbGlkYXRpb24gY2xhc3MgdG8gaW5wdXQtZ3JvdXAgKGlucHV0IGdyb3VwIHZhbGlkYXRpb24gZml4LCBjdXJyZW50bHkgZGlzYWJsZWQgYnV0IHdpbGwgYmUgdXNlZnVsIGluIGZ1dHVyZSlcbi8qIGZ1bmN0aW9uIGlucHV0R3JvdXBWYWxpZGF0aW9uKGVsKSB7XG4gIHZhciB2YWxpZEVsLFxuICAgIGludmFsaWRFbCxcbiAgICBlbGVtID0gJChlbCk7XG5cbiAgaWYgKGVsZW0uaGFzQ2xhc3MoJ2Zvcm0tY29udHJvbCcpKSB7XG4gICAgaWYgKCQoZWxlbSkuaXMoJy5mb3JtLWNvbnRyb2w6dmFsaWQsIC5mb3JtLWNvbnRyb2wuaXMtdmFsaWQnKSkge1xuICAgICAgdmFsaWRFbCA9IGVsZW07XG4gICAgfVxuICAgIGlmICgkKGVsZW0pLmlzKCcuZm9ybS1jb250cm9sOmludmFsaWQsIC5mb3JtLWNvbnRyb2wuaXMtaW52YWxpZCcpKSB7XG4gICAgICBpbnZhbGlkRWwgPSBlbGVtO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWxpZEVsID0gZWxlbS5maW5kKCcuZm9ybS1jb250cm9sOnZhbGlkLCAuZm9ybS1jb250cm9sLmlzLXZhbGlkJyk7XG4gICAgaW52YWxpZEVsID0gZWxlbS5maW5kKCcuZm9ybS1jb250cm9sOmludmFsaWQsIC5mb3JtLWNvbnRyb2wuaXMtaW52YWxpZCcpO1xuICB9XG4gIGlmICh2YWxpZEVsICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YWxpZEVsLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLnJlbW92ZUNsYXNzKCcuaXMtdmFsaWQgaXMtaW52YWxpZCcpLmFkZENsYXNzKCdpcy12YWxpZCcpO1xuICB9XG4gIGlmIChpbnZhbGlkRWwgIT09IHVuZGVmaW5lZCkge1xuICAgIGludmFsaWRFbC5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5yZW1vdmVDbGFzcygnLmlzLXZhbGlkIGlzLWludmFsaWQnKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICB9XG59ICovXG4iXSwibmFtZXMiOlsid2luZG93IiwiY29sb3JzIiwic29saWQiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5Iiwic3VjY2VzcyIsImluZm8iLCJ3YXJuaW5nIiwiZGFuZ2VyIiwiZGFyayIsImJsYWNrIiwid2hpdGUiLCJib2R5IiwibGlnaHQiLCJkb2N1bWVudCIsIiQiLCJjbG9zZXN0IiwiZmluZCIsImFwcGVuZCIsImF0dHIiLCJ0cl9lbGVtZW50cyIsIm9uIiwic2VhcmNoIiwidmFsIiwidG9VcHBlckNhc2UiLCJtYXRjaCIsImZpbHRlciIsImlkeCIsImVsZW0iLCJ0ZXh0IiwidHJpbSIsImluZGV4T2YiLCJzb3J0IiwidGFibGVfY29udGVudCIsImxlbmd0aCIsImh0bWwiLCJpbWciLCJjc3MiLCJiZyIsImRhdGEiLCJ0b29sdGlwIiwidG9nZ2xlRnVsbFNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZXhpdEZ1bGxzY3JlZW4iLCJ0b2dnbGVDbGFzcyIsInByb1BpY1VSTCIsImlucHV0IiwiZmlsZXMiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInByZXZpZXciLCJwYXJlbnRzIiwidGFyZ2V0IiwicmVzdWx0IiwiaGlkZSIsImZhZGVJbiIsInJlYWRBc0RhdGFVUkwiLCJwYXJlbnQiLCJyZXBsYWNlIiwiJGh0bWwiLCIkbG9nbyIsIiRsb2dvX2RhcmsiLCIkZmF2aWNvbl9saWdodCIsIiRmYXZpY29uX2RhcmsiLCIkYm9keSIsIiR0ZXh0Y29sb3IiLCJhc3NldFBhdGgiLCJmbiIsImRhdGFUYWJsZSIsImV4dGVuZCIsImV4dCIsImNsYXNzZXMiLCJzRmlsdGVySW5wdXQiLCJzTGVuZ3RoU2VsZWN0IiwicnRsIiwiY29tcGFjdE1lbnUiLCJoYXNDbGFzcyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRUaW1lb3V0IiwiYXBwIiwibWVudSIsImluaXQiLCJjb25maWciLCJzcGVlZCIsIm5hdiIsImluaXRpYWxpemVkIiwiVW5pc29uIiwiYnAiLCJjaGFuZ2UiLCJ0b29sdGlwVHJpZ2dlckxpc3QiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwidG9vbHRpcExpc3QiLCJtYXAiLCJ0b29sdGlwVHJpZ2dlckVsIiwiYm9vdHN0cmFwIiwiVG9vbHRpcCIsInByZXZlbnREZWZhdWx0IiwiY2hpbGRyZW4iLCJjb2xsYXBzZSIsIlRvdWNoU3BpbiIsImJ1dHRvbmRvd25fY2xhc3MiLCJidXR0b251cF9jbGFzcyIsImJ1dHRvbmRvd25fdHh0IiwiZmVhdGhlciIsImljb25zIiwidG9TdmciLCJidXR0b251cF90eHQiLCJzdG9wUHJvcGFnYXRpb24iLCJlYWNoIiwic2Nyb2xsYWJsZV9jb250YWluZXIiLCJQZXJmZWN0U2Nyb2xsYmFyIiwid2hlZWxQcm9wYWdhdGlvbiIsImJsb2NrX2VsZSIsInJlbG9hZEFjdGlvbk92ZXJsYXkiLCJibG9jayIsIm1lc3NhZ2UiLCJ0aW1lb3V0Iiwib3ZlcmxheUNTUyIsImJhY2tncm91bmRDb2xvciIsImN1cnNvciIsImJvcmRlciIsInBhZGRpbmciLCJzbGlkZVVwIiwiJHRoaXMiLCJjYXJkIiwiY2FyZEhlaWdodCIsInBhcnNlSW50Iiwic3R5bGUiLCJoZWlnaHQiLCJtZW51VHlwZSIsImNoYXJ0anNEaXYiLCJjYW52YXNIZWlnaHQiLCJtYWluTWVudSIsIm1lbnVXaWR0aCIsIndpZHRoIiwiY29udGVudFBvc2l0aW9uIiwicG9zaXRpb24iLCJsZWZ0IiwibWVudVBvc2l0aW9uQWRqdXN0IiwiZXZlbnQiLCJjaGVja1RleHRBcmVhTWF4TGVuZ3RoIiwidGV4dEJveCIsIm1heExlbmd0aCIsImNvdW50ZXJWYWx1ZSIsImNoYXJUZXh0YXJlYSIsImNoZWNrU3BlY2lhbEtleXMiLCJ2YWx1ZSIsInN1YnN0cmluZyIsImtleUNvZGUiLCJzZWFyY2hJbnB1dCIsInNlYXJjaElucHV0SW5wdXRmaWVsZCIsImJsdXIiLCJzZWFyY2hMaXN0IiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3AiLCJIYW1tZXIiLCJzd2lwZUluRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzd2lwZUluQWN0aW9uIiwic3dpcGVPdXRBY3Rpb24iLCJzd2lwZUluTWVudSIsImV2Iiwib3BlbiIsInN3aXBlT3V0RWxlbWVudCIsInN3aXBlT3V0TWVudSIsImdldCIsInNldCIsImRpcmVjdGlvbiIsIkRJUkVDVElPTl9BTEwiLCJ0aHJlc2hvbGQiLCJzd2lwZU91dE92ZXJsYXlFbGVtZW50Iiwic3dpcGVPdXRPdmVybGF5TWVudSIsInRvZ2dsZSIsInRyaWdnZXIiLCJwcm9wIiwic2V0SXRlbSIsImhhcyIsInJlc2l6ZSIsIm1hbnVhbFNjcm9sbGVyIiwidXBkYXRlSGVpZ2h0IiwiaHJlZiIsIm9mZnNldCIsInNjcm9sbHRvIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNpYmxpbmdzIiwibGFuZ3VhZ2UiLCJsYW5nIiwic2VsZWN0ZWRMYW5nIiwic2VsZWN0ZWRGbGFnIiwiaTE4bmV4dCIsInVzZSIsImkxOG5leHRYSFJCYWNrZW5kIiwiZGVidWciLCJmYWxsYmFja0xuZyIsImJhY2tlbmQiLCJsb2FkUGF0aCIsInJldHVybk9iamVjdHMiLCJlcnIiLCJ0IiwianF1ZXJ5STE4bmV4dCIsImN1cnJlbnRMYW5ndWFnZSIsImNoYW5nZUxhbmd1YWdlIiwibG9jYWxpemUiLCJXYXZlcyIsImF0dGFjaCIsImlucHV0R3JvdXBUZXh0IiwiZm9ybVBhc3N3b3JkVG9nZ2xlSWNvbiIsImZvcm1QYXNzd29yZFRvZ2dsZUlucHV0IiwicmVwbGFjZVdpdGgiLCJmYWRlT3V0Iiwic2Nyb2xsIiwiYmFja2dyb3VuZCIsImdldEN1cnJlbnRMYXlvdXQiLCJjdXJyZW50TGF5b3V0IiwiZGF0YUxheW91dCIsInN3aXRjaFRvTGF5b3V0IiwicHJldkxheW91dCIsInNldExheW91dCIsImN1cnJlbnRMb2NhbFN0b3JhZ2VMYXlvdXQiLCJuYXZMaW5rU3R5bGUiLCJuYXZiYXIiLCJqUXVlcnkiLCJmZWF0aGVyU1ZHIiwiaWNvblNpemUiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0b3IiLCJzZXREZWZhdWx0cyIsImVycm9yRWxlbWVudCIsImVycm9yUGxhY2VtZW50IiwiZXJyb3IiLCJlbGVtZW50IiwiaW5zZXJ0QWZ0ZXIiLCJoaWdobGlnaHQiLCJlcnJvckNsYXNzIiwidmFsaWRDbGFzcyIsInVuaGlnaGxpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==