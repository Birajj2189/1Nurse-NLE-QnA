# Generated by Django 5.0 on 2024-01-19 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_rename_user_i_answer_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.AddField(
            model_name='comment',
            name='user_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
