import os
import re
from django.shortcuts import render
from django.http import FileResponse
from paperdb.accept import Accept
from paperdb.load import Loader

def index(request):
	context = {}
	welcome = '欢迎您！责编' + request.session['username']
	return render(request, 'associateeditor/index.html', {
			'message': welcome,
		})

def pending(request):

	db = Accept()

	pre1 = '审阅状态2="ae待审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	pre1 = '审阅状态2="ae待评论"'
	comment_articles = db.accept(104, [pre1])
	comment_articles = Loader.article(comment_articles)[::-1]

	articles = comment_articles + articles

	my_article = []
	for article in articles:
		if article.aes != None:
			incharge = article.aes.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'ae待处理',
		'papers': my_article
	}

	return render(request, 'associateeditor/pending.html', context)

def profile(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	reviewers = db.accept(112, ['reviewer'])
	reviewers = Loader.reviewer(reviewers)

	idAuthor = paper.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	paper.author = real_author.name

	context = {
		'paper': paper,
		'reviewers': reviewers,
	}

	reviewer_account = paper.reviewers
	if reviewer_account != None:
		reviewer_account = reviewer_account.split('/')[0]
		reviewer = db.accept(112, ['reviewer', reviewer_account])
		reviewer = Loader.reviewer(reviewer)[0]
		current_reviewer = reviewer.name
		context['current_reviewer'] = current_reviewer

		file_path = paper.path + 'reviewer_' + reviewer_account + '_comment.txt'

		try:
			with open(file_path, 'r') as f:
				comment_reviewer = f.read()
		except Exception as e:
			comment_reviewer = "Reviewer尚未提交评价"

		context['comment_reviewer'] = comment_reviewer


	if paper.shen2 == 'ae待审':
		db.accept(115, [idArticle, submit_times])

	if paper.shen2 in ['ae待审', 'ae正审', 'ae待评论', 'reviewers待审', 'reviewers正审']:
		context['allow_comment'] = True

	if paper.shen2 in ['ae待审', 'ae正审']:
		context['allow_select'] = True
	
	if paper.shen2 not in ['ae待审', 'ae正审', 'ae待评论']:
		ae_account = request.session['username']
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


	return render(request, 'associateeditor/detail_ae.html', context)


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

def choose_reviewer(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	reviewer_account = request.POST['reviewer_account']

	db.accept(114, [reviewer_account, idArticle, submit_times])

	em = Email()
	email_context = {
		'sender_name': '迅波投审稿系统',
		'sender': 'zhengjiy16@163.com',
		'receiver_name': reviewer_account,
		'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
		'subject': request.session['username'] + '：邀请您参与文章评审',
		'html': '<h3>尊敬的专家：您好！请您协助我们的评审工作</h3><p>题目：' + paper.title + '</p>',
		'body': '系统自动通知',
		'attachments': [
		],
	}
	em.send_email(email_context)

	return render(request, 'associateeditor/index.html', {
			'message': '指派reviewer成功'
		})

def processing(request):

	db = Accept()

	pre1 = '审阅状态2="ae正审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	my_article = []
	for article in articles:
		if article.aes != None:
			incharge = article.aes.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'ae处理中',
		'papers': my_article
	}

	return render(request, 'associateeditor/pending.html', context)

def done(request):

	db = Accept()

	pre1 = '审阅状态2!="editor待审"'
	pre2 = '审阅状态2!="editor正审"'
	pre3 = '审阅状态2!="大boss待审"'
	pre4 = '审阅状态2!="大boss正审"'
	pre5 = '审阅状态2!="ae待审"'
	pre6 = '审阅状态2!="ae正审"'
	pre7 = '审阅状态2!="ae待评论"'
	pre8 = '审阅状态2!="已完成"'
	pre9 = '审阅状态2!="待处理"'
	articles = db.accept(104, [pre1, pre2, pre3, pre4, pre5, pre6, pre7, pre8, pre9])
	articles = Loader.article(articles)[::-1]

	my_article = []
	for article in articles:
		if article.aes != None:
			incharge = article.aes.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'ae已完成',
		'papers': my_article
	}

	return render(request, 'associateeditor/done.html', context)

def finish(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	comment = request.POST['comment']

	comment_path = paper.path + 'ae_' + request.session['username'] +'_comment.txt'
	with open(comment_path, 'w') as f:
		f.write(comment)

	db.accept(116, [idArticle, submit_times])

	em = Email()
	email_context = {
		'sender_name': '迅波投审稿系统',
		'sender': 'zhengjiy16@163.com',
		'receiver_name': reviewer_account,
		'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
		'subject': request.session['username'] + '：已完成水平评审工作',
		'html': '<h3>尊敬的主编：您好！我已完成水平评审工作，请您做最终决定。</h3><p>题目：' + paper.title + '</p>',
		'body': '系统自动通知',
		'attachments': [
		],
	}
	em.send_email(email_context)

	return render(request, 'associateeditor/index.html', {
			'message': '审查结束，可在已完成中进行查看'
		})

