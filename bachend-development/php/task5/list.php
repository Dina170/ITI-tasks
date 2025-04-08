<?php


if (isset($_POST['submit'])) {
    unset($_POST['submit']);

    $errors = [];

    $fname = validateStr($_POST['fname']);
    $lname = validateStr($_POST['lname']);
    $address = validateStr($_POST['address']);
    $country = validateStr($_POST['country']);
    $gender = validateStr($_POST['gender']);
    $username = validateStr($_POST['username']);
    $password = validateStr($_POST['password']);
    $department = validateStr($_POST['department']);
    $skills = $_POST['skills'] ?? [];

    if (empty($fname) || empty($lname) || empty($address) || empty($country) || empty($gender) || empty($username) || empty($password) || empty($department) || count($skills) == 0) {
        $errors["all"] = "All fields are required";
    } else {
        if (strlen($fname) < 2) {
            $errors["fname"] = "first name must be more than 2 characters";
        }
        if (strlen($lname) < 2) {
            $errors["lname"] = "last name must be more than 2 characters";
        }
        if (strlen($password) < 6) {
            $errors["password"] = "Password must be at least 6 characters";
        }
        if ($_FILES['img']['size'] < 1000) {
            $errors["img"] = "size not valid";
        }
    }
    if (count($errors) > 0) {
        $data = json_encode($errors);
        header("Location: task2.php?errors=".$data);
    }
    else {
        try {
            require("db.php");
            $db = new db();
            $connection = $db->get_connection();
            move_uploaded_file($_FILES["img"]["tmp_name"], "img/".$_FILES["img"]["name"]);
            $stm = $db->insert_data("emp", "fname, lname, address, country, gender, username, password, department, img", "'$fname', '$lname', '$address', '$country', '$gender', '$username', '$password', '$department', '{$_FILES['img']['name']}'");
            $emp_id = $connection->lastInsertId();
           
            foreach ($skills as $skill) {
                $stm2 = $db->insert_data("skills", "skill, emp_id", "'$skill', '$emp_id'");
            }
            session_start();
            $_SESSION['username'] = $username;
            header("Location: display.php");
        } catch (PDOException $e) {
            echo $e;
        }
    }
}
function validateStr($str) {
    if (!empty($str)) {
        $data = trim($str);
        $data = stripcslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    return '';
}

?>
<!-- <a href="display.php">View Data</a> -->
