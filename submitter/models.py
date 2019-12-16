from django.db import models

class Submission(models.Model):
	papername = models.CharField(max_length=100)
	author = models.CharField(max_length=30)
	abstract = models.CharField(max_length=300)
	submit_date = models.DateTimeField('date submitted', auto_now_add=True)
	fileurl = models.CharField(max_length=200)

	def __str__(self):
		return self.papername