var faceApp = angular.module('faceApp', ['ngRoute']);

faceApp.controller('MainControler', function
MainControler($scope){
  $('#imageForm').ajaxForm(function(data) {
    if(data.status == 'success') {
      console.log(data);
      var myURL = window.location.href;
      var myDir = myURL.substring( 0, myURL.lastIndexOf( "/" ) + 1);
      photoURL = myDir + "photo/" + data.file_name;
    } else if (data.status == 'fail') {
      //handle error
      console.log(data.error);
    }
  })
});
