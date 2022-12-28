'''
make relation file with TSV format


relations:

director direct movie
actor act movie
movie is_in_genre genre
movie is_rated_age age
movie made_in_nation nation


'''
import pandas as pd
import json
import re

f_direct = open("./edge_direct.txt", "w", encoding='UTF8')
f_act = open("./edge_act.txt", "w", encoding='UTF8')
f_is_in_genre = open("./edge_is_in_genre.txt", "w", encoding='UTF8')
f_is_rated_age = open("./edge_is_rated_age.txt", "w", encoding='UTF8')
f_made_in_nation = open("./edge_made_in_nation.txt", "w", encoding='UTF8')

# with open('./movie.json', 'r', encoding='UTF8') as f:
#     json_data = json.load(f)

with open('./movie_2000.json', 'r', encoding='utf-8-sig') as f:
    json_data = json.load(f)

direct = []
act = []
is_in_genre = []
is_rated_age = []
made_in_nation = []

titles = pd.read_csv('./node_title.txt', sep = '\t')
actors = pd.read_csv('./node_actor.txt', sep = '\t')
directors = pd.read_csv('./node_director.txt', sep = '\t')
ages = pd.read_csv('./node_age.txt', sep = '\t')
nations = pd.read_csv('./node_nation.txt', sep = '\t')
genres = pd.read_csv('./node_genres.txt', sep = '\t')


for i, movie in enumerate(json_data):
    node1 = movie['index']

    ### age
    # age = re.split('\[[^]]*\]', movie['age'])
    age = re.split('\[', movie['age'])
    if '' in age: age.remove('')
    age = ['[' + a.strip() for a in age]
    if len(age) != 0:
        for a in age:
            node2 = int(ages.loc[ages['age'] == a]['index'])
            is_rated_age.append([node1, node2])


    ### nation
    if len(movie['nation']) != '':
        nation = re.split(',', movie['nation'])
        nation = [n.strip() for n in nation]
        for n in nation:
            node2 = int(nations.loc[nations['nation'] == n]['index'])
            made_in_nation.append([node1, node2])


    ### genre
    if movie['genre'] != '':
        genre = re.split(',', movie['genre'])
        genre = [n.strip() for n in genre]
        for g in genre:
            node2 = int(genres.loc[genres['genre'] == g]['index'])
            is_in_genre.append([node1, node2])


    ### actor
    if len(movie['actor']) != 0:
        actor = [(ac[0], ac[1]) for ac in movie['actor']]
        for jj, a in enumerate(actor):
            node2 = int(actors.loc[actors['actor'] == f"{a}"]['index'])
            act.append([node2, node1])


    ### director
    if len(movie['director']) != 0:
        director = (movie['director'][0], movie['director'][1])
        node2 = int(directors.loc[directors['director'] == f"{director}"]['index'])
        direct.append([node2, node1])

    if i%100 == 0:
        print(i)


f_direct.write("director movie\n")
for i, d in enumerate(direct):
    f_direct.write(f"{d[0]} {d[1]}\n")

f_act.write("actor movie\n")
for i, d in enumerate(act):
    f_act.write(f"{d[0]} {d[1]}\n")

f_is_in_genre.write("movie genre\n")
for i, d in enumerate(is_in_genre):
    f_is_in_genre.write(f"{d[0]} {d[1]}\n")

f_is_rated_age.write("movie age\n")
for i, d in enumerate(is_rated_age):
    f_is_rated_age.write(f"{d[0]} {d[1]}\n")

f_made_in_nation.write("movie nation\n")
for i, d in enumerate(made_in_nation):
    f_made_in_nation.write(f"{d[0]} {d[1]}\n")


f_direct.close()
f_act.close()
f_is_in_genre.close()
f_is_rated_age.close()
f_made_in_nation.close()

