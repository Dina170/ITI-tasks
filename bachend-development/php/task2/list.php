<?php
if (isset($_POST['submit'])) {
    if (isset($_POST['skills'])) {
        $_POST['skills'] = implode("-", $_POST['skills']);
    } else {
        $_POST['skills'] = "none";
    }
    unset($_POST['submit']);
    $data = implode(",", $_POST)."\n";

    file_put_contents("data.txt", $data, FILE_APPEND);

}
?>
<a href="display.php">View Data</a>
