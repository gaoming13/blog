<?php
// header("Content-Security-Policy: default-src 'self'");
// header("Content-Security-Policy: default-src 'self'; img-src *.baidu.com *.jquery.com; script-src 'self'");
header("Strict-Transport-Security: max-age=10000");
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  <script src="./1.js"></script>
</head>
<body>
  <img src="https://www.baidu.com/img/flexible/logo/pc/result.png">
</body>
</html>
