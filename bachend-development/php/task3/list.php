<?php
if (isset($_POST['submit'])) {
    unset($_POST['submit']);

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $address = $_POST['address'];
    $country = $_POST['country'];
    $gender = $_POST['gender'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $department = $_POST['department'];
    $skills = $_POST['skills'];

    try {
        $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
        $stm = $connection->prepare('insert into emp (fname, lname, address, country, gender, username, password, department) values (?,?,?,?,?,?,?,?)');
        $stm->execute([$fname, $lname, $address, $country, $gender, $username, $password, $department]);
        $emp_id = $connection->lastInsertId();
        //var_dump($emp_id);
        $stm2 = $connection->prepare('insert into skills (skill, emp_id) values (?,?)');
        foreach ($skills as $skill) {
            $stm2->execute([$skill, $emp_id]);
        }
    } catch (PDOException $e) {
        echo $e;
    }

}
?>
<a href="display.php">View Data</a>
