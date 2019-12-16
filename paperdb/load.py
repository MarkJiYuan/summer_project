class Account(object):

	def __init__(self, re):
		self.account = re[0]
		self.password = re[1]
		self.role = re[2]
		self.email = re[3]
		self.visible = re[4]

class AE(object):

	def __init__(self, re):
		self.account = re[0]
		self.name = re[1]
		self.institution = re[2]
		self.field = re[3]
		self.visible = re[4]

class Article(object):

	def __init__(self, re):
		self.idArticle = re[0]
		self.submit_times = re[1]
		self.title = re[2]
		self.abstract = re[3]
		self.keywords = re[4]
		self.author = re[5]
		self.submit_time = re[6]
		self.path = re[7]
		self.shen1 = re[8]
		self.shen2 = re[9]
		self.visible = re[10]
		self.aes = re[11]
		self.reviewers = re[12]
		self.changeable = re[13]
		self.account = re[14]

class Author(object):

	def __init__(self, re):
		self.idAuthor = re[0]
		self.name = re[1]
		self.institution = re[2]
		self.email = re[3]
		self.visible = re[4]

class Editor(object):

	def __init__(self, re):
		self.account = re[0]
		self.name = re[1]
		self.visible = re[2]

class Reviewer(object):

	def __init__(self, re):
		self.account = re[0]
		self.name = re[1]
		self.institution = re[2]
		self.field = re[3]
		self.visible = re[4]

class Loader(object):

	def log(res):
		if res == None or type(res) == bool:
			print(res)
			return
		print('数据类型：' + str(type(res)), '长度：' + str(len(res)))
		print(res)

	def ae(res):
		ae_l = []
		for re in res:
			ae_l.append(AE(re))
		return ae_l

	def account(res):
		account_l = []
		for re in res:
			account_l.append(Account(re))
		return account_l

	def article(res):
		article_l = []
		for re in res:
			article_l.append(Article(re))
		return article_l

	def editor(res):
		editor_l = []
		for re in res:
			editor_l.append(Editor(re))
		return editor_l

	def reviewer(res):
		reviewer_l = []
		for re in res:
			reviewer_l.append(Reviewer(re))
		return reviewer_l

	def author(res):
		author_l = []
		for re in res:
			author_l.append(Author(re))
		return author_l







