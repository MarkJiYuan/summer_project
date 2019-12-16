from .accept import Accept

class Test(object):

	def __init__(self):
		self.db = Accept()

	def log(self, res):
		if res == None or type(res) == bool:
			print(res)
			return
		print('数据类型：' + str(type(res)), '长度：' + str(len(res)))
		print(res)

	# 101 注册账户(account, password, role, email_adr)
	def test101(self):
		account = ['submitter', 'submitter', 'submitter', '123456@123.com']
		res = self.db.accept(101, account)
		self.log(res)

	# 102 查询账户(字段=值)
	def test102(self):
		res = self.db.accept(102, ['account="zjy"'])
		self.log(res)

	# 103 保存稿件(account, title, abstract, key_word, author_list, path, changeble)
	def test103(self):
		author_list = [['zjy', '清华', '123@123.com'], ['hbt', '清华', '234@234.com']]
		article = ['zjy', '1号文章', '做个实验', 'IS/POM', author_list, '/Users/zhengjiyuan/Desktop', 1]
		res = self.db.accept(103, article)
		self.log(res)

	# 104 查询稿件(字段=值)
	def test104(self):
		k_v = ['id="1"']
		res = self.db.accept(104, k_v)
		self.log(res)

	# 105 修改稿件(id, 投稿次数，字段=值)
	def test105(self):
		new_article = ['2', '1', '关键词="是垃圾"']
		res = self.db.accept(105, new_article)
		self.log(res)

	# 106 修改邮箱或密码(account, 字段=值)
	def test106(self):
		new_account = ['jinshan', 'Password="777"', 'Email_adr="329106107@qq.com"']
		res = self.db.accept(106, new_account)
		self.log(res)

	# 107 正式提交稿件(id, 投稿次数)
	def test107(self):
		article = ['2', '1']
		res = self.db.accept(107, article)
		self.log(res)

	# 108 editor审稿(id, 投稿次数)
	# 格式审查中，article审1改“正处理”，审2改“editor正审”
	def test108(self):
		article = ['2', '1']
		res = self.db.accept(108, article)
		self.log(res)
	

	# 109 editor审完(id, 投稿次数, 1/0)
	# 	1 -- 格式审查通过，article审2改“大boss待审”，editor待处理移到大boss待处理
	# 	0 -- 格式审查失败，article审1改“已完成”审2改“待修改”，从editor待处理移除
	def test109(self):
		article = ['2', '1', 1]
		res = self.db.accept(109, article)
		self.log(res)

	# 110 添加账户(account, password, role, email_adr, 姓名，机构，领域)
	def test110(self):
		account1 = ['jinshan', '456', 'AE', '123@123.com', '金山', '北华大学', '服务器']
		res = self.db.accept(110, account1)
		self.log(res)

		account2 = ['zjy', '456', 'Reviewer', '123@123.com', '郑吉源', '清华大学', '云服务']
		res = self.db.accept(110, account2)
		self.log(res)

		account3 = ['wx', '456', 'Editor', '213@234.com', '微笑', '北华大学', '服务器大']
		res = self.db.accept(110, account3)
		self.log(res)


	# 111 修改账户(account, role, 字段=值)
	def test111(self):
		new_account = ['jinshan', 'AE', '姓名="山本"', 'password="666"']
		res = self.db.accept(111, new_account)
		self.log(res)

	# 112 查询账户(role)
	def test112(self):
		res = self.db.accept(112, ['AE'])
		self.log(res)

		res = self.db.accept(112, ['Editor'])
		self.log(res)

		res = self.db.accept(112, ['Author'])
		self.log(res)

		res = self.db.accept(112, ['Reviewer'])
		self.log(res)

	# 113 指派ae(ae_account, id, 投稿次数)
	# 	article表中审2改“ae待审”，AE字段添加ae_account
	def test113(self):
		msg = ['jinshan', '2', '1']
		res = self.db.accept(113, msg)
		self.log(res)

	# 114 指派reviewers(reviewers_account, id, 投稿次数)
	# 	article表中审2改“reviewers待审”，reviewers字段添加reviewer_account
	def test114(self):
		msg = ['zjy', '2', '1']
		res = self.db.accept(114, msg)
		self.log(res)

	# 115 ae审稿(id, 投稿次数)
	# 	article表审2改“ae正审”
	def test115(self):
		msg = ['2', '1']
		res = self.db.accept(115, msg)
		self.log(res)

	# 116 ae审完(id, 投稿次数)
	# 	article表审2改“大boss待评论”
	def test116(self):
		msg = ['2', '1']
		res = self.db.accept(116, msg)
		self.log(res)


	# 117 revierwers审稿(id, 投稿次数)
	# 	article表审2改“reviewers正审”
	def test117(self):
		msg = ['2', '1']
		res = self.db.accept(117, msg)
		self.log(res)

	# 118 revierwers审完(id, 投稿次数)
	# 	article表审2改“ae待评论”
	def test118(self):
		msg = ['2', '1']
		res = self.db.accept(118, msg)
		self.log(res)

	# 119 大boss审稿(id, 投稿次数)
	# 	article表审2改“大boss正审”
	def test119(self):
		msg = ['2', '1']
		res = self.db.accept(119, msg)
		self.log(res)

	# 120 大boss审完(id, 投稿次数, 审阅状态2)
	# 	审1改已完成
	def test120(self):
		msg = ['2', '1', '决定发表']
		res = self.db.accept(120, msg)
		self.log(res)

	# 121 提交2审稿件(id, 投稿次数，103参数)
	# 	1审那一条审2改“已完成”，新建一条原id，原投稿次数+1的数据插入到article表中
	def test121(self):
		author_list = [['芽衣', '女武神', '123@123.com'], ['琪亚娜', '天命', '234@234.com']]
		article = ['2', '4', 'lalala', '德丽莎', '开个玩笑', 'IS/POM', author_list, '/Users/zhengjiyuan/Desktop', 1]
		res = self.db.accept(121, article)
		self.log(res)


if __name__=='__main__':
	tester = Test()
	# tester.test101()
	# tester.test102()
	# tester.test103()
	# tester.test104()
	# tester.test105()
	# tester.test106()
	# tester.test107()
	# tester.test108()
	# tester.test109()
	# tester.test110()
	# tester.test111()
	# tester.test112()
	# tester.test113()
	# tester.test114()
	# tester.test115()
	# tester.test116()
	# tester.test117()
	# tester.test118()
	# tester.test119()
	# tester.test120()
	# tester.test121()