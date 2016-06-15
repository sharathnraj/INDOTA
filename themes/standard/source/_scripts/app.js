;(function(window, document, $) {
  'use strict';

  /**
   * The main class for ACU.
   *
   * @class ACU
   * @namespace modules
   */

  var DOTA = (function() {

    return {
      init: function () {
        // GetMatchHistory
        $.ajax({
          type: 'POST',
          url: '/AD/php/json.php',
          data: {
            "url" : 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=DED86B2DF21D58144147B8E3EF9C6AE1',
            "file": 'GetMatchHistory'
          },
          success: function (response) {
            console.log("success", response);
          },
          error: function (response) {
            console.log("error", response);
          }
        });
      }
    };

  })(window);

  $(function () {
    DOTA.init();
  });

  // Expose the Main helper to the window
  window.DOTA = DOTA || {};

}(window, document, jQuery));

