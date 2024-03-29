# Generated by Django 4.2.2 on 2023-06-28 17:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_myuser_first_name_myuser_last_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="myuser",
            name="date_joined",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="myuser",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
