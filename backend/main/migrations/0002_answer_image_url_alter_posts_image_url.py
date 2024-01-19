# Generated by Django 5.0 on 2024-01-06 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='image_url',
            field=models.FileField(default=None, null=True, upload_to='main/'),
        ),
        migrations.AlterField(
            model_name='posts',
            name='image_url',
            field=models.FileField(default=None, null=True, upload_to='media/'),
        ),
    ]
