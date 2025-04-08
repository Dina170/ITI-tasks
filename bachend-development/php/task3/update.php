<?php

if (isset($_POST['submit'])) {
    $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
    
    $updateId = $_POST['id'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $address = $_POST['address'];
    $country = $_POST['country'];
    $gender = $_POST['gender'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $skills = $_POST['skills']; 

    $update = $connection->prepare('update emp set fname=?, lname=?, address=?, country=?, gender=?, username=?, password=? WHERE id=?');
    $update->execute([$fname, $lname, $address, $country, $gender, $username, $password, $updateId]);

    $deleteSkills = $connection->prepare('delete from skills where emp_id=?');
    $deleteSkills->execute([$updateId]);

    $insertSkill = $connection->prepare('insert into skills (emp_id, skill) values (?, ?)');
    foreach ($skills as $skill) {
        $insertSkill->execute([$updateId, $skill]);
    }

    header("Location: list.php"); 
}

?>