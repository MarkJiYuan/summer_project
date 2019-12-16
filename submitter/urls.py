from django.urls import path
from . import views

app_name = 'submitter'
urlpatterns = [
	path('index/', views.index, name='index'),
	path('submit/', views.submit, name='submit'),
	path('submit/upload_file', views.upload_file, name='upload_file'),
	path('submit/save_file', views.save_file, name='save_file'),
	path('saved', views.saved, name='saved'),
	path('submitted/', views.submitted, name='submitted'),
	path('profile/<int:idArticle>/<int:submit_times>', views.profile, name='profile'),
	path('dosubmit/<int:idArticle>/<int:submit_times>', views.dosubmit, name='dosubmit'),
	path('deletepaper/<int:idArticle>/<int:submit_times>', views.deletepaper, name='deletepaper'),
	path('submittedprofile/<int:idArticle>/<int:submit_times>', views.submitted_profile, name='submitted_profile'),
	path('resubmit/<int:idArticle>/<int:submit_times>', views.resubmit, name='resubmit'),
	path('', views.index, name='index'),
]