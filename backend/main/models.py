from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser,Group, Permission
from django.contrib.auth.hashers import make_password

class Users(AbstractUser):
    user_id = models.CharField(primary_key=True)
    user_type = models.IntegerField(null=True, blank=True)
    username = models.CharField(unique=True, max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    avatar_url = models.URLField(null=True, blank=True)
    interest = models.JSONField(null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now, null=True, blank=True)
    updatedAt = models.DateTimeField(default=timezone.now, null=True, blank=True)

    # Foreign Key relationships
    followed_by = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='following_users', blank=True)
    bookmarked = models.ManyToManyField('Question', related_name='bookmarked_users', blank=True)
    profile_url = models.URLField(null=True, blank=True)
    # Custom related_name values to avoid clashes
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, help_text='The groups this user belongs to.', related_name='custom_users')
    user_permissions = models.ManyToManyField(Permission, verbose_name='user permissions', blank=True, help_text='Specific permissions for this user.', related_name='custom_users_permissions')

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Employement(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    position = models.CharField(max_length=50, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    currently_working = models.BooleanField(null=True, blank=True)

class Education(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    school = models.CharField(max_length=255, null=True, blank=True)
    primary_major = models.CharField(max_length=255, null=True, blank=True)
    secondary_major = models.CharField(max_length=255, null=True, blank=True)
    degree_type = models.CharField(max_length=25, null=True, blank=True)
    graduation_year = models.IntegerField(null=True, blank=True)

class Location(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    loc = models.CharField(max_length=255, null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    currently_living = models.BooleanField(null=True, blank=True)

class Topic(models.Model):
    TOPIC_TYPE_CHOICES = [
        (0, 'Parent'),
        (1, 'Child'),
    ]
    topic_id = models.CharField(primary_key=True)
    cover_img = models.URLField(null=True, blank=True)  
    name = models.CharField(unique=True, max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    parent_topic_id = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='child_topics')
    following_count = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now, null=True, blank=True)
    updatedAt = models.DateTimeField(default=timezone.now, null=True, blank=True)
    views = models.IntegerField(null=True, blank=True, default=0)
    topic_type = models.IntegerField(choices=TOPIC_TYPE_CHOICES, default=0)  # 0 for Parent, 1 for Child


class Question(models.Model):
    question_id = models.CharField(primary_key=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    body = models.TextField(null=True, blank=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now, null=True, blank=True)
    view_count = models.IntegerField(null=True, blank=True)
    upvote_count = models.IntegerField(null=True, blank=True)
    downvote_count = models.IntegerField(null=True, blank=True)
    keywords = models.JSONField(null=True, blank=True)
    question_url = models.URLField(null=True, blank=True)
    topic_id = models.ForeignKey(Topic, on_delete=models.CASCADE, null=True, blank=True, related_name='questions_topic')
    subtopic_id = models.ForeignKey(Topic, on_delete=models.CASCADE, null=True, blank=True, related_name='questions_subtopic')


class Vote(models.Model):
    vote_id = models.CharField(primary_key=True)
    type = models.BooleanField(null=True, blank=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE, null=True, blank=True)
    votable_type = models.IntegerField(null=True, blank=True)
    votable_id = models.CharField(max_length=255, null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now,null=True, blank=True)

class Answer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    body = models.TextField(null=True, blank=True)
    image_url = models.FileField(upload_to="main/",null=True, blank=True, default=None)
    view_count = models.IntegerField(null=True, blank=True)
    upvote_count = models.IntegerField(null=True, blank=True)
    downvote_count = models.IntegerField(null=True, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    question_id = models.TextField(null=True, blank=True)

class Comment(models.Model):
    comment_id = models.CharField(primary_key=True)
    body = models.TextField(null=True, blank=True)
    commentable_id = models.CharField(max_length=255, null=True, blank=True)
    parent_comment_id = models.OneToOneField('self', on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    upvote_count = models.IntegerField(null=True, blank=True)
    downvote_count = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now,null=True, blank=True)
    updatedAt = models.DateTimeField(default=timezone.now,null=True, blank=True)

class Posts(models.Model):
    post_id = models.CharField(primary_key=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.FileField(upload_to="media/", null=True, default=None)
    upvote_count = models.IntegerField(null=True, blank=True)
    downvote_count = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now,null=True, blank=True)
    updatedAt = models.DateTimeField(default=timezone.now,null=True, blank=True)
    post_url = models.URLField(null=True, blank=True)

class Notifications(models.Model):
    notification_id = models.CharField(primary_key=True)
    type = models.IntegerField(null=True, blank=True)
    notification_url = models.URLField(null=True, blank=True)
    seen = models.BooleanField(null=True, blank=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now,null=True, blank=True)
    updatedAt = models.DateTimeField(default=timezone.now,null=True, blank=True)
    readAt = models.DateTimeField(null=True, blank=True)