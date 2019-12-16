import pymysql
from . import base

class Author(base.Base):

    def search(self, preconditions):
        return super().search('author', preconditions)

    def search_all(self):
        return super().search_all('author')

    def add(name, institution, Email_adr):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 插入语句
         sql = "INSERT INTO `paper`.`author` (`作者`, `机构`, `Email_adr`) VALUES (%s, %s, %s)"
         try:
             # 执行sql语句
             cursor.execute(sql,[name, institution, Email_adr])
             # 提交到数据库执行
             db.commit()
             db.close()
             return True
         except Exception as e:
             # 如果发生错误则回滚
             db.rollback()
             db.close()
             raise e

    def check(name, institution, Email_adr):
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()
         sql = "SELECT * FROM paper.author where 作者=%s and 机构=%s and Email_adr=%s"
         cursor.execute(sql, [name, institution, Email_adr])  # 执行sql
         
         data = cursor.fetchall()

         if data == ():
            Author.add(name, institution, Email_adr)
            return Author.check(name, institution, Email_adr)
         else:
            idAuthor = data[0][0]
            return idAuthor


    def delete(idAuthor):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 删除语句
         sql = "UPDATE `paper`.`author` SET `visible` = %s WHERE (`idAuthor` = %s)"
         try:
             # 执行SQL语句
             cursor.execute(sql,["0",idAuthor])
             # 提交修改
             db.commit()
         except:
             # 发生错误时回滚
             db.rollback()

         # 关闭连接
         db.close()

    def reset(idAuthor, name, institution, Email_Adr):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 插入语句
         sql = "UPDATE ae SET 作者=%s,机构=%s,Email_Adr=%s where idAuthor=%s"
         try:
             # 执行sql语句
             cursor.execute(sql, [name, institution, Email_Adr,idAuthor])
             # 提交到数据库执行
             db.commit()
             print("success")
         except:
             # 如果发生错误则回滚
             print("fail")
             db.rollback()

         # 关闭数据库连接
         db.close()


if __name__ == '__main__':
    print(Author.check('hbt', '清华大学', 'cs'))