import pymysql
from . import base


class Account(base.Base):

    def search(self, preconditions):
        return super().search('account', preconditions)

    def search_all(self):
        return super().search_all('account')
    
    def add(account, password, role, email_adr):
        # 打开数据库连接
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        # SQL 插入语句
        sql = "INSERT INTO `paper`.`account` (`Account`, `Password`, `Role`, `Email_Adr`) VALUES (%s, %s, %s, %s)"
        try:
            # 执行sql语句
            cursor.execute(sql, [account, password, role, email_adr])
            # 提交到数据库执行
            db.commit()
            db.close()
            return True
        except Exception as e:
            # 如果发生错误则回滚
            db.rollback()
            db.close()
            raise e

    def Code(account):
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        # SQL 查询语句
        sql = "SELECT * FROM paper.account where Account=%s"
            # 执行SQL语句
        cursor.execute(sql, account)
            # 获取所有记录列表
        results = cursor.fetchall()
        PassWord='1'
        for row in results:
            PassWord=row[1]
            db.close()
            return PassWord

    def CheckCode(account,password):
        if(password==Account.Code(account)):
            return 1
        else:
            return 0

    def reset(account, k_v):
        print(k_v)
        # 打开数据库连接
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")
        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        preconditions = ""
        for pre in k_v:
            preconditions = preconditions + pre + ', '
        preconditions = preconditions[:-2]
        sql = "UPDATE account SET " + preconditions + "where Account=%s"
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
   print(Account.search(['visible=1', 'account="jinshan"']))
