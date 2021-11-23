# Generated by Django 3.2.8 on 2021-11-23 00:54

from django.db import migrations, models
import django.db.models.deletion
import radroutes.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('area_id', models.AutoField(primary_key=True, serialize=False)),
                ('area_name', models.TextField(max_length=100)),
                ('area_quality', models.FloatField(blank=True, null=True)),
                ('area_description', models.TextField(blank=True, max_length=5000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('email', models.EmailField(max_length=254, primary_key=True, serialize=False)),
                ('fname', models.TextField(blank=True, max_length=100, null=True)),
                ('lname', models.TextField(blank=True, max_length=100, null=True)),
                ('password', models.TextField(max_length=2048)),
                ('is_guide', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('feature_id', models.AutoField(primary_key=True, serialize=False)),
                ('feature_name', models.TextField(max_length=100)),
                ('feature_description', models.TextField(max_length=5000)),
                ('gps', models.TextField(blank=True, max_length=50, null=True)),
                ('location', models.TextField(blank=True, max_length=100, null=True)),
                ('area_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.area')),
            ],
        ),
        migrations.CreateModel(
            name='Face',
            fields=[
                ('face_id', models.AutoField(primary_key=True, serialize=False)),
                ('face_name', models.TextField(max_length=200)),
                ('face_description', models.TextField(blank=True, max_length=5000, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('feature_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.feature')),
            ],
        ),
        migrations.CreateModel(
            name='Climb',
            fields=[
                ('climb_id', models.AutoField(primary_key=True, serialize=False)),
                ('climb_name', models.TextField(max_length=200)),
                ('climb_type', models.TextField(blank=True, max_length=50, null=True)),
                ('grade', models.TextField(blank=True, max_length=20, null=True)),
                ('quality', models.IntegerField(blank=True, null=True, validators=[radroutes.models.validate_star_rating])),
                ('quality_max', models.IntegerField(blank=True, null=True, validators=[radroutes.models.validate_star_rating])),
                ('height', models.FloatField(blank=True, null=True, validators=[radroutes.models.validate_positive])),
                ('description', models.TextField(blank=True, max_length=5000, null=True)),
                ('author_email', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.user')),
                ('face_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='radroutes.face')),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('book_id', models.AutoField(primary_key=True, serialize=False)),
                ('book_name', models.TextField(max_length=200)),
                ('book_description', models.TextField(blank=True, max_length=5000, null=True)),
                ('public', models.BooleanField()),
                ('listed', models.BooleanField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserPrivateAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.book')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.user')),
            ],
            options={
                'unique_together': {('user_id', 'book_id')},
            },
        ),
        migrations.CreateModel(
            name='UserLibrary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.book')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radroutes.user')),
            ],
            options={
                'unique_together': {('user_id', 'book_id')},
            },
        ),
        migrations.CreateModel(
            name='BookReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_body', models.TextField(blank=True, max_length=5000, null=True)),
                ('rating', models.IntegerField(validators=[radroutes.models.validate_star_rating])),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.book')),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.user')),
            ],
            options={
                'unique_together': {('reviewer', 'book_id')},
            },
        ),
        migrations.CreateModel(
            name='BookArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.area')),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radroutes.book')),
            ],
            options={
                'unique_together': {('area_id', 'book_id')},
            },
        ),
    ]
