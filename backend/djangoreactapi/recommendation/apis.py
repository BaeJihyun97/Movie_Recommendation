from neo4j import GraphDatabase
import pandas as pd
import re
import torch
import numpy as np
from numpy import dot
from numpy.linalg import norm
import json
from service.views import findLiked

np_load = np.load('../../embed_movie_learned.npy')
embed_movie_learned = torch.from_numpy(np_load)

titles = pd.read_csv('../../node_title.txt', sep='\t')['title'].tolist()

labels = pd.read_csv("../../image_clustered.txt", sep="\t")
image_clustered_label = []
for label in labels["labels"]:
  image_clustered_label.append([int(t) for t in re.sub(pattern="[\[\]]", repl="", string = label).split(",")])


def find_movie(title):
    if title in titles:
        return titles.index(title)
    else:
        for i, movie in enumerate(titles):
            if re.search(title, movie) is not None:
                return i
        return None


def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))


class Neo4jConnection:
    def __init__(self, uri, user, pwd):
        self.__uri = uri
        self.__user = user
        self.__pwd = pwd
        self.__driver = None
        try:
            self.__driver = GraphDatabase.driver(self.__uri, auth=(self.__user, self.__pwd))
        except Exception as e:
            print("Failed to create the driver:", e)

    def close(self):
        if self.__driver is not None:
            self.__driver.close()

    def query(self, query, db=None):
        assert self.__driver is not None, "Driver not initialized!"
        session = None
        response = None
        try:
            session = self.__driver.session(database=db) if db is not None else self.__driver.session()
            response = list(session.run(query))
        except Exception as e:
            print("Query failed:", e)
        finally:
            if session is not None:
                session.close()
        return response


def recommendGraph(Neo4jConnection, movie_title, uid):
    movie_id = find_movie(movie_title)
    if movie_id is None:
        return []
    movie_title = titles[movie_id]
    score = []
    score2 = []
    target = embed_movie_learned[titles.index(movie_title)]
    movie_title = re.sub(pattern='[^\w\s]', repl='', string=movie_title)
    movie_title = re.sub(pattern=' ', repl='_', string=movie_title)

    query = f"match path1 = (n:Movie)<-[]-()-[]->(m:Movie{{name:'{movie_title}'}}) return n.id"
    query2 = f"match path1 = (n:Movie)-[]->(l:Genre)<-[]-(m:Movie{{name:'{movie_title}'}}), path2= (n:Movie)-[]->(l2:Nation)<-[]-(m:Movie{{name:'{movie_title}'}}), path3 = (n:Movie)-[]->(l3:Age)<-[]-(m:Movie{{name:'{movie_title}'}}) return n.id limit 50"
    response = Neo4jConnection.query(query, db='neo4j')
    response2 = Neo4jConnection.query(query2, db='neo4j')


    for c in response:
        t = [c["n.id"], cos_sim(target, embed_movie_learned[c])]
        if t not in score:
            score.append(t)

    for c in response2:
        t = [c["n.id"], cos_sim(target, embed_movie_learned[c])]
        if t not in score and t not in score2:
            score2.append(t)

    score.sort(key=lambda row: (row[1], row[0]), reverse=True)
    score2.sort(key=lambda row: (row[1], row[0]), reverse=True)

    recommT = []
    recomm = []

    if uid:
        liked, n_liked = findLiked(uid)
    else:
        liked = []
        n_liked = 0


    for i in range(5):

        recommT.append({"movie_content_seq": i,
                        "movie_content_id": score[i][0],
                        "movieTitle": titles[score[i][0]],
                        "liked": 1 if score[i][0] in liked else 0})

        recomm.append({"movie_content_seq": i,
                       "movie_content_id": score[i][0],
                       "movieTitle": score[i][0]})

    for i in range(5):
        recommT.append({"movie_content_seq": i + 5,
                        "movie_content_id": score2[i][0],
                        "movieTitle": titles[score2[i][0]],
                        "liked": 1 if score[i][0] in liked else 0})
        recomm.append({"movie_content_seq": i + 5,
                       "movie_content_id": score2[i][0],
                       "movieTitle": score2[i][0]})

    return recommT

def recommendImage(Neo4jConnection, movie_title, uid):

    movie_id = find_movie(movie_title)
    if movie_id is None:
        return []
    movie_title = titles[movie_id]

    target = image_clustered_label[titles.index(movie_title)]
    movie_title = re.sub(pattern='[^\w\s]', repl='', string=movie_title)
    movie_title = re.sub(pattern=' ', repl='_', string=movie_title)

    query = f"match path1 = (n:Movie)<-[]-()-[]->(m:Movie{{name:'{movie_title}'}}) return n.id"
    query2 = f"match path1 = (n:Movie)-[]->(l:Genre)<-[]-(m:Movie{{name:'{movie_title}'}}), path2= (n:Movie)-[]->(l2:Nation)<-[]-(m:Movie{{name:'{movie_title}'}}), path3 = (n:Movie)-[]->(l3:Age)<-[]-(m:Movie{{name:'{movie_title}'}}) return n.id limit 50"
    response = Neo4jConnection.query(query, db='neo4j')
    response2 = Neo4jConnection.query(query2, db='neo4j')

    score = []
    score2 = []


    for c in response:
        # print(c["n.id"])
        t = [c["n.id"], cos_sim(target, image_clustered_label[c["n.id"]])]
        if t not in score:
            score.append(t)

    for c in response2:
        t = [c["n.id"], cos_sim(target, image_clustered_label[c["n.id"]])]
        if t not in score and t not in score2:
            score2.append([c["n.id"], cos_sim(target, image_clustered_label[c["n.id"]])])

    score.sort(key=lambda row: (row[1], row[0]), reverse=True)
    score2.sort(key=lambda row: (row[1], row[0]), reverse=True)


    recommT = []
    recomm = []

    if uid:
        liked, n_liked = findLiked(uid)
    else:
        liked = []
        n_liked = 0

    for i in range(5):
        recommT.append({"movie_content_seq": i,
                        "movie_content_id": score[i][0],
                        "movieTitle": titles[score[i][0]],
                        "liked": 1 if score[i][0] in liked else 0})
        recomm.append({"movie_content_seq": i,
                       "movie_content_id": score[i][0],
                       "movieTitle": score[i][0]})

    for i in range(5):
        recommT.append({"movie_content_seq": i + 5,
                        "movie_content_id": score2[i][0],
                        "movieTitle": titles[score2[i][0]],
                        "liked": 1 if score[i][0] in liked else 0})
        recomm.append({"movie_content_seq": i + 5,
                       "movie_content_id": score2[i][0],
                       "movieTitle": score2[i][0]})


    return recommT





