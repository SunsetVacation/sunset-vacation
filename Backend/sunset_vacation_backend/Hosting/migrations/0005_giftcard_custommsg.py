# Generated by Django 3.1.2 on 2022-08-12 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hosting', '0004_auto_20220812_1249'),
    ]

    operations = [
        migrations.AddField(
            model_name='giftcard',
            name='customMsg',
            field=models.CharField(default=None, max_length=500, null=True),
        ),
    ]