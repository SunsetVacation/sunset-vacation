# Generated by Django 3.1.2 on 2022-08-27 19:10

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Messaging',
            fields=[
                ('msg_id', models.AutoField(primary_key=True, serialize=False)),
                ('message', models.CharField(default=None, max_length=200, null=True)),
                ('time', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('marked', models.BooleanField(default=False)),
                ('receiver_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to=settings.AUTH_USER_MODEL)),
                ('sender_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
