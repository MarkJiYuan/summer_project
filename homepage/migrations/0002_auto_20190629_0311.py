# Generated by Django 2.0 on 2019-06-28 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='id',
        ),
        migrations.AlterField(
            model_name='account',
            name='username',
            field=models.CharField(max_length=30, primary_key=True, serialize=False),
        ),
    ]