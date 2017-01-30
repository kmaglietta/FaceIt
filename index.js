
//Used for response_array
//http://stackoverflow.com/questions/9676084/how-do-i-return-a-proper-success-error-message-for-jquery-ajax-using-php

//URL parsing
//http://stackoverflow.com/questions/17497045/jquery-js-get-current-url-parent-directory

$(document).ready(function() {
  $('#imageForm').ajaxForm(function(data) {
    if(data.status == 'success') {
      console.log(data);
      var myURL = window.location.href;
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);
      photoURL = myDir + "photo/" + data.file_name;
      sendPhoto(photoURL);
    } else if (data.status == 'fail') {
      //handle error
      console.log(data.error);
    }
  })

  //Tried PHP this worked
  //https://www.microsoft.com/cognitive-services/en-us/Face/documentation/QuickStarts/JavaScript
  function sendPhoto(photoURL) {
    console.log("Senind to Microsoft ..." );
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
    };

    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a3e04d48ce244b59a583478dd998f5da");
        },
        type: "POST",
        // Request body
        data: JSON.stringify({url: photoURL})
    })
    .done(function(data) {
        alert("success");
        console.log(data);
    })
    .fail(function() {
        alert("error");
    });
  }
});
