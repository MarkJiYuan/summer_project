# Generated by Django 2.0 on 2019-07-01 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('papername', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=30)),
                ('abstract', models.CharField(max_length=300)),
                ('submit_date', models.DateTimeField(auto_now_add=True, verbose_name='date submitted')),
            ],
        ),
    ]