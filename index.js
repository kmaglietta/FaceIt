var faceApp = angular.module('faceApp', ['ngRoute']);

faceApp.controller('MainControler', function
MainControler($scope, $http){

  $scope.photoURL = "smile.png";
  $scope.photoName = ""

  $('#imageForm').ajaxForm(function(data) {
    if(data.status == 'success') {
      var myURL = window.location.href;
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);
      $scope.photoURL = myDir + "photo/" + data.file_name;
      $scope.sendData($scope.photoURL);
      $scope.$apply();
    } else if (data.status == 'fail') {
      //handle error
      $scope.error = "Erro upload";
    }
  })

  $('#fileToUpload').change(function(){
    var name = $(this).val();
    $scope.photoName = name.substring(name.lastIndexOf('\\') + 1);
    $scope.$apply();
  });

  $scope.sendData = function (photoURL) {
    console.log("Sending to Microsoft ..." );
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "true",
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
      if (data[0]) {
        $scope.age = data[0].faceAttributes.age;
        $scope.gender = data[0].faceAttributes.gender;
        $scope.error = null;
      }
      else {
        $scope.error = "No Face";
      }
    })
    .error(function (data){
      console.log("error");
    });
  };
});
