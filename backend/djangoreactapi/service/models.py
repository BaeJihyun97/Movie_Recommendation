from django.db import models


# Create your models here.
class Filter(models.Model):
    uid = models.ForeignKey('users.User', on_delete=models.CASCADE)
    keyword = models.TextField()
    n_keyword = models.IntegerField(default=0)

    def __str__(self):
        return self.uid.email


class Like(models.Model):
    uid = models.ForeignKey('users.User', on_delete=models.CASCADE)
    liked = models.TextField()
    n_liked = models.IntegerField(default=0)

    def __str__(self):
        return self.uid.email

