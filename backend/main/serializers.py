# main/serializers.py

from rest_framework import serializers
from .models import Question, Posts, Topic, Users, Employement, Education, Location, Vote, Answer, Comment

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class EmployementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employement
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notiifications
#         fields = '__all__'
