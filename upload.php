<?php
//http://www.w3schools.com/php/php_file_upload.asp
$target_dir = "photo/"; //set where the photo will be stored
$current_file = basename($_FILES["fileToUpload"]["name"]); //retrive the current name of the file
$imageFileType = strtolower(pathinfo(basename($current_file),PATHINFO_EXTENSION)); //get the extension (jpeg, gif, doc ...)
$new_name = time() . "." . $imageFileType;  //create a new name based on the current time
$uploadOk = 1; //set variable to good
$response_array; //just incase
$valid_ex = array("jpg", "jpeg", "png", "gif"); //create an array of acceptable image formates (easy expansion later if needed)

header('Content-type: application/json'); //set the header of the response

if(in_array($imageFileType, $valid_ex) == false) { //check if the image sent is on of the exceptible formats
    $response_array['error'] = "Only: " . implode(", ",$valid_ex); //send message of ecceptible files
    $uploadOk = 0; //not ok
}

if ($uploadOk == 0) { //if not ok
  $response_array['status'] = "fail"; //set the status as failed
}
else { //if ok
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . $new_name)) { //attempt upload of file with new name
        $response_array['file_name'] = $new_name; //let the reciver know what the ne name is
        $response_array['status'] = "success"; //ok

    } else {
        $response_array['error'] = "Error on upload"; //uh oh somthing happend
        $response_array['status'] = "fail";
    }
}
//encode the data for the response
echo json_encode($response_array);
?>
