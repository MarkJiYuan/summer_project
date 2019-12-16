import pymysql
from . import base


class Editor(base.Base):

    def search(self, preconditions):
        return super().search('editor', preconditions)

    def search_all(self):
        return super().search_all('editor')

    def add(account, name):
        # 打开数据库连接
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        # SQL 插入语句
        sql = "INSERT INTO `paper`.`editor` (`Account`, `姓名`) VALUES (%s, %s)"
        try:
            # 执行sql语句
            cursor.execute(sql,[account,name])
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
        sql = "UPDATE `paper`.`editor` SET `visible` = %s WHERE (`Account` = %s)"
        try:
            # 执行SQL语句
            cursor.execute(sql,["0",account])
            # 提交修改
            db.commit()
            db.close()
            return True
        except Exception as e:
            # 发生错误时回滚
            db.rollback()
            raise e

    def resest(self, account, k_v):
        # 打开数据库连接
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")
        # 使用cursor()方法获取操作游标
        cursor = db.cursor()

        preconditions = ""
        for pre in k_v:
            preconditions = preconditions + pre + ' '
        sql = "UPDATE editor SET" + preconditions + "where Account=%s"
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
    editor = Editor()
    editor.add('wx', '微笑')
    editor.add('weixiao', '微小说')
    print(editor.search_all())
    
