<?php

if (isset($_POST['submit'])) {
    // $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
    
    $updateId = $_POST['id'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $address = $_POST['address'];
    $country = $_POST['country'];
    $gender = $_POST['gender'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $department = $_POST['department'];
    $skills = $_POST['skills']; 
    $old_img = $_POST['old_img'];
    $img = '';

    if ($_FILES['img']['size'] > 0) {
        $img = $_FILES['img']['name'];
        move_uploaded_file($_FILES['img']['tmp_name'], "img/".$img);
    } else {
        $img = $old_img;
    }

    require("db.php");
    $db = new db();
    $connection = $db->get_connection();

    // $update = $connection->prepare('update emp set fname=?, lname=?, address=?, country=?, gender=?, username=?, password=?, img=? WHERE id=?');
    // $update->execute([$fname, $lname, $address, $country, $gender, $username, $password, $img, $updateId]);
    $update = $db->update_data("emp", "fname, lname, address, country, gender, username, password, department, img", "$fname, $lname, $address, $country, $gender, $username, $password, $department, $img", "id = $updateId");
    $deleteSkills = $connection->prepare('delete from skills where emp_id=?');
    $deleteSkills->execute([$updateId]);

    $insertSkill = $connection->prepare('insert into skills (emp_id, skill) values (?, ?)');
    foreach ($skills as $skill) {
        $insertSkill->execute([$updateId, $skill]);
    }

    header("Location: display.php"); 
}

?>