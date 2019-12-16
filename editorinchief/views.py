import os
import re
from django.shortcuts import render
from django.http import FileResponse
from paperdb.accept import Accept
from paperdb.load import Loader
from smtp.myemail import Email

def index(request):
	context = {}
	welcome = '欢迎您！主编' + request.session['username']
	return render(request, 'editorinchief/index.html', {
			'message': welcome,
		})

def processing(request):

	db = Accept()

	pre1 = '审阅状态2="大boss正审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': '大boss处理中',
		'papers': articles
	}

	return render(request, 'editorinchief/pending.html', context)

def all_articles(request):

	db = Accept()

	articles = db.accept(104, [])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': '全部稿件',
		'papers': articles,
	}

	return render(request, 'editorinchief/all_articles.html', context)

def pending(request):

	db = Accept()

	pre1 = '审阅状态2="大boss待审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	pre1 = '审阅状态2="大boss待评论"'
	comment_articles = db.accept(104, [pre1])
	comment_articles = Loader.article(comment_articles)[::-1]

	articles = comment_articles + articles

	context = {
		'table_title': '大boss待处理',
		'papers': articles
	}

	return render(request, 'editorinchief/pending.html', context)

def profile(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	if paper.shen2 == '大boss待审':
		db.accept(119, [idArticle, submit_times])

	aes = db.accept(112, ['associateeditor'])
	aes = Loader.ae(aes)

	idAuthor = paper.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	paper.author = real_author.name

	context = {
		'paper': paper,
		'aes': aes,
	}

	if paper.shen2 in ['大boss待审', '大boss正审']:
		context['allow_select'] = True

	if paper.shen2 not in ['待处理', 'editor待审', 'editor正审', '待修改', '决定发表', '决定不录用', '已完成']:
		context['allow_comment'] = True
	else:
		context['current_eic'] = request.session['username']
		file_path = paper.path + 'eic_comment.txt'

		try:
			with open(file_path, 'r') as f:
				comment_eic = f.read()
		except Exception as e:
			comment_eic = "主编尚未评价"

		context['comment_eic'] = comment_eic

	if paper.aes != None:
		ae_account = paper.aes.split('/')[0]
		ae = db.accept(112, ['associateeditor', ae_account])
		ae = Loader.ae(ae)[0]
		current_ae = ae.name
		context['current_ae'] = current_ae

		file_path = paper.path + 'ae_' + ae_account + '_comment.txt'

		try:
			with open(file_path, 'r') as f:
				comment_ae = f.read()
		except Exception as e:
			comment_ae = "AE尚未评价"

		context['comment_ae'] = comment_ae

	if paper.reviewers != None:
		reviewer_account = paper.reviewers.split('/')[0]
		reviewer = db.accept(112, ['reviewer', reviewer_account])
		reviewer = Loader.reviewer(reviewer)[0]
		current_reviewer = reviewer.name
		context['current_reviewer'] = current_reviewer

		file_path = paper.path + 'reviewer_' + reviewer_account + '_comment.txt'

		try:
			with open(file_path, 'r') as f:
				comment_reviewer = f.read()
		except Exception as e:
			comment_reviewer = "Reviewer尚未评价"

		context['comment_reviewer'] = comment_reviewer


	return render(request, 'editorinchief/detail_eic.html', context)

def choose_ae(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	ae_account = request.POST['ae_account']

	db.accept(113, [ae_account, idArticle, submit_times])

	em = Email()
	email_context = {
		'sender_name': '迅波投审稿系统',
		'sender': 'zhengjiy16@163.com',
		'receiver_name': ae_account,
		'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
		'subject': request.session['username'] + '：分配给了您新的文章',
		'html': '<h3>尊敬的责编：您好！有新的分配给您的投稿</h3><p>题目：' + paper.title + '</p>',
		'body': '系统自动通知',
		'attachments': [
		],
	}
	em.send_email()

	return render(request, 'editorinchief/index.html', {
			'message': '指派ae成功'
		})

def download_paper(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	for file_name in os.listdir(paper.path):
		answer = re.match(paper.title, file_name)
		if answer != None:
			file_path = paper.path + file_name
			break

	response = FileResponse(open(file_path, 'rb'))
	response['content_type'] = "application/octet-stream"
	response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)

	return response

def admin_editor(request):

	db = Accept()

	editors = db.accept(112, ['editor'])
	editors = Loader.editor(editors)

	context = {
		'table_title': 'editor人员列表',
		'editors': editors,
	}

	return render(request, 'editorinchief/list_editor.html', context)

def new_editor(request):
	context = {
		'form_name': '新增editor'
	}
	return render(request, 'editorinchief/info_editor.html', context)

def add_editor(request):

	db = Accept()

	account = request.POST['account']
	password = request.POST['password']
	role = 'editor'
	email_adr = request.POST['email_adr']
	name = request.POST['nickname']

	db.accept(110, [account, password, role, email_adr, name])

	editors = db.accept(112, ['editor'])
	editors = Loader.editor(editors)

	context = {
		'table_title': 'editor人员列表',
		'editors': editors,
		'message': '添加新editor成功',
	}

	return render(request, 'editorinchief/list_editor.html', context)

def admin_ae(request):

	db = Accept()

	aes = db.accept(112, ['associateeditor'])
	aes = Loader.ae(aes)

	context = {
		'table_title': 'ae人员列表',
		'aes': aes,
	}

	return render(request, 'editorinchief/list_ae.html', context)

def new_ae(request):

	context = {
		'form_name': '新增ae'
	}
	return render(request, 'editorinchief/info_ae.html', context)

def add_ae(request):

	db = Accept()

	account = request.POST['account']
	password = request.POST['password']
	role = 'associateeditor'
	email_adr = request.POST['email_adr']
	name = request.POST['nickname']
	institution = request.POST['institution']
	field = request.POST['field']

	db.accept(110, [account, password, role, email_adr, name, institution, field])

	aes = db.accept(112, ['associateeditor'])
	aes = Loader.ae(aes)

	context = {
		'table_title': 'ae人员列表',
		'aes': aes,
		'message': '添加新ae成功',
	}

	return render(request, 'editorinchief/list_ae.html', context)

def admin_reviewer(request):

	db = Accept()

	reviewers = db.accept(112, ['reviewer'])
	reviewers = Loader.reviewer(reviewers)

	context = {
		'table_title': 'reviewer人员列表',
		'reviewers': reviewers,
	}

	return render(request, 'editorinchief/list_reviewer.html', context)

def new_reviewer(request):

	context = {
		'form_name': '新增reviewer'
	}
	return render(request, 'editorinchief/info_reviewer.html', context)

def add_reviewer(request):

	db = Accept()

	account = request.POST['account']
	password = request.POST['password']
	role = 'reviewer'
	email_adr = request.POST['email_adr']
	name = request.POST['nickname']
	institution = request.POST['institution']
	field = request.POST['field']

	db.accept(110, [account, password, role, email_adr, name, institution, field])

	reviewers = db.accept(112, ['reviewer'])
	reviewers = Loader.reviewer(reviewers)

	context = {
		'table_title': 'reviewer人员列表',
		'reviewers': reviewers,
		'message': '添加新reviewer成功',
	}

	return render(request, 'editorinchief/list_reviewer.html', context)

def finish(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	comment = request.POST['comment']
	judgement = request.POST['judgement']

	comment_path = paper.path + 'eic_comment.txt'
	with open(comment_path, 'w') as f:
		f.write(comment)

	db.accept(120, [idArticle, submit_times, judgement])

	em = Email()
	if judgement == '待修改':
		email_context = {
			'sender_name': '迅波投审稿系统',
			'sender': 'zhengjiy16@163.com',
			'receiver_name': paper.account,
			'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
			'subject': request.session['username'] + '：您的投稿动态',
			'html': '<h3>尊敬的投稿人：您好！您的文章已通过这一轮审核，请继续修改</h3><p>题目：' + paper.title + '</p>',
			'body': '系统自动通知',
			'attachments': [
			],
		}
	if judgement == '决定发表':
		email_context = {
			'sender_name': '迅波投审稿系统',
			'sender': 'zhengjiy16@163.com',
			'receiver_name': paper.account,
			'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
			'subject': request.session['username'] + '：您的投稿动态',
			'html': '<h3>尊敬的投稿人：您好！您的文章已通过审核，决定发表了！</h3><p>题目：' + paper.title + '</p>',
			'body': '系统自动通知',
			'attachments': [
			],
		}
	if judgement == '决定不发表':
		email_context = {
			'sender_name': '迅波投审稿系统',
			'sender': 'zhengjiy16@163.com',
			'receiver_name': paper.account,
			'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
			'subject': request.session['username'] + '：您的投稿动态',
			'html': '<h3>尊敬的投稿人：您好！很遗憾您的文章没能入选，请继续努力！</h3><p>题目：' + paper.title + '</p>',
			'body': '系统自动通知',
			'attachments': [
			],
		}
	em.send_email()


	return render(request, 'editorinchief/index.html', {
			'message': '审查结束，可在已完成中进行查看'
		})

