import pymysql
import datetime
from .author import Author
from . import base


class Article(base.Base):

    def search(self, preconditions):
        return super().search('article', preconditions)

    def search_all(self):
        return super().search_all('article', preconditions)

    def add(idArticle,submit_times,account,title,abstract,keywords,author_list,path,changeable):
         # 打开数据库连接
         db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

         # 使用cursor()方法获取操作游标
         cursor = db.cursor()

         # SQL 插入语句
         print(author_list)
         writer = ""
         for author in author_list:
             name = author[0]
             institution = author[1]
             email_adr = author[2]
             idAuthor = Author.check(name, institution, email_adr)
             writer = writer + str(idAuthor) + '/'
         writer = writer[:-1]

         now_time=datetime.datetime.strftime(datetime.datetime.now(),'%Y-%m-%d %H:%M:%S')
         sql = "INSERT INTO paper.article (id, 投稿次数, account, 题目, 摘要, 关键词, 作者, 附件路径, changeable, 提交时间) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
         print(sql)
         try:
             # 执行sql语句
             cursor.execute(sql,[idArticle,submit_times,account,title,abstract,keywords,writer,path,changeable,now_time])
             # 提交到数据库执行
             db.commit()
             db.close()
             return True
         except Exception as e:
             # 如果发生错误则回滚
             db.rollback()
             db.close()
             raise e

    def reset(idArticle, submit_times, k_v):
        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")
        cursor = db.cursor()

        preconditions = ""
        for pre in k_v:
            preconditions = preconditions + pre + ' ,'
        preconditions = preconditions[:-2]
        sql = "UPDATE article SET " + preconditions + " where id=%s and 投稿次数=%s"
        print(sql)
        cursor.execute(sql, [idArticle, submit_times])

        try:
            db.commit()
            db.close()
            return True
        except Exception as e:
            db.rollback()
            db.close()
            raise e

    def add_article(account,title,abstract,keyword,author_list,path,changeable):

        db = pymysql.connect("localhost", "root", "521Luozhenyi", "paper")

        cursor = db.cursor()
        sql = "SELECT * FROM paper.article"
        cursor.execute(sql)

        idArticle = len(cursor.fetchall()) + 1
        submit_times = 1

        return Article.add(idArticle, submit_times, account, title, abstract, keyword, author_list, path, changeable)



if __name__ == '__main__':
    Article.reset('1', '1', ['摘要="你是大母猪"'])