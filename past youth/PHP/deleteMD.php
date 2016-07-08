<?php
// 跨域允许
header("Access-Control-Allow-Origin: *");

// 连接数据库
$MYSQL_servername = 'localhost';
$MYSQL_username = 'zjwdb_540820';
$MYSQL_password = 'cmd19ZD95SMIE';
$MYSQL_database = 'zjwdb_540820';
$conn = new mysqli($MYSQL_servername, $MYSQL_username, $MYSQL_password, $MYSQL_database);
if ($conn -> connect_error) { // 连接失败
    die("连接失败: " . $conn -> connect_error);
}

// 删除数据
$id = $_POST['id'];
$pw = $_POST['password'];
if ($pw != 'cmd19ZD95SMIE'){
    die('密码错误');
}
$conn->query("SET NAMES 'UTF8'");
$conn->query("SET CHARACTER SET UTF8");
$conn->query("SET CHARACTER_SET_RESULTS=UTF8'");
$result = $conn->query("SELECT * FROM `markdownnote` WHERE `id` = '$id'");
if ($result->num_rows < 1){
    die('此id无数据');
}
$conn->query("DELETE FROM `markdownnote` WHERE `id` = '$id'");

// 关闭连接
$conn->close();
 ?>
