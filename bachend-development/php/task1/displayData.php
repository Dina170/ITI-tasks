<?php
$gender;
if ($_POST['gender'] == "male") {
    $gender = "Mr";
}
else {
    $gender = "Miss";
}

echo "<p>Thanks $gender {$_POST['fname']} {$_POST['lname']}</p>";
echo "<p>Please Review Your Information:</p>";
echo "<p>Name: {$_POST['username']}</p>";
echo "<p>Address: {$_POST['address']}</p>";
echo "<p>your skills:</p>";

foreach ($_POST['skills'] as $key) {
    echo $key." ";
}
echo "<p>department: {$_POST['department']}</p>";
// var_dump($_POST);
?>