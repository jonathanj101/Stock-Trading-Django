# Generated by Django 3.2.7 on 2021-10-04 01:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactions',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
