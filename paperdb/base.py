import pymysql

class Base(object):

	def search(self, table, preconditions):
		# 打开数据库连接
		db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

		# 使用cursor()方法获取操作游标
		cursor = db.cursor()

		# SQL 查询语句
		sql = "SELECT * FROM paper." + table + " where "
		for pre in preconditions:
			sql = sql + pre + ' AND '
		sql = sql[:-5]
		print(sql)
		try:
			cursor.execute(sql)
			results = cursor.fetchall()
			db.close()
			return results
		except Exception as e:
			db.close()
			raise e

	def search_all(self, table):
		# 打开数据库连接
		db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

		# 使用cursor()方法获取操作游标
		cursor = db.cursor()

		sql = "SELECT * FROM paper." + table + " where visible =%s"
		print(sql)
		cursor.execute(sql,['1'])

		results = cursor.fetchall()

		return results


