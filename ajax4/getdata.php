<?php

    include "connection.php";

    $resultArray = array();
    $search = $_GET["q"];
    $type = $_GET["type"];
    $conn = mysqli_connect($servername, $uid, $pwd, $database);
    if (!$conn) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }

    mysqli_select_db($conn, "world");

    $sql = "SELECT * FROM Country WHERE name LIKE '$search%'";
    if($type == 'list') {
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_array($result)) {
            $resultArray[] = $row['Name'];
        }
        echo json_encode($resultArray);
    }
    if($type == 'answer') {
        $sql = "SELECT * FROM Country WHERE Name='$search'";
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[] = $row;
        }
        echo json_encode($resultArray);
    }
    if($type == 'capital') {
        $sql = "SELECT * FROM city WHERE id='$search'";
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[] = $row;
        }
        echo json_encode($resultArray);
    }
    mysqli_close($conn);

?>
