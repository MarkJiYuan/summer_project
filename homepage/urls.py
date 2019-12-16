from django.urls import path

from . import views

app_name = 'homepage'
urlpatterns = [
	path('', views.login, name='index'),
	path('login/', views.login, name='login'),
	path('forget/', views.forget, name='forget'),
	path('certificate/', views.certificate, name='certificate'),
	path('register/', views.register, name='register'),
	path('new_account/', views.new_account, name='new_account'),
	path('logout/', views.logout, name='logout'),
]