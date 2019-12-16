import os
import re
from django.shortcuts import render
from django.http import FileResponse
from paperdb.accept import Accept
from paperdb.load import Loader
from smtp.myemail import Email

def index(request):
	context = {}
	welcome = '欢迎您！专家' + request.session['username']
	return render(request, 'reviewer/index.html', {
			'message': welcome,
		})

def pending(request):
	db = Accept()

	pre1 = '审阅状态2="reviewers待审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	my_article = []
	for article in articles:
		if article.reviewers != None:
			incharge = article.reviewers.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'reviewer待处理',
		'papers': my_article
	}

	return render(request, 'reviewer/pending.html', context)

def processing(request):
	db = Accept()

	pre1 = '审阅状态2="reviewers正审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	my_article = []
	for article in articles:
		if article.reviewers != None:
			incharge = article.reviewers.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'reviewer正处理',
		'papers': my_article
	}

	return render(request, 'reviewer/pending.html', context)


def profile(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	if paper.shen2 == 'reviewers待审':
		db.accept(117, [idArticle, submit_times])

	idAuthor = paper.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	paper.author = real_author.name

	context = {
		'paper': paper,
	}

	if paper.shen2 in ['reviewers待审', 'reviewers正审']:
		context['allow_comment'] = True
	else:
		reviewer_account = request.session['username']
		reviewer = db.accept(112, ['reviewer', reviewer_account])
		reviewer = Loader.reviewer(reviewer)[0]
		current_reviewer = reviewer.name
		context['current_reviewer'] = current_reviewer

		comment_reviewer_path = paper.path + 'reviewer_' + request.session['username'] + '_comment.txt'
		try:
			with open(comment_reviewer_path, 'r') as f:
				comment_reviewer = f.read()
		except Exception as e:
			comment_reviewer = 'Reveiwer尚未提交评论'

		context['comment_reviewer'] = comment_reviewer

	return render(request, 'reviewer/detail_reviewer.html', context)


def download(request, idArticle, submit_times):

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

def finish(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	comment = request.POST['comment']

	comment_path = paper.path + 'reviewer_' + request.session['username'] + '_comment.txt'
	with open(comment_path, 'w') as f:
		f.write(comment)

	db.accept(118, [idArticle, submit_times])

	em = Email()
	email_context = {
		'sender_name': '迅波投审稿系统',
		'sender': 'zhengjiy16@163.com',
		'receiver_name': paper.aes,
		'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
		'subject': request.session['username'] + '：已完成专家评审工作',
		'html': '<h3>尊敬的责编：您好！我已完成专家评审工作</h3><p>题目：' + paper.title + '</p>',
		'body': '系统自动通知',
		'attachments': [
		],
	}
	em.send_email(email_context)

	return render(request, 'reviewer/index.html', {
			'message': '审查结束，可在已完成中进行查看'
		})

def done(request):

	db = Accept()

	pre1 = '审阅状态2!="editor待审"'
	pre2 = '审阅状态2!="editor正审"'
	pre3 = '审阅状态2!="大boss待审"'
	pre4 = '审阅状态2!="大boss正审"'
	pre5 = '审阅状态2!="ae待审"'
	pre6 = '审阅状态2!="ae正审"'
	pre7 = '审阅状态2!="已完成"'
	pre8 = '审阅状态2!="待处理"'
	pre9 = '审阅状态2!="reviewers待审"'
	pre10 = '审阅状态2!="reviewers正审"'
	articles = db.accept(104, [pre1, pre2, pre3, pre4, pre5, pre6, pre7, pre8, pre9, pre10])
	articles = Loader.article(articles)[::-1]

	my_article = []
	for article in articles:
		print(article.reviewers)
		if article.reviewers != None:
			incharge = article.reviewers.split('/')[0]
			if request.session['username'] in incharge:
				my_article.append(article)

	context = {
		'table_title': 'reviewer已完成',
		'papers': my_article
	}

	return render(request, 'reviewer/done.html', context)




