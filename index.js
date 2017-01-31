var faceApp = angular.module('faceApp', ['ngRoute']);

faceApp.controller('MainControler', function
MainControler($scope, $http){
  $('#imageForm').ajaxForm(function(data) {
    if(data.status == 'success') {
      console.log(data);
      var myURL = window.location.href;
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);
      photoURL = myDir + "photo/" + data.file_name;
      $scope.sendDeata(photoURL);
    } else if (data.status == 'fail') {
      //handle error
      console.log(data.error);
    }
  })

  $scope.sendDeata = function (photoURL) {
    console.log("Senind to Microsoft ..." );
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender"
    };

    var apiURL = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params);

    var config = {
      headers : {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key":"a3e04d48ce244b59a583478dd998f5da"
      }
    };

    var data = JSON.stringify({url: photoURL});

    $http.post(apiURL, data, config)
    .success(function (data) {
      console.log(data);
    })
    .error(function (data){
      console.log("error");
    });
  };
});
