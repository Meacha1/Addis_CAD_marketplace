# Generated by Django 4.2.4 on 2023-09-09 12:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserCreate',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('phone_number', models.CharField(blank=True, max_length=13, null=True)),
                ('user_type', models.CharField(choices=[('user', 'User'), ('professional', 'Professional'), ('admin', 'Admin')], max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_vip', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
