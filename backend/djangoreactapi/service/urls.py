from django.urls import path

from .views import getLiked, insertLiked, deleteLiked, getLikedMoive

urlpatterns = [
    path('getLiked/', getLiked, name='getLiked'),
    path('insertLiked/', insertLiked, name='insertLiked'),
    path('deleteLiked/', deleteLiked, name='deleteLiked'),
    path('getLikedMoive/', getLikedMoive, name='getLikedMoive')
]
