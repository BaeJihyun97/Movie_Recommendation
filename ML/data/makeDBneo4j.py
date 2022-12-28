from neo4j import GraphDatabase
import pandas as pd
import re
import torch
import numpy as np
from numpy import dot
from numpy.linalg import norm
import time

time1 = time.time()


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



conn = Neo4jConnection(uri="bolt://172.30.1.6/:7687", user="neo4j", pwd="movier")

# np_load = np.load('./embed_movie_learned.npy')
# result = torch.from_numpy(np_load)
#
# titles = pd.read_csv('./node_title.txt', sep = '\t')['title'].tolist()
#
# time2 = time.time()
# print(time2-time1)
# query = "match path1 = (n:Movie)<-[]-()-[]->(m:Movie{name:'탑건_매버릭'}), path2 = (n:Movie)-[]->(l:Genre)<-[]-(m:Movie{name:'탑건_매버릭'}) return n.id"
# query2 = "match path1 = (n:Movie)-[]->(l:Genre)<-[]-(m:Movie{name:'탑건_매버릭'}), path2= (n:Movie)-[]->(l2:Nation)<-[]-(m:Movie{name:'탑건_매버릭'}), path3 = (n:Movie)-[]->(l3:Age)<-[]-(m:Movie{name:'탑건_매버릭'}) return n.id limit 50"
# response = conn.query(query, db='neo4j')
# response2 = conn.query(query2, db='neo4j')
# # for r in response:
# #     print(r["n.id"])
# #
# # for r in response2:
# #     print(r["n.id"])
#
# score = []
# score2 = []
# target = result[0]
# print(titles[0])
# for c in response:
#     t = [c["n.id"], cos_sim(target, result[c])]
#     if t not in score:
#         score.append(t)
#
#
# for c in response2:
#     t = [c["n.id"], cos_sim(target, result[c])]
#     if t not in score and t not in score2:
#         score2.append([c["n.id"], cos_sim(target, result[c])])
#
#
# score.sort(key=lambda row: (row[1], row[0]), reverse=True)
# score2.sort(key=lambda row: (row[1], row[0]), reverse=True)
#
# time3 = time.time()
# print(time3 - time2)
#
# for i in range(5):
#     print(titles[score[i][0]])
#
# for i in range(5):
#     print(titles[score2[i][0]])


actors = pd.read_csv('./node_actor.txt', sep = '\t')['actor'].tolist()
directors = pd.read_csv('./node_director.txt', sep = '\t')['director'].tolist()
ages = pd.read_csv('./node_age.txt', sep = '\t')['age'].tolist()
nations = pd.read_csv('./node_nation.txt', sep = '\t')['nation'].tolist()
genres = pd.read_csv('./node_genres.txt', sep = '\t')['genre'].tolist()
titles = pd.read_csv('./node_title.txt', sep = '\t')['title'].tolist()


dup_movie = pd.read_csv('./duplication.txt', sep = '\t')['movie'].tolist()
actors = [actor for actor in actors if actor not in dup_movie]
directors = [director for director in directors if director not in dup_movie]

# for i, actor in enumerate(actors):
#     actor = re.sub(pattern='[^\w\s,]', repl='', string=actor)
#     actor = actor.split(",")
#     actor[0] = re.sub(pattern=' ', repl='_', string=actor[0].strip())
#
#     query = f"MATCH (n:Actor) WHERE n.name='{actor[0]}' SET n += {{id: {i}}}"
#     conn.query(query, db='neo4j')
#
# for i, director in enumerate(directors):
#     if director not in dup_movie:
#         director = re.sub(pattern='[^\w\s,]', repl='', string=director)
#         director = director.split(",")
#         director[0] = re.sub(pattern=' ', repl='_', string=director[0].strip())
#         query = f"MATCH (n:Director) WHERE n.name='{director[0]}' SET n += {{id: {i+7784}}}"
#         conn.query(query, db='neo4j')


