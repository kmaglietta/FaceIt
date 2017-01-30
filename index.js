$(document).ready(function() {
  $('#imageForm').ajaxForm(function(data) {
    if(data.status == 'success') {
      console.log(data.file_name);
      var myURL = window.location.href;
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);
      photoURL = myDir + "photo/" + data.file_name;

      sendPhoto(photoURL);
      console.log(myDir);
    } else if (data.status == 'fail') {
      console.log("nooo!");
    }
  })

  function sendPhoto(photoURL) {
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
        data: JSON.stringify({url: "http://www.drodd.com/images15/face9.jpg"})
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
