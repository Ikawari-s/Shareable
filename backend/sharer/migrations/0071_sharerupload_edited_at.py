# Generated by Django 4.2.10 on 2024-03-14 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0070_sharer_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='sharerupload',
            name='edited_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]