# print("insert movie...")
#
# for i, title in enumerate(titles):
#     title = re.sub(pattern='[^\w\s]', repl='', string=title)
#     title = re.sub(pattern=' ', repl='_', string=title)
#     variable = "title"+str(i)
#     query = f"CREATE ({variable}:Movie {{name: '{title}', id: {i}}})"
#     conn.query(query, db='neo4j')
#
# print("insert movie complete")
#
# print("insert actor...")
# for i, actor in enumerate(actors):
#     actor = re.sub(pattern='[^\w\s,]', repl='', string=actor)
#     actor = actor.split(",")
#     variable = "actor" + str(i)
#     actor[0] = re.sub(pattern=' ', repl='_', string=actor[0].strip())
#     actor[1] = re.sub(pattern=' ', repl='_', string=actor[1].strip())
#     if actor[1] == "": actor[1] = actor[0]
#     query = f"CREATE ({variable}:Actor {{name: '{actor[0]}', nameE:'{actor[1]}', id: {i}}})"
#     conn.query(query, db='neo4j')
# print("insert actor complete")
#
# print("insert director...")
# for i, director in enumerate(directors):
#     director = re.sub(pattern='[^\w\s,]', repl='', string=director)
#     director = director.split(",")
#     variable = "director" + str(i)
#     director[0] = re.sub(pattern=' ', repl='_', string=director[0].strip())
#     director[1] = re.sub(pattern=' ', repl='_', string=director[1].strip())
#     if director[1] == "": director[1] = director[0]
#     query = f"CREATE ({variable}:Director {{name: '{director[0]}', nameE:'{director[1]}', id: {i}}})"
#     conn.query(query, db='neo4j')
# print("insert director complete")
#
# print("insert dup...")
# for i, dup in enumerate(dup_movie):
#     dup = re.sub(pattern='[^\w\s,]', repl='', string=dup)
#     dup = dup.split(",")
#     variable = "Actor_Director" + str(i)
#     dup[0] = re.sub(pattern=' ', repl='_', string=dup[0].strip())
#     dup[1] = re.sub(pattern=' ', repl='_', string=dup[1].strip())
#     if dup[1] == "": dup[1] = dup[0]
#     query = f"CREATE ({variable}:Actor:Director {{name: '{dup[0]}', nameE:'{dup[1]}', id: {i}}})"
#     conn.query(query, db='neo4j')
# print("insert duplication complete")
#
# print("insert ...")
# for i, age in enumerate(ages):
#     age = re.sub(pattern='[^\w\s,]', repl='', string=age)
#     age = re.sub(pattern=' ', repl='_', string=age.strip())
#     variable = "age" + str(i)
#
#     query = f"CREATE ({variable}:Age {{name: '{age}', id: {i}}})"
#     conn.query(query, db='neo4j')
#
# print("insert ...")
# for i, nation in enumerate(nations):
#     nation = re.sub(pattern='[^\w\s,]', repl='', string=nation)
#     nation = re.sub(pattern=' ', repl='_', string=nation.strip())
#     variable = "nation" + str(i)
#
#     query = f"CREATE ({variable}:Nation {{name: '{nation}', id: {i}}})"
#     conn.query(query, db='neo4j')
#
# print("insert ...")
# for i, genre in enumerate(genres):
#     genre = re.sub(pattern='[^\w\s,]', repl='', string=genre)
#     genre = re.sub(pattern=' ', repl='_', string=genre.strip())
#     variable = "genre" + str(i)
#
#     query = f"CREATE ({variable}:Genre {{name: '{genre}', id: {i}}})"
#     conn.query(query, db='neo4j')

actins = pd.read_csv('./edge_act.txt', sep=' ').transpose()
directs = pd.read_csv('./edge_direct.txt', sep=' ').transpose()
rateds = pd.read_csv('./edge_is_rated_age.txt', sep=' ').transpose()
madeInNations = pd.read_csv('./edge_made_in_nation.txt', sep=' ').transpose()
isInGenres = pd.read_csv('./edge_is_in_genre.txt', sep=' ').transpose()

