# Generated by Django 4.2.10 on 2024-03-14 06:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0068_alter_rating_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sharer',
            name='username',
        ),
    ]