from .account import Account
from .ae import AE
from .article import Article
from .reviewer import Reviewer
from .editor import Editor
from .author import Author

class Accept:

    def accept(self, key_word, list):
        print('状态码:', key_word, '参数:', list)

        # 101 注册账户(account, password, role, email_adr)
        if(key_word == 101):
            return self.register(list)

        # 102 查询账户(字段=值)
        if(key_word == 102):
            return self.seek_account(list)

        # 103 保存稿件(account, title, abstract, key_word, author_list, path, changeble)
        if(key_word == 103):
            return self.submit(list)
        
        # 104 查询稿件(字段=值)
        if(key_word == 104):
            return self.seek_article(list)
            
        # 105 修改稿件(id, 投稿次数，字段=值)
        if(key_word == 105):
            return self.reset_article(list)
            

        # 106 修改邮箱或密码(account, 字段=值)
        if(key_word == 106):
            return self.reset_password_email(list)
            
        # 107 正式提交稿件(id, 投稿次数)
        if(key_word == 107):
            return self.real_submit(list)

        # 108 editor审稿(id, 投稿次数)
        #   格式审查中，article审1改“正处理”，审2改“editor正审”
        if(key_word == 108):
            return self.editor_review(list)
            
        # 109 editor审完(id, 投稿次数, 1/0)
        # 1 -- 格式审查通过，article审2改“大boss待审”，editor待处理移到大boss待处理
        # 0 -- 格式审查失败，article审1改“已完成”审2改“待修改”，从editor待处理移除
        if(key_word == 109):
            return self.editor_finish(list)
            

        # 110 添加账户(account, password, role, 姓名，机构，领域)
        if(key_word == 110):
            return self.add_account(list)

        # 111 修改账户(account, role, 字段=值)
        if(key_word == 111):
            return self.reset_account(list)
            
        # 112 查询账户(role, account)
        if(key_word == 112):
            return self.seek_role(list)
        
        # 113 指派ae(ae_account, id, 投稿次数)
        #     article表中审2改“ae待审”，AE字段添加ae_account
        if(key_word == 113):
            return self.set_ae(list)

        # 114 指派reviewers(reviewers_account, id, 投稿次数)
        #     article表中审2改“reviewers待审”，reviewers字段添加reviewer_account
        if(key_word == 114):
            return self.set_reviewers(list)

        # 115 ae审稿(id, 投稿次数)
        #     article表审2改“ae正审”
        if(key_word == 115):
            return self.ae_review(list)
            
        # 116 ae审完(id, 投稿次数)
        #     article表审2改“大boss待评论”
        if(key_word == 116):
            return self.ae_finish(list)
            

        # 117 revierwers审稿(id, 投稿次数)
        #     article表审2改“reviewers正审”
        if(key_word == 117):
            return self.reviewer_review(list)
            
        # 118 revierwers审完(id, 投稿次数)
        #     article表审2改“ae待评论”
        if(key_word == 118):
            return self.reviewer_finish(list)
            
        # 119 大boss审稿(id, 投稿次数)
        #     article表审2改“大boss正审”
        if(key_word == 119):
            return self.Big_review(list)
            
        # 120 大boss审完(id, 投稿次数, 审阅状态2)
        #     审1改已完成  
        if(key_word == 120):
            return self.Big_finish(list)
            
        # 121 提交2审稿件(id, 投稿次数，103参数)
        #     1审那一条审2改“已完成”，新建一条原id，原投稿次数+1的数据插入到article表中
        if(key_word == 121):
            return self.re_submit(list)

        # 122 查询作者(idAuthor)
        if(key_word == 122):
            return self.seek_author(list);
            
    # 101 注册账户(account, password, role, email_adr)
    def register(self, list):
        return Account.add(*list)

    # 102 查询账户(字段=值)
    def seek_account(self, list):
        account = Account()
        return account.search(list)

    # 103 保存稿件(account, title, abstract, key_word, author_list, path, changeble)
    def submit(self, list):
        return Article.add_article(*list)
        
    # 104 查询稿件(字段=值)
    def seek_article(self, list):
        article = Article()
        return article.search(list)


    # 105 修改稿件(id, 投稿次数，字段=值)
    def reset_article(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = list[2:]
        return Article.reset(idArticle, submit_times, k_v)

    # 106 修改邮箱或密码(account, 字段=值)
    def reset_password_email(self, list):
        account = list[0]
        k_v = list[1:]
        return Account.reset(account, k_v)

    # 107 正式提交稿件(id, 投稿次数)
    #   changeble改为0，article审2改“editor待审”
    def real_submit(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['changeable=0', '审阅状态2="editor待审"']
        return Article.reset(idArticle, submit_times, k_v)
        
    # 108 editor审稿(id, 投稿次数)
    #   格式审查中，article审1改“正处理”，审2改“editor正审”
    def editor_review(self, list):
        idArticle = list[0]
        submit_times = list[1]
        return Article.reset(idArticle, submit_times, ['审阅状态1="正处理"','审阅状态2="editor正审"'])
    
    # 109 editor审完(id, 投稿次数, 1/0)
    # 1 -- 格式审查通过，article审2改“大boss待审”，editor待处理移到大boss待处理
    # 0 -- 格式审查失败，article审1改“已完成”审2改“待修改”
    def editor_finish(self, list):
        flag=list[2]
        list_pre = [list[0], list[1], []]
        if(flag == '1' or flag == 1):
            list_pre[2].append('审阅状态2="大boss待审"')
        if(flag == '0' or flag == 0):
            list_pre[2].append('审阅状态1="已完成"')
            list_pre[2].append('审阅状态2="待修改"')
        return Article.reset(*list_pre)    

    # 110 添加账户(account, password, role, email_adr, 姓名，机构，领域)
    def add_account(self, list):
        Account.add(*list[:4])
        if(list[2] == 'associateeditor'):
            return AE.add(list[0],list[4],list[5],list[6])
        if(list[2] == 'reviewer'):
            return Reviewer.add(list[0],list[4],list[5],list[6])
        if(list[2] == 'editor'):
            return Editor.add(list[0], list[4])
            
    # 111 修改账户(account, role, 字段=值)
    def reset_account(self, list):
        account = list[0]
        role = list[1]
        k_v = list[2:]

        k_v1 = []
        k_v2 = []
        for kv in k_v:
            if kv[:2] == '姓名' or kv[:2] == '机构' or kv[:2] == '领域':
                k_v2.append(kv)
            else:
                k_v1.append(kv)
        try:
            if k_v1 != []:
                res1 = Account.reset(account, k_v1)
            if k_v2 != []:
                if(role == 'associateeditor'):
                    res2 = AE.reset(account, k_v2)
                if(role == 'reviewer'):
                    res2 = Reviewers.reset(account, k_v2)
                if(role == 'editor'):
                    res2 = Editor.reset(account, k_v2)
        except Exception as e:
            raise e
        return True

    # 112 查询账户(role, account)
    def seek_role(self, list):
        role = list[0]
        if(role == 'associateeditor'):
            ae = AE()
            try:
                pre1 = 'account="' + list[1] + '"'
                return ae.search([pre1])
            except IndexError as e:
                return ae.search_all()
        if(role == 'reviewer'):
            reviewer = Reviewer()
            try:
                pre1 = 'account="' + list[1] + '"'
                return reviewer.search([pre1])
            except IndexError as e:
                return reviewer.search_all()
        if(role == 'editor'):
            editor = Editor()
            try:
                pre1 = 'account="' + list[1] + '"'
                return editor.search([pre1])
            except IndexError as e:
                return editor.search_all()
        if(role == 'author'):
            author = Author()
            try:
                pre1 = 'account="' + list[1] + '"'
                return author.search([pre1])
            except IndexError as e:
                return author.search_all()
            
    # 113 指派ae(ae_account, id, 投稿次数)
    #     article表中审2改“ae待审”，AE字段添加ae_account
    def set_ae(self, list):
        ae_account=list[0]
        idArticle=list[1]
        submit_times=list[2]

        preconditions = 'id=' + str(idArticle) + '/' + '投稿次数=' + str(submit_times)
        preconditions = preconditions.split('/')

        article = Article()
        aes = article.search(preconditions)[0][11]

        if aes != None:
            aes = aes + '/' + ae_account
        else:
            aes = ae_account

        k_v = '审阅状态2="ae待审"' + '/' + 'AE="' + aes + '"'
        k_v = k_v.split('/')
        
        return Article.reset(idArticle, submit_times, k_v)
        
    # 114 指派reviewers(reviewers_account, id, 投稿次数)
    #   article表中审2改“reviewers待审”，reviewers字段添加reviewer_account
    def set_reviewers(self, list):
        reviewer_account = list[0]
        idArticle = list[1]
        submit_times = list[2]
        
        preconditions = 'id=' + str(idArticle) + '/' + '投稿次数=' + str(submit_times)
        preconditions = preconditions.split('/')

        article = Article()
        reviewers = article.search(preconditions)[0][12]

        if reviewers != None:
            reviewers = reviewers + '/' + reviewer_account
        else:
            reviewers = reviewer_account

        k_v = '审阅状态2="reviewers待审"' + '/' + 'reviewers="' + reviewers + '"'
        k_v = k_v.split('/')
        
        return Article.reset(idArticle, submit_times, k_v)
    

    # 115 ae审稿(id, 投稿次数)
    #     article表审2改“ae正审”
    def ae_review(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['审阅状态2="ae正审"']
        return Article.reset(idArticle,submit_times,k_v)
        

    # 116 ae审完(id, 投稿次数)
    #   article表审2改“大boss待评论“
    def ae_finish(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['审阅状态2="大boss待评论"']
        return Article.reset(idArticle, submit_times, k_v)
        

    # 117 revierwers审稿(id, 投稿次数)
    #   article表审2改“reviewers正审”
    def reviewer_review(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['审阅状态2="reviewers正审"']
        return Article.reset(idArticle, submit_times, k_v)

    # 118 revierwers审完(id, 投稿次数)
    #   article表审2改“ae待评论”
    def reviewer_finish(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['审阅状态2="ae待评论"']
        return Article.reset(idArticle, submit_times, k_v)
        

    # 119 大boss审稿(id, 投稿次数)
    #   article表审2改“大boss正审”
    def Big_review(self, list):
        idArticle = list[0]
        submit_times = list[1]
        k_v = ['审阅状态2="大boss正审"']
        return Article.reset(idArticle, submit_times, k_v)

    # 120 大boss审完(id, 投稿次数, 审阅状态2)
    #     审1改已完成
    def Big_finish(self, list):
        idArticle = list[0]
        submit_times = list[1]
        shen_2=list[2]
        k_v = '审阅状态1="已完成"' + '/' + '审阅状态2="' + shen_2 + '"'
        k_v = k_v.split('/')
        return Article.reset(idArticle, submit_times, k_v)

    # 121 提交2审稿件(id, 投稿次数，103参数)
    #     1审那一条审2改“已完成”，新建一条原id，原投稿次数+1的数据插入到article表中
    def re_submit(self, list):
        idArticle = list[0]
        submit_times = int(list[1])
        k_v = ['审阅状态2="已完成"']
        flag1 = Article.reset(idArticle, submit_times, k_v)
        flag2 = Article.add(idArticle, submit_times + 1, *list[2:])
        return flag1 and flag2

    # 122 查询作者(idAuthor)
    def seek_author(self, list):
        author = Author()
        return author.search(list)





if __name__ == '__main__':
    self.accept(110,['10','1','AE','4','5','6','7'])
    #self.accept(103,['AE=10'])