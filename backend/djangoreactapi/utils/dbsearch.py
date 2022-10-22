import pymysql
from django.conf import settings


def findLiked(uid, coni=None):
    if coni is None:
        con = pymysql.connect(host=settings.DATABASES["default"]["HOST"], user=settings.DATABASES["default"]["USER"],
                              password=settings.DATABASES["default"]["PASSWORD"], db=settings.DATABASES["default"]["NAME"]
                              , charset='utf8', port=int(settings.DATABASES["default"]["PORT"]))
    else: con = coni

    cur = con.cursor()
    sql = f"SELECT liked, n_liked FROM service_like WHERE uid_id={uid}"
    cur.execute(sql)
    temp = cur.fetchall()
    if len(temp) != 0:
        data = temp[0]
        data = [int(l) for l in data[0].split(",")]
    else:
        data = []
    if coni is None:
        con.close()
    return data, len(data)
