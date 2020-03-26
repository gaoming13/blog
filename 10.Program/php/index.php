<?php
ini_set('date.timezone','Asia/Shanghai');

// 当前时间戳 => 1585210475.958682
error_log(microtime(true));
// 当前时间戳 => 1585210475958
error_log(intval(microtime(true)*1000));
// 当前时间戳 => 1585210475
error_log(time());

// 当前日期 => 2020-03-26 17:41:51
error_log(date('Y-m-d H:i:s'));
// 日期转时间戳 => 1585215711
error_log(strtotime('2020-03-26 17:41:51'));
// 时间戳转日期 => 2020-03-26 17:41:51
error_log(date('Y-m-d H:i:s', 1585215711));

// MD5 => 81c3e1453f208fe91c58cdcfc7ac6730
error_log(md5('我爱你中国～'));

# 字符串转16进制 => 68-69-20-6211-7231-4f60-4e2d-56fd-ff5e
$str = 'hi 我爱你中国～';
$arr = [];
for ($i = 0; $i < mb_strlen($str); $i++) {
  $v = mb_substr($str, $i, 1);
  // php >= 7.2 md_ord
  // 1.array_push($arr, dechex(ord($v)));
  array_push($arr, bin2hex($v));
}
error_log(implode('-', $arr));
# 16进制转字符串 => hi 我爱你中国～
$arr = [];
foreach (explode('-', '68-69-20-6211-7231-4f60-4e2d-56fd-ff5e') as $v) {
  // 1.array_push($arr, chr(hexdec($v)));
  array_push($arr, hex2bin($v));
}
var_dump(implode('', $arr));

// SPLIT/INDEXOF/SUB_STR/SORT/REPLACE/JOIN => 193456
$uri = 'http://example.com?b=456&a=123';
$param = substr($uri, strpos($uri, '?') + 1);
$paramArr = explode('&', $param);
krsort($paramArr);
$result = '';
foreach ($paramArr as $v) {
  $result .= str_replace('2', '9', explode('=', $v)[1]);
}
error_log($result);
