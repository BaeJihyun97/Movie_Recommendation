from rest_framework.decorators import api_view
from rest_framework.response import Response

from .apis import Neo4jConnection, recommendGraph
from django.conf import settings



# Create your views here.

@api_view(['GET', 'POST'])
def movieRecommReturn(request):
    if request.method == 'POST':

        # STIX 2 to elasticsearch
        if request.data['movieTitle'] != '':
            conn = Neo4jConnection(uri=settings.NEO4J_ADDRESS, user=settings.NEO4J_ID, pwd=settings.NEO4J_PWD)
            reco = recommendGraph(conn, request.data['movieTitle'])
            conn.close()
            #print(reco)
            return Response({"message": "Conversion complete!", "data": reco})

    return Response({"message": "Hello, world!"})