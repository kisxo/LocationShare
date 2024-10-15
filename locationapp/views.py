from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from .models import User
import json

@login_required
def index(request):
    users = User.objects.filter(isprivate=False)
    print(users)
    return render(request, "locationapp/index.html", {"users": users})

@login_required
def updatelocation(request):
    if request.method != "POST" or not request.POST:
        return HttpResponseBadRequest()
    in_updatelocation_data = json.loads(request.body.decode())
    print(in_updatelocation_data)
    return HttpResponseBadRequest()