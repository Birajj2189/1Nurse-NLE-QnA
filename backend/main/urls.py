from django.urls import path

from .views import (
    home,
    QuestionList,
    QuestionCreateView,
    PostsList,
    PostsCreateView,
    TopicList,
    TopicCreateView,
    UsersList,
    UsersCreateView,
    EmployementList,
    EmployementCreateView,
    EducationList,
    EducationCreateView,
    LocationList,
    LocationCreateView,
    VoteList,
    VoteCreateView,
    AnswerList,
    AnswerCreateView,
    CommentListCreateView,
    QuestionDetailView,
    CommentDeleteView,
    QuestionDeleteView,
)

urlpatterns = [
    path('', home),

    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/create/', QuestionCreateView.as_view(), name='question-create'),
    path('questions/<str:question_id>/', QuestionDetailView.as_view(), name='question-detail'),
    path('questions/delete/<str:question_id>/', QuestionDeleteView.as_view(), name='question-delete'),
    
    path('posts/', PostsList.as_view(), name='posts-list'),
    path('posts/create/', PostsCreateView.as_view(), name='create_post'),

    path('topics/', TopicList.as_view(), name='topic-list'),
    path('topics/create/', TopicCreateView.as_view(), name='topic-create'),
    
    path('users/', UsersList.as_view(), name='users-list'),
    path('users/create/', UsersCreateView.as_view(), name='create_user'),

    path('employments/', EmployementList.as_view(), name='employement-list'),
    path('employments/create/', EmployementCreateView.as_view(), name='employement-create'),

    path('educations/', EducationList.as_view(), name='education-list'),
    path('educations/create/', EducationCreateView.as_view(), name='education-create'),

    path('locations/', LocationList.as_view(), name='location-list'),
    path('locations/create/', LocationCreateView.as_view(), name='location-create'),

    path('votes/', VoteList.as_view(), name='vote-list'),
    path('votes/create/', VoteCreateView.as_view(), name='vote-create'),

    path('answers/', AnswerList.as_view(), name='answer-list'),
    path('answers/create/', AnswerCreateView.as_view(), name='answer-create'),

    path('comments/create/<str:question_id>', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/delete/<str:comment_id>', CommentDeleteView.as_view(), name='comment-delete'),
]
