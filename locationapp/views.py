from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from .models import User
import json, datetime

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
    
    try:
      in_latitude = float(in_updatelocation_data.get('latitude', 0))
      in_longitude = float(in_updatelocation_data.get('longitude', 0))
      in_isprivate = in_updatelocation_data.get('isprivate', True)
    except:
      return HttpResponseBadRequest()
      
    if in_latitude == 0 or in_longitude == 0:
      in_isprivate = True
    current_user = User.objects.get(id = request.user.id)
    
    current_user.latitude = in_latitude
    current_user.longitude = in_longitude
    current_user.isprivate = in_isprivate
    current_user.time = datetime.datetime.now()
    current_user.save()
    print(current_user)
    print(in_updatelocation_data)
    return JsonResponse({ 'status': 'success'})