# Generated by Django 5.0.3 on 2024-03-28 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sharer', '0111_dashboard_twenty_percent_less_earning_send'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dashboard',
            name='twenty_percent_less_earning_send',
        ),
    ]