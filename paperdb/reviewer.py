import pymysql
from . import base

class Reviewer(base.Base):

    def search(self, preconditions):
        return super().search('reviewers', preconditions)

    def search_all(self):
        return super().search_all('reviewers')

    def add(account, name, institution, field):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 插入语句
         sql = "INSERT INTO `paper`.`reviewers` (`Account`, `姓名`, `机构`, `领域`) VALUES (%s, %s, %s, %s)"
         try:
             # 执行sql语句
             cursor.execute(sql,[account,name,institution,field])
             # 提交到数据库执行
             db.commit()
             db.close()
             return True
         except Exception as e:
             # 如果发生错误则回滚
             db.rollback()
             db.close()
             raise e


         
    def delete(self, account):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 删除语句
         sql = "UPDATE `paper`.`reviewers` SET `visible` = %s WHERE (`Account` = %s)"
         try:
             # 执行SQL语句
             cursor.execute(sql,["0",account])
             # 提交修改
             db.commit()
         except:
             # 发生错误时回滚
             db.rollback()

         # 关闭连接
         db.close()

    def reset(account, k_v):
        # 打开数据库连接
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")
        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        preconditions = ""
        for pre in k_v:
            preconditions = preconditions + pre + ' ,'
        preconditions = preconditions[:-2]
        sql = "UPDATE reviewers SET " + preconditions + "where Account=%s"
        print(sql)
        cursor.execute(sql, account)

        try:
            db.commit()
            db.close()
            return True
        except Exception as e:
            db.rollback()
            db.close()
            raise e

if __name__ == '__main__':
    Reviewer.reset('zjy', ['姓名="大母猪"', '领域="干垃圾"'])
