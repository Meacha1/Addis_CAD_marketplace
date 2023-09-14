# Generated by Django 4.2.4 on 2023-09-14 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('filesApp', '0005_remove_file_attached_files_attachedfile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attachedfile',
            name='parent_file',
        ),
        migrations.AddField(
            model_name='file',
            name='parent_file',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='attached_files', to='filesApp.file'),
        ),
    ]
