<?php 
$line = $_GET['line'];

$data = explode(",", $line);

echo "<h2>data</h2>";
echo "<ul>";
echo "<li>First Name: $data[0]</li>";
echo "<li>Last Name: $data[1]</li>";
echo "<li>Address: $data[2]</li>";
echo "<li>Country: $data[3]</li>";
echo "<li>Gender: $data[4]</li>";
echo "<li>Skills: $data[5]</li>";
echo "<li>Username: $data[6]</li>";
echo "<li>Password: $data[7]</li>";
echo "<li>Department: $data[8]</li>";
echo "<li>Code: $data[9]</li>";
echo "</ul>";

?>