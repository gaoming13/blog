import time
import hashlib
import datetime

# 当前时间戳 => 1585210475.958682
print(time.time())
# 当前时间戳 => 1585210475958
print(int(time.time()*1000))
# 当前时间戳 => 1585210475
print(int(time.time()))

# 当前日期 => 2020-03-26 17:41:51
print(time.strftime('%Y-%m-%d %H:%M:%S'))
# 日期转时间戳 => 1585215711.0
print(time.mktime(time.strptime('2020-03-26 17:41:51', '%Y-%m-%d %H:%M:%S')))
# 时间戳转日期 => 2020-03-26 17:41:51
print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(1585215711)))

# MD5 => 81c3e1453f208fe91c58cdcfc7ac6730
m = hashlib.md5()
m.update('我爱你中国～'.encode('utf-8'))
print(m.hexdigest())

# 字符串转16进制 => 68-69-20-6211-7231-4f60-4e2d-56fd-ff5e
# 104-105-32-230-231-228-228-229-239
arr = []
for v in 'hi 我爱你中国～':
  arr.append(hex(ord(v))[2:])
print('-'.join(arr))
# 16进制转字符串 => hi 我爱你中国～
arr = []
for v in '68-69-20-6211-7231-4f60-4e2d-56fd-ff5e'.split('-'):
  arr.append(chr(int(v, 16)))
print(''.join(arr))

# SPLIT/INDEXOF/SUB_STR/SORT/REPLACE/JOIN => 193456
uri = 'http://example.com?b=456&a=123'
param = uri[uri.find('?') + 1:]
paramArr = param.split('&')
paramArr = sorted(paramArr)
result = ''
for v in paramArr:
  result += v.split('=')[1].replace('2', '9')
print(result)