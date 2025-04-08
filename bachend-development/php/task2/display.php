<?php

echo "<table border='1'>";
echo "<tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Country</th>
        <th>Gender</th>
        <th>Skills</th>
        <th>Username</th>
        <th>Password</th>
        <th>Department</th>
        <th>Code</th>
        <th>Actions</th>
      </tr>";
      $lines = file("data.txt");
      foreach ($lines as $key=>$line) {
        $data = explode(",", $line);
        echo "<tr>";
        foreach ($data as $value) {
            echo "<td>$value</td>";
        }

        echo "<td>
            <a href='view.php?line=$line'>View</a>
          </td>";
        echo "</tr>";
    }
echo "</table>";
?>
