# Generated by Django 5.0.1 on 2024-01-17 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_topic_child_topic_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='views',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]