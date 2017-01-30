<?php
//http://www.w3schools.com/php/php_file_upload.asp
$target_dir = "photo/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$uploadEx = 0;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$response_array;


header('Content-type: application/json');
if ($_POST["submit"]) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
        $uploadOk = 1;
    } else {
        $response_array['error'] = "Not an image";
        $uploadOk = 0;
    }
}

if (file_exists($target_file)) {
    $uploadEx = 1;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $response_array['error'] = "Image too large <proper file size>";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    $response_array['error'] = "Image not compatible: jpg, png, jpeg, gif";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
  $response_array['status'] = "fail";
} else if ($uploadEx == 1) {
  $response_array['status'] = "success";
  $response_array['file_name'] = basename( $_FILES["fileToUpload"]["name"]);
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        $response_array['status'] = "success";
        $response_array['file_name'] = basename( $_FILES["fileToUpload"]["name"]);
    } else {
        $response_array['error'] = "Error on upload";
        $response_array['status'] = "fail";
    }
}

echo json_encode($response_array);
?>
