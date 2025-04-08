<?php 
$id = $_GET['id'];

try {
    $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
    
    $stm = $connection->prepare('select * from emp where id=?');
    $stm->execute([$id]);
    $data = $stm->fetch();

    $stm = $connection->prepare('select skill from skills where emp_id=?');
    $stm->execute([$id]);
    $skills = $stm->fetchAll(PDO::FETCH_COLUMN); 
    //var_dump($emp);

   
    
} catch (PDOException $e) {
    echo $e;
}


?>

<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
<form class="w-50 mx-auto mt-3" method="POST" action="update.php">
  <div class="mb-3">
    <label for="fname" class="form-label">fname</label>
    <input type="text" class="form-control" id="fname" name="fname" value="<?= $data['fname'] ?>">
  </div>
  <div class="mb-3">
    <label for="lname" class="form-label">lname</label>
    <input type="text" class="form-control" id="lname" name="lname" value="<?= $data['lname'] ?>">
  </div>
  <div class="mb-3">
    <label for="address" class="form-label">address</label>
    <textarea type="text" class="form-control" id="address" rows="4" cols="50" name="address"><?= $data['address'] ?></textarea>
  </div>
  <div class="mb-3">
    <label for="country" class="form-label">country</label>
    <select class="form-select" name="country">
        <option selected>Select country</option>
        <option value="Egypt" <?= $data['country'] == "Egypt" ? 'selected' : '' ?> >Egypt</option>
        <option value="France" <?= $data['country'] == "France" ? 'selected' : '' ?> >France</option>
        <option value="England" <?= $data['country'] == "England" ? 'selected' : '' ?> >England</option>
  </select>
  </div>    
  <div class="mb-3">
    <label for="password" class="form-label">Gender</label>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" id="male" value="male" <?= $data['gender'] == "male" ? 'checked' : '' ?> >
        <label class="form-check-label" for="male">
            male
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" id="female" value="female" <?= $data['gender'] == "female" ? 'checked' : '' ?> >
        <label class="form-check-label" for="female">
            female
        </label>
    </div>
  </div>
  <div class="mb-3">
        <label class="form-check-label" for="Skills">
            Skills
        </label>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" name="skills[]" value="PHP" id="flexCheckDefault1"  <?= in_array("PHP", $skills) ? 'checked' : '' ?> >
    <label class="form-check-label" for="flexCheckDefault1">
        PHP
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" name="skills[]" value="J2SE" id="flexCheckDefault2"  <?= in_array("J2SE", $skills) ? 'checked' : '' ?> >
    <label class="form-check-label" for="flexCheckDefault2">
    J2SE
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" name="skills[]" value="MySql" id="flexCheckDefault3"  <?= in_array("MySql", $skills) ? 'checked' : '' ?> >
    <label class="form-check-label" for="flexCheckDefault3">
        MySql
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" name="skills[]" value="Postgressql" id="flexCheckDefault4"  <?= in_array("Postgressql", $skills) ? 'checked' : '' ?> >
    <label class="form-check-label" for="flexCheckDefault4">
        Postgressql
    </label>
  </div>
</div>
  </div>
  <div class="mb-3">
    <label for="username" class="form-label">username</label>
    <input type="text" class="form-control" id="username" name="username" value="<?= $data['username'] ?>">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" value="<?= $data['password'] ?>">
  </div>
  <div class="mb-3">
    <label for="department" class="form-label">department</label>
    <input type="text" class="form-control" id="department" name="department" value="OpenSource" readonly value="<?= $data['department'] ?>">
  </div>
  <div class="d-flex justify-content-center alirn-items-center">
    <div class="d-flex flex-column align-items-center">
        <h3>Sh686a</h3>
        <div class="mb-3">
            <input type="text" class="form-control" id="code" name="code">
        </div>
    </div>
    <p>please insert the code the below box</p>
  </div>
  <input type="hidden" class="form-control" id="id" name="id" value="<?= $data['id'] ?>">

  <button type="submit" class="btn btn-primary" name="submit">Submit</button>
</form>
</body>
