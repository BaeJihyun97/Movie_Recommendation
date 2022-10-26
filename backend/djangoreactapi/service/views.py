from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymysql
from django.conf import settings
import re

from recommendation.apis import makeMovieList
from utils.dbsearch import findLiked



# Create your views here.
@api_view(['GET', 'POST'])
def getLiked(request):
    if request is not None and request.method == 'POST':
        # if request.GET.get("uid", "") != "":
        #     uid = request.GET.get("uid", "")
        if request.data['uid'] != '':
            uid = request.data['uid']

            liked, n_liked = findLiked(uid)
            data = {"liked": liked, "n_liked": n_liked}

        else:
            data = {}

        return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
def getLikedMoive(request):
    if request is not None and request.method == 'POST':
        # if request.GET.get("uid", "") != "":
        #     uid = request.GET.get("uid", "")
        if request.data['uid'] != '':
            uid = request.data['uid']

            liked, n_liked = findLiked(uid)
            likedList = makeMovieList(liked)

            data = {"movieList": likedList, "n_liked": n_liked}
        else:
            data = {}

        return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
def insertLiked(request):
    if request is not None and request.method == 'POST':
        # if (request.GET.get("uid", "") != "") and (request.GET.get("liked_movie", "") != ""):
        #     liked_movie = int(request.GET.get("liked_movie", ""))
        #     uid = int(request.GET.get("uid", ""))
        if (request.data is not None) and request.data['uid'] != '' and request.data["liked_movie"] != '':
            liked_movie = request.data["liked_movie"]
            uid = request.data['uid']

            con = pymysql.connect(host=settings.DATABASES["default"]["HOST"], user=settings.DATABASES["default"]["USER"],
                                  password=settings.DATABASES["default"]["PASSWORD"], db=settings.DATABASES["default"]["NAME"]
                                  , charset='utf8', port=int(settings.DATABASES["default"]["PORT"]))

            liked, n_liked = findLiked(uid, con)
            cur = con.cursor()
            if liked_movie not in liked:
                if len(liked) == 0:
                    temp = str(liked_movie)
                    sql = f"INSERT INTO service_like(uid_id, liked, n_liked) VALUES ({uid}, '{temp}', {1})"
                else:
                    temp = ','.join(str(t) for t in liked) + ',' + str(liked_movie)
                    sql = f"UPDATE service_like SET liked='{temp}', n_liked={n_liked + 1} WHERE uid_id={uid}"
                print(sql)
                cur.execute(sql)

            liked, n_liked = findLiked(uid, con)
            print(liked, n_liked)

            data = {"liked": liked, "n_liked": n_liked}
            con.commit()
            con.close()

        else:
            data = {}

        return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})



@api_view(['GET', 'POST'])
def deleteLiked(request):
    if request is not None and request.method == 'POST':
        # if (request.GET.get("uid", "") != "") and (request.GET.get("liked_movie", "") != ""):
        #     liked_movie = int(request.GET.get("liked_movie", ""))
        #     uid = int(request.GET.get("uid", ""))

        if (request.data is not None) and request.data['uid'] != '' and request.data["liked_movie"] != '':
            liked_movie = request.data["liked_movie"]
            uid = request.data['uid']

            con = pymysql.connect(host=settings.DATABASES["default"]["HOST"], user=settings.DATABASES["default"]["USER"],
                                  password=settings.DATABASES["default"]["PASSWORD"], db=settings.DATABASES["default"]["NAME"]
                                  , charset='utf8', port=int(settings.DATABASES["default"]["PORT"]))
            cur = con.cursor()
            sql = f"SELECT liked, n_liked FROM service_like WHERE uid_id={uid}"
            cur.execute(sql)
            temp = cur.fetchall()
            if len(temp) != 0:
                data = temp[0]
                if liked_movie in [int(l) for l in data[0].split(",")]:
                    temp = [int(l) for l in data[0].split(",")]
                    temp.remove(liked_movie)
                    temp = ','.join(str(t) for t in temp)
                    sql = f"UPDATE service_like SET liked='{temp}', n_liked={data[1] - 1} WHERE uid_id={uid}"
                    cur.execute(sql)

                sql = f"SELECT liked, n_liked FROM service_like WHERE uid_id={uid}"
                cur.execute(sql)
                data = cur.fetchall()[0]
                data = {"liked": [int(l) for l in data[0].split(",")], "n_liked": int(data[1])}
                con.commit()
                con.close()
            else:
                data = {}
        else:
            data = {}

        print(data)
        return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})
