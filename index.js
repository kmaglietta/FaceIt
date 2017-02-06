var faceApp = angular.module('faceApp', ['ngRoute']); //declare the angular module

faceApp.controller('MainControler', function          //create the controller
MainControler($scope, $http){

  $scope.photoURL = "smile.png";                      //set placeholder image
  $scope.ready = false;                               //initalize the show variable

  $('#imageForm').ajaxForm(function(data) {           //execute on submit
    if(data.status == 'success') {                    //if upload.php returns 200 check the status array
      var myURL = window.location.href;               //get the current url
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);  //retrive the directory
      $scope.photoURL = myDir + "photo/" + data.file_name;  //create the url for where the file is located
      $scope.sendData($scope.photoURL);               //pass teh photo url to the api request
      $scope.$apply();                                //apply all scope changes
    } else if (data.status == 'fail') {               //upload.php has responded with 200 but there was an error with photo
      //handle error
      $scope.error = data.error;
      $scope.$apply();
    }
  })

  $('#fileToUpload').change(function(){               //show the analyze button
    $scope.ready = true;
    $scope.$apply();
  });

  $scope.sendData = function (photoURL) {             //send request to Microsoft
    //Angular modification of the FaceAPI JavaSctript template
    console.log("Sending to Microsoft ..." );
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "true",
        "returnFaceAttributes": "age,gender"
    };

    var apiURL = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params); //Create the url with the provieded parameters

    var config = {                                     //determine headers for request
      headers : {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key":"a3e04d48ce244b59a583478dd998f5da"
      }
    };

    var data = JSON.stringify({url: photoURL});         //stringify the data for the body

    $http.post(apiURL, data, config)                    //send request
    .success(function (data) {                          //200 response
      if (data[0]) {                                    //face detected and retrive the data
        $scope.age = data[0].faceAttributes.age;
        $scope.gender = data[0].faceAttributes.gender;
        $scope.error = null;
      }
      else {                                            //no face detected
        $scope.error = "No Face";
        $scope.age = "Nope";
        $scope.gender = "Nada";
      }
    })
    .error(function (data){                             //400 error
      console.log("error");
    });
  };
});
