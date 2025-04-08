<?php 
$id = $_GET['id'];

try {
    require("db.php");
    $db = new db();
    $connection = $db->get_connection();
    $db->delete_data("emp", "id = $id");

    header("Location: display.php");
} catch (PDOException $e) {
    echo $e;
}


?>