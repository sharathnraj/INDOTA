;(function(window, document, $) {
  'use strict';

  /**
   * The main Chat plugin.
   *
   * @class Chat
   * @namespace modules
   */

  var Chat = (function() {

    return {

      //gets the state of the chat
      getStateOfChat: function () {
        if(!instanse){
          instanse = true;
          $.ajax({
            type: "POST",
            url: "/AD/php/process.php",
            data: {'function': 'getState'},
            dataType: "json",
            success: function(data) {
              console.log("state success", data);
              state = data.state;
              instanse = false;
            },
            error: function (data) {
              console.log("error", data);
            }
          });
        }
      },

      //Updates the chat
      updateChat: function () {
        console.log("update", instanse, state);
        if(!instanse){
          instanse = true;
          $.ajax({
            type: "POST",
            url: "/AD/php/process.php",
            data: {
              'function': 'update',
              'state': state
            },
            dataType: "json",
            success: function(data) {console.log(data.text);
              if(data.text){
                for (var i = 0; i < data.text.length; i++) {
                  $('#chat-area').append($(""+ data.text[i] +""));
                }
              }
              document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
              instanse = false;
              state = data.state;
            },
            error: function (data) {
              instanse = false;
            }
          });
        }
        else {
          setTimeout(Chat.updateChat, 1500);
        }
      },

      //send the message
      sendChat: function (message, nickname) {
        Chat.updateChat();
        $.ajax({
          type: "POST",
          url: "/AD/php/process.php",
          data: {
            'function': 'send',
            'message': message,
            'nickname': nickname
          },
          dataType: "json",
          success: function(data){console.log("send success", data);
            Chat.updateChat();
          },
          error: function (data) {
            console.log("send error", data);
          }
        });
      },

      init: function () {
        this.update = Chat.updateChat;
        this.send = Chat.sendChat;
        this.getState = Chat.getStateOfChat;

        // ask user for name with popup prompt
        var name;// = prompt("Enter your chat name: ", "Guest");

        // default name is 'Guest'
        if (!name || name === ' ') {
          name = "Guest";
        }

        // strip tags
        name = name.replace(/(<([^>]+)>)/ig,"");

        // display name on page
        $("#name-area").html("You are: <span>" + name + "</span>");

        // kick off chat
        // var chat =  new Chat();

        $(function() {

           Chat.getState();
           Chat.update();

           // watch textarea for key presses
           $("#sendie").keydown(function(event) {

             var key = event.which;

             //all keys including return.
             if (key >= 33) {

               var maxLength = $(this).attr("maxlength");
               var length = this.value.length;

               // don't allow new content if length is maxed out
               if (length >= maxLength) {
                 event.preventDefault();
               }
             }
           });
           // watch textarea for release of key press
           $('#sendie').keyup(function(e) {

              if (e.keyCode == 13) {

                var text = $(this).val();
                var maxLength = $(this).attr("maxlength");
                var length = text.length;

                // send
                if (length <= maxLength + 1) {
                  Chat.send(text, name);
                  $(this).val("");
                } else {
                  $(this).val(text.substring(0, maxLength));
                }
              }
           });
        });
      }
    };

  })(window);

  var instanse = false, state;

  $(function () {
    if ($('section.chat').length !== 0) {
      Chat.init();
    }
  });
}(window, document, jQuery));
