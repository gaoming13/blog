import requests
import pymysql
import json
import time
import random
import os

db = pymysql.connect(host='127.0.0.1', user='root', password='', db='mzt4', charset='utf8mb4')

def query(sql):
  cursor = db.cursor()
  cursor.execute(sql)
  return cursor.fetchall()

def execute(sql):
  cursor = db.cursor()
  cursor.execute(sql)
  db.commit()

res = query('SELECT id,title,content,cover,status FROM mi_article WHERE type = 1 ORDER BY id DESC')
num = 0
for v in res:
  conArr = json.loads(v[2])
  for v1 in conArr:
    pic = v1['pic']
    picPath = '/var/www/com.mzt4.www/i0/data' + pic
    if (os.path.exists(picPath) != True):
      print(v1['name'])
      print(' ' + picPath)
      num += 1
db.close()
print(num)