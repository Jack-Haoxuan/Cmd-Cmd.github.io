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
$pw = $_POST['password'];
if ($pw != 'cmd19ZD95SMIE'){
    die('密码错误');
}
$title = $_POST['title'];
$description = $_POST['description'];
$content = $_POST['content'];
$time = $_POST['time'];
$label = serialize($_POST['label']);
$category = $_POST['category'];
$conn->query("SET NAMES 'UTF8'");
$conn->query("SET CHARACTER SET UTF8");
$conn->query("SET CHARACTER_SET_RESULTS=UTF8'");
$sql = "INSERT INTO `markdownnote` (`description`, `title`, `content`, `time`, `label`, `category`) VALUES ('$description', '$title', '$content', '$time', '$label', '$category')";
if ($conn->query($sql) === TRUE){
    // 成功就返回id信息
    $result = $conn->query("SELECT * FROM `markdownnote`  WHERE `time` = '$time'");
    $row = $result->fetch_assoc();
    echo $row['id'];
} else {
    echo '错误信息: ' . $conn->error;
}

// 关闭连接
$conn->close();
 ?>
