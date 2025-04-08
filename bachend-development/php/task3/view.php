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
    echo "<h2>data</h2>";
    echo "<ul>";
    echo "<li>First Name: $data[1]</li>";
    echo "<li>Last Name: $data[2]</li>";
    echo "<li>Address: $data[3]</li>";
    echo "<li>Country: $data[4]</li>";
    echo "<li>Gender: $data[5]</li>";
    echo "<li>Username: $data[6]</li>";
    echo "<li>Password: $data[7]</li>";
    echo "<li>Department: $data[8]</li>";
    echo "<li>skills: ".implode(", ", $skills)."</li>";
    echo "</ul>";
} catch (PDOException $e) {
    echo $e;
}


?>