<?php
//http://www.w3schools.com/php/php_file_upload.asp
$target_dir = "photo/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$uploadEx = 0;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
$response_array;


header('Content-type: application/json');
if ($_POST["submit"]) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
        $uploadOk = 1;
    } else {
        //echo "File is not an image.";

        $uploadOk = 0;
    }
}

if (file_exists($target_file)) {
    //echo "Sorry, file already exists.";
    $uploadEx = 1;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    //echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    //echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
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
        //echo "Sorry, there was an error uploading your file.";
        $response_array['status'] = "fail";
    }
}

echo json_encode($response_array);
?>
