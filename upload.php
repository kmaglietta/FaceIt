<?php
//http://www.w3schools.com/php/php_file_upload.asp
$target_dir = "photo/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$new_name = time() . "." . $imageFileType;

$uploadOk = 1;
$response_array;
$valid_ex = array("jpg", "jpeg", "png", "gif");

header('Content-type: application/json');

if(in_array($imageFileType, $valid_ex) != true) {
    $response_array['error'] = "Only: " . implode(", ",$valid_ex);
    $uploadOk = 0;
}

if ($uploadOk == 0) {
  $response_array['status'] = "fail";
}
else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . $new_name)) {
        $response_array['file_name'] = $new_name;
        $response_array['status'] = "success";

    } else {
        $response_array['error'] = "Error on upload";
        $response_array['status'] = "fail";
    }
}

echo json_encode($response_array);
?>
