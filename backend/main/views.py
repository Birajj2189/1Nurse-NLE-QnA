# main/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import Question, Posts, Topic, Users, Employement, Education, Location,Vote, Answer, Comment
from .serializers import QuestionSerializer, PostsSerializer, TopicSerializer, UsersSerializer, EmployementSerializer, EducationSerializer, LocationSerializer,VoteSerializer, AnswerSerializer, CommentSerializer


def home(request):
    return JsonResponse({'Info':'React & Django', "name":"1NURSE"})

class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
class QuestionList(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionListByTopicId(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = Question.objects.all()
        id_param = self.kwargs.get('id', None)

        print(f"Received ID parameter: {id_param}")

        if id_param:
            if id_param.startswith('t-'):
                # It's a topic ID
                queryset = queryset.filter(topic_id=id_param)
            elif id_param.startswith('st-'):
                # It's a subtopic ID
                queryset = queryset.filter(subtopic_id=id_param)  # Assuming 'st-' is 3 characters

        print(f"Final queryset: {queryset.query}")

        return queryset


class QuestionDetailView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_field = 'question_id'

class PostsCreateView(generics.CreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

class PostsList(generics.ListAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

class TopicListCreateDestroyView(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def delete(self, request, *args, **kwargs):
        # Override the delete method to handle DELETE requests
        return self.destroy(request, *args, **kwargs)

class ListParentTopics(generics.ListAPIView):
    def get(self, request, format=None):
        parent_topics = Topic.objects.filter(parent_topic_id=None, topic_type=0)  # 0 for Parent
        serializer = TopicSerializer(parent_topics, many=True)
        return Response(serializer.data)

class GetTopicIdByName(generics.ListAPIView):
     def get(self, request, name, format=None):
        original_name = name.replace("-", " ")
        try:
            topic = Topic.objects.get(name__iexact=original_name)
            serializer = TopicSerializer(topic)
            return Response(serializer.data)
        except Topic.DoesNotExist:
            return Response({'error': 'Topic not found'}, status=status.HTTP_404_NOT_FOUND)

class GetTopicsByParentId(generics.ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        parent_topic_id = self.kwargs.get('parent_topic_id')
        return Topic.objects.filter(parent_topic_id=parent_topic_id, topic_type=1)

class DeleteTopic(generics.ListAPIView):
    def delete(self, request, topic_id, format=None):
        try:
            topic = Topic.objects.get(topic_id=topic_id)
            topic.delete()
            return Response({'message': 'Topic deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Topic.DoesNotExist:
            return Response({'error': 'Topic not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UsersCreateView(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UsersList(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class EmployementCreateView(generics.CreateAPIView):
    queryset = Employement.objects.all()
    serializer_class = EmployementSerializer

class EmployementList(generics.ListAPIView):
    queryset = Employement.objects.all()
    serializer_class = EmployementSerializer

class EducationCreateView(generics.CreateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class EducationList(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class LocationCreateView(generics.CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class VoteCreateView(generics.CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

class VoteList(generics.ListAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

class AnswerCreateView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class AnswerList(generics.ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Filter comments based on the question_id from the URL
        question_id = self.kwargs['question_id']
        limit = self.kwargs.get('limit', None)

        if limit is not None and str(limit).isdigit():
            # If the 'limit' parameter is provided and it's a valid number, limit the queryset
            return Comment.objects.filter(commentable_id=question_id)[:int(limit)]
        else:
            return Comment.objects.filter(commentable_id=question_id)

    def perform_create(self, serializer):
        # Assign the question_id from the frontend
        serializer.save(commentable_id=self.kwargs['question_id'])

class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'comment_id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class QuestionDeleteView(generics.DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_field = 'question_id'

def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    self.perform_destroy(instance)
    return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(generics.ListAPIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user_type = data.get('user_type')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.user_type == user_type:
            login(request, user)
            return Response({'success': True, 'message': 'Login successful'})
        else:
            return Response({'success': False, 'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)