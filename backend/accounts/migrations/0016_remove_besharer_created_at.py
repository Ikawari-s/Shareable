# Generated by Django 4.2.4 on 2024-02-23 03:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0015_besharer_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='besharer',
            name='created_at',
        ),
    ]
