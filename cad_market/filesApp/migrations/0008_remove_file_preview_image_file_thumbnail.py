# Generated by Django 4.2.4 on 2023-09-14 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filesApp', '0007_remove_file_parent_file_attachedfile_parent_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='preview_image',
        ),
        migrations.AddField(
            model_name='file',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to='thumbnails/'),
        ),
    ]