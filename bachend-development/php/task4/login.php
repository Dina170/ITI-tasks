<?php

$errors = [];
if (isset($_GET['errors'])) {
  $errors = json_decode($_GET['errors'], true);
}

?>

<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
<form class="w-50 mx-auto mt-3" method="POST" action="loginlist.php">
  <div class="mb-3">
    <label for="username" class="form-label">username</label>
    <input type="text" class="form-control" id="username" name="username">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password">
  </div>
  <?php
    if(isset($errors['all'])) {
      echo "<p class='text-danger'>".$errors['all']."</p>";
    } else if(isset($errors['invalid'])) {
      echo "<p class='text-danger'>".$errors['invalid']."</p>";
    }
    
  ?>
  <button type="submit" class="btn btn-primary" name="submit">login</button>
</form>
</body>
