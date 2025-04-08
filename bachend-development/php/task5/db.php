<?php

class db {
    private $host = "localhost";
    private $dbname = "php_task";
    private $username = "dina";
    private $password = "1234";
    private $connection = "";
    
    function __construct() {
        $this->connection = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);            
    }

    function get_connection() {
        return $this->connection;
    }

    function get_data($tableName, $condition=1) {
        return $this->connection->query("select * from $tableName where $condition");
    }

    function delete_data($tableName, $condition) {
        return $this->connection->query("delete from $tableName where $condition");
    }

    function insert_data($tableName, $cols, $values) {
        $this->connection->query("INSERT INTO $tableName ($cols) VALUES ($values)");
    }

    function update_data($tableName, $cols, $values, $condition) {  
        $cols = explode(", ", $cols);  
        $setClause = implode(" = ?, ", $cols)." = ?";
        $stm = $this->connection->prepare("update $tableName set $setClause WHERE $condition");
        $values = explode(", ", $values);  

        return $stm->execute($values);
    }
}





?>