# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-28 23:16:56
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-07-16 22:48:38
# @Abstract: 

from django.urls import path
from . import views

app_name = 'editorinchief'
urlpatterns = [
	path('', views.index, name='index'),
	path('pending', views.pending, name='pending'),
	path('profile/<int:idArticle>/<int:submit_times>/', views.profile, name='profile'),
	path('processing/', views.processing, name='processing'),
	path('processing/choose_ae/<int:idArticle>/<int:submit_times>/', views.choose_ae, name='choose_ae'),
	path('all_articles', views.all_articles, name='all_articles'),
	path('download_paper/<int:idArticle>/<int:submit_times>', views.download_paper, name='download_paper'),
	path('admin_editor/', views.admin_editor, name='admin_editor'),
	path('admin_editor/new_editor', views.new_editor, name='new_editor'),
	path('admin_editor/add_editor', views.add_editor, name='add_editor'),
	path('admin_ae/', views.admin_ae, name='admin_ae'),
	path('admin_ae/new_ae', views.new_ae, name='new_ae'),
	path('admin_ae/add_ae', views.add_ae, name='add_ae'),
	path('admin_reviewer/', views.admin_reviewer, name='admin_reviewer'),
	path('admin_reviewer/new_reviewer', views.new_reviewer, name='new_reviewer'),
	path('admin_reviewer/add_reviewer', views.add_reviewer, name='add_reviewer'),
	path('finish/<int:idArticle>/<int:submit_times>/', views.finish, name='finish'),
]











