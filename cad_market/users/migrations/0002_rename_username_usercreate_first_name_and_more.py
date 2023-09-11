# Generated by Django 4.2.4 on 2023-09-11 17:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usercreate',
            old_name='username',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='usercreate',
            name='last_name',
            field=models.CharField(default=django.utils.timezone.now, max_length=50, unique=True),
            preserve_default=False,
        ),
    ]
