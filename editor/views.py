import os
import re
from django.shortcuts import render
from django.http import FileResponse
from paperdb.accept import Accept
from paperdb.load import Loader
from smtp.myemail import Email

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def index(request):
	context = {}
	welcome = '欢迎您！编辑' + request.session['username']
	return render(request, 'editor/index.html', {
			'message': welcome,
		})

def done(request):

	db = Accept()

	pre1 = '审阅状态2!="editor待审"'
	pre2 = '审阅状态2!="editor正审"'
	articles = db.accept(104, [pre1, pre2])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': 'editor已完成',
		'papers': articles
	}

	return render(request, 'editor/done.html', context)

def pending(request):

	db = Accept()

	pre1 = '审阅状态2="editor待审"'
	pre2 = 'changeable=0'
	articles = db.accept(104, [pre1, pre2])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': 'editor待处理',
		'papers': articles
	}

	return render(request, 'editor/pending.html', context)

def processing(request):

	db = Accept()

	pre1 = '审阅状态2="editor正审"'
	articles = db.accept(104, [pre1])
	articles = Loader.article(articles)[::-1]

	context = {
		'table_title': 'editor处理中',
		'papers': articles
	}

	return render(request, 'editor/pending.html', context)

def profile(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	if paper.shen2 == 'editor待审':
		db.accept(108, [idArticle, submit_times])

	idAuthor = paper.author
	pre1 = 'id="' + idAuthor + '"'
	real_author = db.accept(122, [pre1])
	real_author = Loader.author(real_author)[0]
	paper.author = real_author.name

	context = {
		'paper': paper,
	}

	if paper.shen2 in ['editor待审', 'editor正审']:
		context['allow_change'] = True

	editor_comment_path = paper.path + 'editor_comment.txt'
	try:
		with open(editor_comment_path, 'r') as f:
			editor_comment = f.read()
	except Exception as e:
		editor_comment = ""

	if editor_comment != "":
		context['editor_comment'] = editor_comment

	return render(request, 'editor/detail_editor.html', context)

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

	filename = os.path.basename(file_path)
	response = FileResponse(open(file_path, 'rb'))
	response['content_type'] = "application/octet-stream"
	response['Content-Disposition'] = 'attachment;filename=' + filename.encode('utf-8').decode('ISO-8859-1')

	return response

def finish(request, idArticle, submit_times):

	db = Accept()

	pre1 = 'id="' + str(idArticle) + '"'
	pre2 = '投稿次数="' + str(submit_times) + '"'
	paper = db.accept(104, [pre1, pre2])
	paper = Loader.article(paper)[0]

	comment = request.POST['comment']
	judgement = request.POST['judgement']

	comment_path = paper.path + 'editor_comment.txt'
	with open(comment_path, 'w') as f:
		f.write(comment)

	db.accept(109, [idArticle, submit_times, judgement])

	em = Email()

	if judgement == '1':
		email_context = {
			'sender_name': '迅波投审稿系统',
			'sender': 'zhengjiy16@163.com',
			'receiver_name': 'eic',
			'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
			'subject': request.session['username'] + '：有新的通过格式审查的投稿',
			'html': '<h3>尊敬的主编：您好！有新的通过格式审查的投稿</h3><p>题目：' + paper.title + '</p>',
			'body': '系统自动通知',
			'attachments': [
			],
		}
	if judgement == '0':
		email_context = {
			'sender_name': '迅波投审稿系统',
			'sender': 'zhengjiy16@163.com',
			'receiver_name': paper.account,
			'receiver': 'jinsh.16@sem.tsinghua.edu.cn',
			'subject': request.session['username'] + '：投稿动态通知',
			'html': '<h3>尊敬的投稿人：您好！很抱歉未通过格式审查，请登陆系统根据回复内容进行修改</h3><p>题目：' + paper.title + '</p>',
			'body': '系统自动通知',
			'attachments': [
			],
		}

	em.send_email(email_context)

	return render(request, 'editor/index.html', {
			'message': '审查结束，可在已完成中进行查看'
		})









