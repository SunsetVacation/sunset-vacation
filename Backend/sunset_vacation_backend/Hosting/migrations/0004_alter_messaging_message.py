# Generated by Django 4.0.1 on 2022-08-25 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hosting', '0003_alter_messaging_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messaging',
            name='message',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
    ]