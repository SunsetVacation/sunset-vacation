# Generated by Django 3.1.2 on 2022-08-25 06:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('QAForum', '0006_auto_20220825_1036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='dislikecount',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='likecount',
        ),
        migrations.RemoveField(
            model_name='question',
            name='dislikecount',
        ),
        migrations.RemoveField(
            model_name='question',
            name='likecount',
        ),
    ]