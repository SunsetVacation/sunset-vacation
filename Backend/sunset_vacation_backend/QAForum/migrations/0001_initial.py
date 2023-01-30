# Generated by Django 3.1.2 on 2022-08-27 19:10

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Hosting', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('answer_id', models.AutoField(primary_key=True, serialize=False)),
                ('answer', models.CharField(default=None, max_length=500, null=True)),
                ('answer_time', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('answerer_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('questions_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(default=None, max_length=500, null=True)),
                ('question_date', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('questionair_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserQuestionReact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('react', models.IntegerField(default=0)),
                ('questionID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='QAForum.question')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserAnswerReact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('react', models.IntegerField(default=0)),
                ('answerID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='QAForum.answer')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionProperty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propertyID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
                ('questionID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='QAForum.question')),
            ],
        ),
        migrations.CreateModel(
            name='AnswerProperty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answerID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='QAForum.answer')),
                ('propertyID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='QAForum.question'),
        ),
    ]
