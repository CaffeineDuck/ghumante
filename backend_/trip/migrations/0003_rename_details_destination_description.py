# Generated by Django 4.1.5 on 2023-01-21 15:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0002_destination_photo_hotel_photo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='destination',
            old_name='details',
            new_name='description',
        ),
    ]
