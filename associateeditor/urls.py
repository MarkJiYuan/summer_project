# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-28 23:14:09
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-07-17 10:15:23
# @Abstract: 

from django.urls import path
from . import views

app_name = 'associateeditor'
urlpatterns = [
	path('', views.index, name='index'),
	path('pending/', views.pending, name='pending'),
	path('finish/<int:idArticle>/<int:submit_times>/', views.finish, name='finish'),
	path('profile/<int:idArticle>/<int:submit_times>/', views.profile, name='profile'),
	path('download_paper/<int:idArticle>/<int:submit_times>', views.download_paper, name='download_paper'),
	path('processing/', views.processing, name='processing'),
	path('processing/choose_reviewer/<int:idArticle>/<int:submit_times>/', views.choose_reviewer, name='choose_reviewer'),
	path('done/', views.done, name='done'),
	
]