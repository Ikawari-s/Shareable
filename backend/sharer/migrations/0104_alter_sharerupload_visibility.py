# Generated by Django 4.2.10 on 2024-03-27 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0103_alter_sharerupload_visibility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sharerupload',
            name='visibility',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
