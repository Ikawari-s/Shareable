# Generated by Django 4.2.4 on 2024-02-25 02:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0032_like_comment_sharerupload_comments_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sharerupload',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='sharerupload',
            name='likes',
        ),
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='sharer.sharerupload'),
        ),
        migrations.AlterField(
            model_name='like',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='sharer.sharerupload'),
        ),
    ]