from django.db import models

class Account(models.Model):
	username = models.CharField(max_length=30, primary_key=True)
	password = models.CharField(max_length=30)
	nickname = models.CharField(max_length=30)
	role = models.CharField(max_length=30)
	create_date = models.DateTimeField('date account created', auto_now_add=True)

	def __str__(self):
		return self.username
