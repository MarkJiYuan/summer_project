from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.utils import timezone
from .models import Account
from paperdb.accept import Accept
from paperdb.load import Loader

def index(request):
	context = {}
	return render(request, 'homepage/index.html', context)

def login(request):
	context = {}
	return render(request, 'homepage/login.html', context)

def forget(request):
	context = {}
	return render(request, 'homepage/forget.html', context)

def certificate(request):
	db = Accept()
	pre1 = 'account="' + request.POST['username'] + '"'
	correct_account = db.accept(102, [pre1])
	correct_account = Loader.account(correct_account)

	if correct_account == []:
 		return render(request, 'homepage/login.html', {
				'message': '用户名或密码错误！'
			})
 		
	account = correct_account[0]

	if account.password == request.POST['password']:
		url_name = '%s:index' % account.role
		request.session['username'] = account.account
		return redirect(url_name)
	else:
		return render(request, 'homepage/login.html', {
				'message': '用户名或密码错误！'
			})

def register(request):
	context = {}
	return render(request, 'homepage/register.html', context)

def new_account(request):
	db = Accept()

	pre1 = 'account="' + request.POST['username'] + '"'
	old_account = db.accept(102, [pre1])
	old_account = Loader.account(old_account)
	if old_account != []:
		return render(request, 'homepage/register.html', {
				'message': '用户名已经存在！'
			})
	else:
		pre1 = request.POST['username']
		pre2 = request.POST['password']
		pre3 = 'submitter'
		pre4 = request.POST['email_adr']
		if db.accept(101, [pre1, pre2, pre3, pre4]):
			return redirect('homepage:login')

def logout(request):

	request.session.clear()

	return redirect('homepage:index')














