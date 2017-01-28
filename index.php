<?php
  echo "hello";
  include 'upload.php';
?>

<!DOCTYPE html>
<html>
<body>
  <form action="upload.php" method="post" enctype="multipart/form-data">
    Select image:
    <input type="file" name="fileToUpload" id="fileToUpload" />
    <input type="submit" value="Upload Image" name="submit"  />
  </form>
</body>
</html>
