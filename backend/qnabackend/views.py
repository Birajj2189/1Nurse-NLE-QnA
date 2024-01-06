
from django.http import HttpResponse
from django.shortcuts import render


def default(request):
    return HttpResponse("<h1> THIS IS HOME PAGE </h1>")

# def savequestion(request):
#     n=''
#     if request.method=="POST":
#         question = request.POST.get('question')
#         question_content = request.POST.get('question_content')
#         quest = Question(question_id="1",title=question,body=question_content,topic="xfgtbdgb",user="bipul",createdAt="04-01-2024 00:07",view_count="0",upvote_count="0",downvote_count="0",keywords="0",question_url="http://127.0.0.1:8000/api/questions/create/")
#         quest.save()
#         n="data inserted"
#     return render(request,"questions/", {'n':n})