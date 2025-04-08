<?php

session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
}
echo "<table border='1'>";
echo "<tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Country</th>
        <th>Gender</th>
        <th>Username</th>
        <th>Password</th>
        <th>Department</th>
        <th>image</th>
        <th>Skills</th>
        <th>Actions</th>
      </tr>";
      
    try {
      $connection = new PDO('mysql:host=localhost;dbname=php_task', "dina", "1234");
      $data = $connection->query('select * from emp');
      $res = $data->fetchAll(PDO::FETCH_ASSOC);
      
      foreach ($res as $value) {
        echo "<tr>";
        foreach ($value as $key => $val) {
          if ($key == "img")
            echo "<td><img src='img/$val' width=200 height=200 /></td>";
          else
            echo "<td>$val</td>";
        }
        $stm = $connection->prepare('select skill from skills where emp_id=?');
        $stm->execute([$value['id']]);
        $skills = $stm->fetchAll(PDO::FETCH_COLUMN); 

        echo "<td>".implode(", ", $skills)."</td>";

        echo "<td>
                <a href='view.php?id={$value['id']}'>View</a> | 
                <a href='edit.php?id={$value['id']}'>Edit</a> | 
                <a href='delete.php?id={$value['id']}'>Delete</a>
              </td>";
        echo "</tr>";
    }
  } catch (PDOException $e) {
      echo $e;
  }
echo "</table>";
?>
