<?php 
$id = $_GET['id'];

try {
    $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
    $stm = $connection->prepare('delete from emp where id=?');
    $stm->execute([$id]);

    header("Location: display.php");
} catch (PDOException $e) {
    echo $e;
}


?>