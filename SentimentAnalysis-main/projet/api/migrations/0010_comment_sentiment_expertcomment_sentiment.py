# Generated by Django 4.1.6 on 2023-04-19 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_post_bc_postverifie_bc'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='sentiment',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='expertcomment',
            name='sentiment',
            field=models.IntegerField(default=0),
        ),
    ]