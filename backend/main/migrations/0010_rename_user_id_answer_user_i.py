# Generated by Django 5.0 on 2024-01-19 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_remove_answer_question_remove_answer_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='user_id',
            new_name='user_i',
        ),
    ]
