from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from .apis import Neo4jConnection, recommendGraph, recommendImage
from django.conf import settings




# Create your views here.

@api_view(['GET', 'POST'])
def movieRecommReturn(request):
    if request.method == 'POST':

        # STIX 2 to elasticsearch
        if request.data is not None and request.data['data']['movieTitle'] != '':
            title = request.data['data']['movieTitle']
            if request.data['uid']: uid = int(request.data['uid'])
            else: uid = None
            conn = Neo4jConnection(uri=settings.NEO4J_ADDRESS, user=settings.NEO4J_ID, pwd=settings.NEO4J_PWD)
            graph = recommendGraph(conn, title.strip(), uid)
            image = recommendImage(conn, title.strip(), uid)
            data = {'graph': graph, 'image': image}
            print(len(data['graph']))
            conn.close()
            return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})