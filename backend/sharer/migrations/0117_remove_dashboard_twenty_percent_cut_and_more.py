# Generated by Django 5.0.3 on 2024-04-01 04:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0116_dashboard_twenty_percent_cut_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dashboard',
            name='twenty_percent_cut',
        ),
        migrations.RemoveField(
            model_name='dashboard',
            name='twenty_percent_less_earning',
        ),
    ]