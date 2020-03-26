const crypto = require('crypto');

// 当前时间戳 => 1585210475.958
console.log(Date.now() / 1000);
// 当前时间戳 => 1585210475958
console.log(Date.now());
// 当前时间戳 => 1585210475
console.log(parseInt(Date.now() / 1000));

// 当前日期 => 2020-03-26 17:41:51
const now = new Date();
console.log(now.getFullYear()
  + '-' + ('' + (now.getMonth() + 101)).substr(1)
  + '-' + ('' + (now.getDay() + 100)).substr(1)
  + ' ' + ('' + (now.getHours() + 100)).substr(1)
  + ':' + ('' + (now.getMinutes() + 100)).substr(1)
  + ':' + ('' + (now.getSeconds() + 100)).substr(1));
// 日期转时间戳 => 1585215711000
console.log(new Date('2020-03-26 17:41:51').getTime());
// 时间戳转日期 => 2020-03-26 17:41:51
const date1 = new Date(1585215711 * 1000);
console.log(date1.getFullYear()
  + '-' + ('' + (date1.getMonth() + 101)).substr(1)
  + '-' + ('' + (date1.getDay() + 100)).substr(1)
  + ' ' + ('' + (date1.getHours() + 100)).substr(1)
  + ':' + ('' + (date1.getMinutes() + 100)).substr(1)
  + ':' + ('' + (date1.getSeconds() + 100)).substr(1));

// MD5 => 81c3e1453f208fe91c58cdcfc7ac6730
console.log(crypto.createHash('md5').update('我爱你中国～').digest('hex'));

// 字符串转16进制 => 68-69-20-6211-7231-4f60-4e2d-56fd-ff5e
console.log('hi 我爱你中国～'.split('').map(v => v.charCodeAt(0).toString(16)).join('-'))
// 16进制转字符串 => hi 我爱你中国～
'68-69-20-6211-7231-4f60-4e2d-56fd-ff5e'.split('-').map(v => String.fromCharCode(parseInt(v, 16))).join('')

// SPLIT/INDEXOF/SUB_STR/SORT/REPLACE/JOIN => 193456
const uri = 'http://example.com?b=456&a=123';
const param = uri.substr(uri.indexOf('?') + 1);
const paramArr = param.split('&').sort();
let result = '';
for (const v of paramArr) {
  result += v.split('=')[1].replace('2', '9')
}
console.log(result);