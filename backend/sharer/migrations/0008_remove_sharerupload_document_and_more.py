# Generated by Django 4.2.4 on 2024-02-17 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0007_alter_sharerupload_description_alter_sharerupload_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sharerupload',
            name='document',
        ),
        migrations.RemoveField(
            model_name='sharerupload',
            name='video',
        ),
    ]
