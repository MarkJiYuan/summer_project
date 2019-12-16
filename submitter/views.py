import os
from django.shortcuts import render, redirect
from paperdb.accept import Accept
from paperdb.load import Loader

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = BASE_DIR + '/upload/'

def index(request):
	context = {}
	welcome = '欢迎您！投稿人' + request.session['username']
	return render(request, 'submitter/index.html', {
			'message': welcome
		})

def submit(request):
	context = {
		'form_name': '新增投稿'
	}
	return render(request, 'submitter/submit.html', context)

def upload_file(request):

	is_second_submit = request.POST['is_second_submit']

	# 获取附件，判断是否为空
	myfile = request.FILES.get("myfile", None)

	if not myfile:
		if not is_second_submit:
			return render(request, 'submitter/submit.html', {
					'message': '没有提交附件!',
					'form_name': '新增投稿'
				})
		else:
			return render(request, 'submitter/submit.html', {
					'message': '没有提交附件!',
					'form_name': '二审投稿'
				})

	extension = os.path.splitext(myfile.name)[1]

	db = Accept()

	account = request.session['username']
	title = request.POST['title']
	author = request.POST['author']
	abstract = request.POST['abstract']
	keywords = request.POST['keywords']

	if not is_second_submit:

		# 将附件进行存储，记录fileurl, 目前仅支持单个附件
		dir_name = title
		path = UPLOAD_DIR + dir_name + '_ver1/'
		
		try:
			os.mkdir(path)
			fileurl = path + title + extension
			with open(fileurl, 'wb+') as f:
				for chunk in myfile.chunks():
					f.write(chunk)
		except Exception as e:
			print(e)
			return render(request, 'submitter/submit.html', {
					'message': '文章名称重复！请检查后重新投稿',
					'form_name': '新增投稿'
				})

		db.accept(103, [account, title, abstract, keywords, [[author, '无名机构', '破烂邮箱']], path, 1])

		pre1 = '附件路径="' + path + '"'
		paper = db.accept(104, [pre1])
		paper = Loader.article(paper)[0]

		db.accept(107, [paper.idArticle, paper.submit_times])

		return render(request, 'submitter/index.html', {
				'message': '提交成功，不可再修改，可在过往投稿中查看审阅状态'
			})
	else:
		old_idArticle = request.POST['old_idArticle']
		old_submit_times = request.POST['old_submit_times']
		old_path = request.POST['old_path']
		version = '_ver' + str(old_submit_times)
		new_path = old_path.split(version)[0] + '_ver' + str(int(old_submit_times) + 1) + '/'

		
		try:
			os.mkdir(new_path)
			fileurl = new_path + title + extension
			with open(fileurl, 'wb+') as f:
				for chunk in myfile.chunks():
					f.write(chunk)
		except Exception as e:
			print(e)
			return render(request, 'submitter/submit.html', {
					'message': '文章名称重复！请检查后重新投稿',
					'form_name': '二审投稿'
				})

		db.accept(121, [old_idArticle, old_submit_times, account, title, abstract, keywords, [[author, '无名机构', '破烂邮箱']], new_path, 1])

		pre1 = '附件路径="' + new_path + '"'
		paper = db.accept(104, [pre1])
		paper = Loader.article(paper)[0]

		db.accept(107, [paper.idArticle, paper.submit_times])

		return render(request, 'submitter/index.html', {
				'message': '二审提交成功，不可再修改，可在过往投稿中查看审阅状态'
			})


