<?php
if (isset($_POST['submit'])) {
    unset($_POST['submit']);

    $errors = [];

    $username = validateStr($_POST['username']);
    $password = validateStr($_POST['password']);

    if (empty($username) || empty($password)) {
        $errors["all"] = "All fields are required";
    }
    if (count($errors) > 0) {
        $err = json_encode($errors);
        header("Location: login.php?errors=".$err);
    }
    else {
        try {
            require("db.php");
            $db = new db();
            $connection = $db->get_connection();
            $stm = $db->get_data("emp", "username = '$username' and password = '$password'");
            if ($data = $stm->fetch(PDO::FETCH_ASSOC)) {
                session_start();
                $_SESSION['username'] = $data['username'];
                header("Location: display.php");
            }
            else {
                $errors["invalid"] = "invalid data";
                $err = json_encode($errors);
                header("Location: login.php?errors=".$err);
            }

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
<a href="display.php">View Data</a>
