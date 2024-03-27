# Generated by Django 4.2.10 on 2024-03-25 12:26

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sharer', '0096_delete_tier'),
    ]

    operations = [
        migrations.AddField(
            model_name='sharer',
            name='followers_tier1',
            field=models.ManyToManyField(blank=True, related_name='follows_tier1_sharers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='sharer',
            name='followers_tier2',
            field=models.ManyToManyField(blank=True, related_name='follows_tier2_sharers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='sharer',
            name='followers_tier3',
            field=models.ManyToManyField(blank=True, related_name='follows_tier3_sharers', to=settings.AUTH_USER_MODEL),
        ),
    ]
