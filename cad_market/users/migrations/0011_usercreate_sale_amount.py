# Generated by Django 4.2.4 on 2023-09-20 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_usercreate_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercreate',
            name='sale_amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
        ),
    ]