# Generated by Django 4.2.4 on 2023-09-18 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_remove_usercreate_vip_subscription_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usercreate',
            name='vip_subscription_expiration_date',
        ),
    ]
