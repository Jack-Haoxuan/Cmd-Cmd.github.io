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

// 插入数据
$conn->query("SET NAMES 'UTF8'");
$conn->query("SET CHARACTER SET UTF8");
$conn->query("SET CHARACTER_SET_RESULTS=UTF8'");
$limitStart = $_POST['limitStart'];
$limitEnd = $_POST['limitEnd'];
$result = $conn->query("SELECT `id`,`title`,`description`,`time`,`label` FROM `markdownnote` ORDER BY `id` DESC LIMIT $limitStart,$limitEnd");
if ($result->num_rows < 1){
    die('0');
}
$count = 0;
while ($row = $result->fetch_assoc()){
    $row['labels'] = unserialize($row['label']);
    unset($row['label']);
    $data[$count++] = $row;
}
echo json_encode($data);

// 关闭连接
$conn->close();
 ?>
