# Generated by Django 3.2.7 on 2021-09-20 21:25

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pepsi', '0009_auto_20210919_0946'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Business',
            new_name='Company',
        ),
    ]