actors = pd.read_csv('./node_actor.txt', sep = '\t')['actor'].tolist()
directors = pd.read_csv('./node_director.txt', sep = '\t')['director'].tolist()

# print(actin[0])
# print(actors[actin[0][0]], titles[actin[0][1]])
# print(actors[actin[1][0]], titles[actin[1][1]])
# print(actors[actin[2][0]], titles[actin[2][1]])

print("...")
for i in range(len(actins.T['movie'])):
    #print(actins[i])
    actor = actors[actins[i][0]]
    movie = titles[actins[i][1]]
    actor = re.sub(pattern='[^\w\s,]', repl='', string=actor).split(",")
    actor = re.sub(pattern=' ', repl='_', string=actor[0].strip())
    movie = re.sub(pattern='[^\w\s]', repl='', string=movie)
    movie = re.sub(pattern=' ', repl='_', string=movie)

    query = f"MATCH (n:Actor{{name:'{actor}'}}), (m:Movie) WHERE m.name='{movie}' CREATE (n)-[r:ActIn]->(m)"
    if(i%100 ==0): print(i/(len(actins.T['movie'])))
    conn.query(query, db='neo4j')

print("...")
for i in range(len(directs.T['movie'])):
    director = directors[directs[i][0]]
    movie = titles[directs[i][1]]
    director = re.sub(pattern='[^\w\s,]', repl='', string=director).split(",")
    director = re.sub(pattern=' ', repl='_', string=director[0].strip())
    movie = re.sub(pattern='[^\w\s]', repl='', string=movie)
    movie = re.sub(pattern=' ', repl='_', string=movie)

    query = f"MATCH (n:Director{{name:'{director}'}}), (m:Movie) WHERE m.name='{movie}' CREATE (n)-[r:Direct]->(m)"
    if(i%100==0): print(i/(len(directs.T['movie'])))
    conn.query(query, db='neo4j')
print("...")
for i in range(len(rateds.T['age'])):
    age = ages[rateds[i][1]]
    movie = titles[rateds[i][0]]
    age = re.sub(pattern='[^\w\s,]', repl='', string=age).split(",")
    age = re.sub(pattern=' ', repl='_', string=age[0].strip())
    movie = re.sub(pattern='[^\w\s]', repl='', string=movie)
    movie = re.sub(pattern=' ', repl='_', string=movie)

    query = f"MATCH (n:Age{{name:'{age}'}}), (m:Movie) WHERE m.name='{movie}' CREATE (m)-[r:RatedAge]->(n)"
    conn.query(query, db='neo4j')
print("...")
for i in range(len(madeInNations.T['nation'])):
    nation = nations[madeInNations[i][1]]
    movie = titles[madeInNations[i][0]]
    nation = re.sub(pattern='[^\w\s,]', repl='', string=nation).split(",")
    nation = re.sub(pattern=' ', repl='_', string=nation[0].strip())
    movie = re.sub(pattern='[^\w\s]', repl='', string=movie)
    movie = re.sub(pattern=' ', repl='_', string=movie)

    query = f"MATCH (n:Movie{{name:'{movie}'}}), (m:Nation) WHERE m.name='{nation}' CREATE (n)-[r:MadeInNation]->(m)"
    conn.query(query, db='neo4j')
print("...")
for i in range(len(isInGenres.T['genre'])):
    genre = genres[isInGenres[i][1]]
    movie = titles[isInGenres[i][0]]
    genre = re.sub(pattern='[^\w\s,]', repl='', string=genre).split(",")
    genre = re.sub(pattern=' ', repl='_', string=genre[0].strip())
    movie = re.sub(pattern='[^\w\s]', repl='', string=movie)
    movie = re.sub(pattern=' ', repl='_', string=movie)

    query = f"MATCH (n:Movie{{name:'{movie}'}}), (m:Genre) WHERE m.name='{genre}' CREATE (n)-[r:IsInGenre]->(m)"
    conn.query(query, db='neo4j')

