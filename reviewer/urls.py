# -*- coding: utf-8 -*-
# @Author: MarkJiYuan
# @Date:   2019-06-28 23:16:05
# @Last Modified by:   MarkJiYuan
# @email: zhengjiy16@163.com
# @Last Modified time: 2019-06-28 23:27:14
# @Abstract: 

from django.urls import path
from . import views

app_name = 'reviewer'
urlpatterns = [
	path('', views.index, name='index'),
	path('pending', views.pending, name='pending'),
	path('profile/<int:idArticle>/<int:submit_times>', views.profile, name='profile'),
	path('download/<int:idArticle>/<int:submit_times>', views.download, name='download'),
	path('processing/', views.processing, name='processing'),
	path('finish/<int:idArticle>/<int:submit_times>', views.finish, name='finish'),
	path('done/', views.done, name='done')
]