# Generated by Django 4.2.10 on 2024-03-25 13:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sharer', '0100_alter_sharerupload_visibility'),
    ]

    operations = [
        migrations.AddField(
            model_name='sharer',
            name='followers_tier1',
            field=models.ManyToManyField(blank=True, related_name='follower_tier1', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='sharer',
            name='followers_tier2',
            field=models.ManyToManyField(blank=True, related_name='follower_tier2', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='sharer',
            name='followers_tier3',
            field=models.ManyToManyField(blank=True, related_name='follower_tier3', to=settings.AUTH_USER_MODEL),
        ),
    ]