def save_file(request):

	is_second_submit = request.POST['is_second_submit']

	# 获取附件，判断是否为空
	myfile = request.FILES.get("myfile", None)

	if not myfile:
		if not is_second_submit:
			return render(request, 'submitter/submit.html', {
					'message': '没有提交附件!',
					'form_name': '新增投稿'
				})
		else:
			return render(request, 'submitter/submit.html', {
					'message': '没有提交附件!',
					'form_name': '二审投稿'
				})

	extension = os.path.splitext(myfile.name)[1]

	db = Accept()

	account = request.session['username']
	title = request.POST['title']
	author = request.POST['author']
	abstract = request.POST['abstract']
	keywords = request.POST['keywords']

	if not is_second_submit:
		# 将附件进行存储，记录fileurl, 目前仅支持单个附件
		dir_name = title
		path = UPLOAD_DIR + dir_name + '_ver1/'

		try:
			os.mkdir(path)
			fileurl = path + title + extension
			with open(fileurl, 'wb+') as f:
				for chunk in myfile.chunks():
					f.write(chunk)
		except Exception as e:
			print(e)
			return render(request, 'submitter/submit.html', {
					'message': '文章名称重复！请检查后重新投稿',
					'form_name': '新增投稿'
				})


		db.accept(103, [account, title, abstract, keywords, [[author, '无名机构', '破烂邮箱']], path, 1])

		return render(request, 'submitter/index.html', {
				'message': '保存成功，可在“保存尚未提交”中进行修改或正式提交'
			})
	else:
		old_idArticle = request.POST['old_idArticle']
		old_submit_times = request.POST['old_submit_times']
		old_path = request.POST['old_path']
		version = '_ver' + str(old_submit_times)
		new_path = old_path.split(version)[0] + '_ver' + str(int(old_submit_times) + 1) + '/'

		try:
			os.mkdir(new_path)
			fileurl = new_path + title + extension
			with open(fileurl, 'wb+') as f:
				for chunk in myfile.chunks():
					f.write(chunk)
		except Exception as e:
			print(e)
			return render(request, 'submitter/submit.html', {
					'message': '文章名称重复！请检查后重新投稿',
					'form_name': '二审投稿'
				})

		db.accept(121, [old_idArticle, old_submit_times, account, title, abstract, keywords, [[author, '无名机构', '破烂邮箱']], new_path, 1])

		return render(request, 'submitter/index.html', {
				'message': '二审保存成功，可在“保存尚未提交”中进行修改或正式提交'
			})


def saved(request):
	db = Accept()

	pre1 = 'account="' + request.session['username'] + '"'
	pre2 = 'visible=1'
	pre3 = 'changeable=1'
	articles = db.accept(104, [pre1, pre2, pre3])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': '保存尚未提交',
		'papers': articles,
	}

	return render(request, 'submitter/saved.html', context)

def submitted(request):
	db = Accept()

	pre1 = 'account="' + request.session['username'] + '"'
	pre2 = 'visible=1'
	pre3 = 'changeable=0'
	articles = db.accept(104, [pre1, pre2, pre3])
	articles = Loader.article(articles)[::-1]

	for article in articles:
		if article.shen1 == '已完成':
			article.shen1 = article.shen2

	context = {
		'table_title': '已提交稿件',
		'papers': articles,
	}

	return render(request, 'submitter/submitted.html', context)


def profile(request, idArticle, submit_times):
	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'

	this_article = db.accept(104, [pre1, pre2])
	this_article = Loader.article(this_article)[0]

	idAuthor = this_article.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	this_article.author = real_author.name

	context = {
		'paper': this_article,
		'allow_change': True,
		'form_name': '稿件详情'
	}

	return render(request, 'submitter/detail_submitter.html', context)

def submitted_profile(request, idArticle, submit_times):
	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'

	this_article = db.accept(104, [pre1, pre2])
	this_article = Loader.article(this_article)[0]

	idAuthor = this_article.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	this_article.author = real_author.name

	if this_article.shen1 == '已完成':
		this_article.shen1 = this_article.shen2

	context = {
		'paper': this_article,
	}

	if this_article.shen2 in ['待修改', '决定发表', '决定不发表']:

		comment_eic_path = this_article.path + 'eic_comment.txt'
		try:
			with open(comment_eic_path, 'r') as f:
				comment_eic = f.read()
		except Exception as e:
			comment_eic = ""

		if comment_eic != "":
			context['current_eic'] = True
			context['comment_eic'] = comment_eic
	
	comment_editor_path = this_article.path + 'editor_comment.txt'
	try:
		with open(comment_editor_path, 'r') as f:
			comment_editor = f.read()
	except Exception as e:
		comment_editor = ""

	if comment_editor != "":
		context['current_editor'] = True
		context['comment_editor'] = comment_editor

	if this_article.shen2 == '待修改':
		context['allow_modify'] = True

	return render(request, 'submitter/detail_submitter.html', context)

def dosubmit(request, idArticle, submit_times):
	db = Accept()

	db.accept(107, [idArticle, submit_times])

	return render(request, 'submitter/index.html', {
			'message': '提交成功，不可再修改，可在过往投稿中查看审阅状态'
		})

def deletepaper(request, idArticle, submit_times):
	db = Accept()

	pre1 = 'visible=0'
	db.accept(105, [idArticle, submit_times, pre1])

	return render(request, 'submitter/index.html', {
			'message': '删除成功'
		})

def resubmit(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	this_article = db.accept(104, [pre1, pre2])
	this_article = Loader.article(this_article)[0]

	context = {
		'form_name': '二审投稿',
		'second_submit': True,
		'old_idArticle': this_article.idArticle,
		'old_submit_times': this_article.submit_times,
		'old_path': this_article.path,
		'old_title': this_article.title,
		'old_abstract': this_article.abstract,
		'old_keywords': this_article.keywords
	}

	return render(request, 'submitter/submit.html', context)




