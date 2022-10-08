from django.urls import path

from .views import movieRecommReturn


urlpatterns = [
    path('recommend/', movieRecommReturn, name='recommend'),
]
