# Generated by Django 3.2.3 on 2021-06-09 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pepsi', '0005_rename_created_booking_createddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
