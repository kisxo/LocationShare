from django.db import models
import time
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    time = models.DateTimeField(auto_now_add = True)
    isprivate = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.id}, {self.username}, {self.latitude}, {self.longitude}, {self.time}, {self.isprivate}'