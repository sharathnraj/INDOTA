;(function(window, document, $) {
  'use strict';

  /**
   * MatchHistory - Reads JSON and builds the page accordingly
   *
   * @class MatchHistory
   * @namespace modules
   */

  var MatchHistory = (function() {

    return {
      init: function () {
        $.ajax({
          url: '/AD/json/GetMatchHistory.json',
          type: 'GET',
          success: function (response) {
            console.log("Match history: ", response.result);
            var result = response.result,
                numOfResults = result.num_results,
                matches = result.matches;

            for (var i = 0; i < numOfResults; i++) {
              var matchID = matches[i].match_id;
              $('.stats__history').append('<p><a href="/AD/stats/match-details/?matchID=' + matchID + '">' + matchID + '</a></p>');

            }
          }
        });
      }
    };

  })(window);

  $(function () {
    if ($('.stats__history').length !==0 ) {
      MatchHistory.init();
    }
  });
}(window, document, jQuery));

