from django.contrib import admin
from .models import Filter, Like

# Register your models here.
admin.site.register([Filter, Like])
