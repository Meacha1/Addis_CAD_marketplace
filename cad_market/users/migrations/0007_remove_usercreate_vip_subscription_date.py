# Generated by Django 4.2.4 on 2023-09-18 12:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_usercreate_vip_subscription_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usercreate',
            name='vip_subscription_date',
        ),
    ]
