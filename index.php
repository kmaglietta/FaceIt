<?php
  echo "hello";
?>

<!DOCTYPE html>
<html>
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
  <script src="http://malsup.github.com/jquery.form.js"></script>
  <script src="index.js"></script>
</head>
<body>
  <form id="imageForm" action="upload.php" method="post" enctype="multipart/form-data">
    Select image:
    <input type="file" name="fileToUpload" id="fileToUpload" />
    <input type="submit" value="Upload Image" name="submit"  />
  </form>
</body>
</html>
