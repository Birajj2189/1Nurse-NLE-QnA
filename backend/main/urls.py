from django.urls import path

from .views import (
    home,
    QuestionList,
    QuestionListCreateView,
    PostsList,
    PostsCreateView,
    TopicListCreateDestroyView,
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
    GetTopicIdByName,
    DeleteTopic,
    ListParentTopics,
    GetTopicsByParentId,
    LoginView,
    QuestionListByTopicId,
)

urlpatterns = [
    path('', home),

    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/create/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('questions/<str:question_id>/', QuestionDetailView.as_view(), name='question-detail'),
    path('questions/delete/<str:question_id>/', QuestionDeleteView.as_view(), name='question-delete'),
    path('questions/list/<str:id>/', QuestionListByTopicId.as_view(), name='question-list-bytopic'),

    
    path('posts/', PostsList.as_view(), name='posts-list'),
    path('posts/create/', PostsCreateView.as_view(), name='create_post'),

    path('topics/', TopicListCreateDestroyView.as_view(), name='topic-list-create-destroy'),
    path('topics/parent/', ListParentTopics.as_view(), name='list_parent_topics'),
    path('topics/get-topic-id/<str:name>/', GetTopicIdByName.as_view(), name='get_topic_id'),
    path('topics/delete/<str:topic_id>/', DeleteTopic.as_view(), name='delete_topic'),
    path('topics/by-parent/<str:parent_topic_id>/', GetTopicsByParentId.as_view(), name='get_topics_by_parent'),

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
    path('comments/create/<str:question_id>/<int:limit>', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/delete/<str:comment_id>', CommentDeleteView.as_view(), name='comment-delete'),


    path('users/login/', LoginView.as_view(), name='login'),
]
