# Generated by Django 5.0 on 2024-01-19 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_rename_user_comment_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='image_url',
            field=models.FileField(blank=True, default=None, null=True, upload_to='main/'),
        ),
    ]