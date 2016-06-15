;(function(window, document, $) {
  'use strict';

  /**
   * MatchDetail - Reads JSON and builds the page accordingly
   *
   * @class MatchDetail
   * @namespace modules
   */

  var MatchDetail = (function() {

    return {
      init: function () {
        // var matchID = $('.stats__detail').attr('id');
        var matchID = MatchDetail.getParameterByName('matchID');
        // GetMatchDetail
        $.ajax({
          type: 'POST',
          url: '/AD/php/json.php',
          data: {
            "url" : 'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=DED86B2DF21D58144147B8E3EF9C6AE1\&match_id=' + matchID,
            "file": 'matches/' + matchID
          },
          success: function (response) {
            $.ajax({
              url: '/AD/json/matches/' + matchID + '.json',
              type: 'GET',
              success: function (response) {
                var match = response.result;

                $.get('/AD/templates/_dummy.ejs', function (template) {
                  // Compile the EJS template.
                  var func = ejs.compile(template);

                  // Grab the data
                  // $.get('/data', function (data) {
                     // Generate the html from the given data.
                     var data = match;
                     var html = func(data);
                     $('.stats__detail').append(html);
                  // });
                });
              }
            });
          },
          error: function (response) {
            console.log("error", response);
          }
        });
      },

      getParameterByName: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }
    };

  })(window);

  $(function () {
    if ($('.stats__detail').length !==0 ) {
      MatchDetail.init();
    }
  });
}(window, document, jQuery));

