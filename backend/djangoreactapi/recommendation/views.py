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
        if request.data['movieTitle'] != '':
            conn = Neo4jConnection(uri=settings.NEO4J_ADDRESS, user=settings.NEO4J_ID, pwd=settings.NEO4J_PWD)
            graph = recommendGraph(conn, request.data['movieTitle'])
            image = recommendImage(conn, request.data['movieTitle'])
            data = {'graph': graph, 'image': image}
            conn.close()
            #print(reco)
            return Response({"message": "Conversion complete!", "data": data})

    return Response({"message": "Hello, world!"})