;(function(window, document, $) {
  'use strict';

  /**
   * The main header class.
   *
   * @class Header
   * @namespace modules
   */

  var Header = (function() {

    return {
      init: function () {
        $('header').on('click', '.trigger', function () {
          $(this).toggleClass('open');
        });

        $('header').on('click', '.menu__trigger', function () {
          var $secondary = $(this).next('.menu__secondary');

          if(!$secondary.hasClass('open')) {
            $('header .menu__secondary').removeClass('open');
          }

          $secondary.toggleClass('open');
        });
      }
    };

  })(window);

  var temp;

  $(function () {
    Header.init();
  });
}(window, document, jQuery));

