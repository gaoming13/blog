<!--
  通过将websocket数据压缩成二进制发送给客户端,客户端解压
  让原生不支持websocket压缩协议的浏览器，也实现压缩效果
--->
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <script src="https://cdn.bootcss.com/pako/1.0.10/pako.min.js"></script>
  <script>
  // 16进制转字符串
  var hexToStr = function(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i+=2) {
      str += String.fromCharCode(parseInt(hex[i] + hex[i+1], 16));
    }
    return str;
  };
  // 字符串转16进制
  var strToHex = function(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16);
    }
    return hex;
  };

  var ws = new WebSocket('wss://api.huobiasia.vip/ws');
  ws.onopen = function(evt) {
    console.log(evt);
  };
  // 收到消息
  ws.onmessage = function(evt) {
    console.log(evt)
    let reader = new FileReader();
    reader.onload = function() {
      console.log(reader);
      console.log(reader.result);
      console.log(pako.inflate(reader.result, {to: 'string'}));
      console.log(pako.inflate(hexToStr('1f8b0800000000000000ab562ac8cc4b57b232343537b1343235363737b730a80500866991f416000000'), {to: 'string'}));
    };
    reader.readAsText(evt.data)
  };
  ws.onerror = function(evt) {
    console.log(evt);
  }
  </script>
</head>
<body></body>
</html>