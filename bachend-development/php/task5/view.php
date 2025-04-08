<?php 
$id = $_GET['id'];

try {
    require("db.php");
    $db = new db();
    $connection = $db->get_connection();
    
    $data = $db->get_data("emp", "id = $id");
    $data = $data->fetch();

    $stm = $db->get_data("skills", "emp_id = $id");
    $skill = $stm->fetchAll(); 
    $skills = array_column($skill, "skill");
    // var_dump($skills);
    echo "<h2>data</h2>";
    echo "<ul>";
    echo "<img src='./img/$data[9]' width=200 height=200 />";
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