# Generated by Django 4.1.5 on 2023-01-22 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0004_localtrip_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='price_per_night',
            field=models.FloatField(blank=True, null=True),
        ),
    ]