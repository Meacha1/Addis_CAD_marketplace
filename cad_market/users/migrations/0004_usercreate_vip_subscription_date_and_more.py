# Generated by Django 4.2.4 on 2023-09-18 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_usercreate_sale_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercreate',
            name='vip_subscription_date',
            field=models.DateTimeField(default=None),
        ),
        migrations.AddField(
            model_name='usercreate',
            name='vip_subscription_expiration_date',
            field=models.DateTimeField(default=None),
        ),
    ]
