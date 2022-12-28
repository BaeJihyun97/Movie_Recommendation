'''
make id entities file

make entities (id, word, genre) file

entity class: movie, age, nation, genre, actor, director

input data format: json
[  {
    "index": 0,
    "title": "탑건: 매버릭",
    "title_e": "Top Gun: Maverick, 2021",
    "age": "[국내] 12세 관람가",
    "nation": "미국",
    "genre": "액션",
    "runningTime": "130분",
    "openingDate": "2022 .06.22 개봉",
    "summary": "최고의 파일럿이자 전설적인 인물 매버릭(톰 크루즈)은 자신이 졸업한 훈련학교 교관으로 발탁된다. ..."
    "actor": [
      [ "톰 크루즈", "Tom Cruise", "주연,매버릭 역" ],
      [ "마일즈 텔러", "Miles Teller", "주연,루스터 역" ],
      [ "제니퍼 코넬리", "Jennifer Connelly", "주연,페니 역" ],
      [ "존 햄", "Jon Hamm", "조연,사이클론 역" ],
      [ "에드 해리스", "Ed Harris", "조연,해군 소장 역" ],
      [ "글렌 포웰", "Glen Powell", "조연,행맨 역" ],
      [ "제이 엘리스", "Jay Ellis", "조연,페이백 역" ],
      [ "그렉 타잔 데이비스", "Greg Tarzan Davis", "조연,코요테 역" ]
    ],
    "director": [ "조셉 코신스키", "Joseph Kosinski", "감독" ]
  },
  ...
]
'''


import json
import re

# with open('./movie.json', 'r', encoding='UTF8') as f:
#     json_data = json.load(f)

with open('./movie_2000.json', 'r', encoding='utf-8-sig') as f:
    json_data = json.load(f)

titles = []
actors = []
directors = []
ages = []
nations = []
genres = []

f_title = open("./node_title.txt", "w", encoding='UTF8')
f_actor = open("./node_actor.txt", "w", encoding='UTF8')
f_director = open("./node_director.txt", "w", encoding='UTF8')
f_age = open("./node_age.txt", "w", encoding='UTF8')
f_nation = open("./node_nation.txt", "w", encoding='UTF8')
f_genre = open("./node_genres.txt", "w", encoding='UTF8')


for i, movie in enumerate(json_data):
#    try:
        ### title
        titles.append(movie['title'])

        ### age
        # age = re.split('\[[^]]*\]', movie['age'])
        age = re.split('\[', movie['age'])
        if '' in age: age.remove('')
        age = ['[' + a.strip() for a in age]
        if len(age) != 0:
            for a in age:
                if a not in ages:
                    ages.append(a)

        ### nation
        if len(movie['nation']) != '':
            nation = re.split(',', movie['nation'])
            nation = [n.strip() for n in nation]
            for n in nation:
                if n not in nations:
                    nations.append(n)

        ### genre
        if movie['genre'] != '':
            genre = re.split(',', movie['genre'])
            genre = [n.strip() for n in genre]
            for g in genre:
                if g not in genres:
                    genres.append(g)

        ### actor
        if len(movie['actor']) != 0:
            actor = [(ac[0], ac[1]) for ac in movie['actor']]
            for a in actor:
                if a not in actors:
                    actors.append(a)

        ### director
        if len(movie['director']) != 0:
            director = (movie['director'][0], movie['director'][1])
            if director not in directors:
                directors.append(director)
    # except Exception as ex:
    #     print(ex)
    #     print(i)
    #     exit(1)


f_title.write("index\ttitle\n")
for i, title in enumerate(titles):
    f_title.write(f"{i}\t{title}\n")

f_age.write("index\tage\n")
for i, age in enumerate(ages):
    f_age.write(f"{i}\t{age}\n")

f_nation.write("index\tnation\n")
for i, nation in enumerate(nations):
    f_nation.write(f"{i}\t{nation}\n")

f_genre.write("index\tgenre\n")
for i, genre in enumerate(genres):
    f_genre.write(f"{i}\t{genre}\n")

f_actor.write("index\tactor\n")
for i, actor in enumerate(actors):
    f_actor.write(f"{i}\t{actor}\n")

f_director.write("index\tdirector\n")
for i, director in enumerate(directors):
    f_director.write(f"{i}\t{director}\n")


f_age.close()
f_title.close()
f_actor.close()
f_director.close()
f_nation.close()
f_genre.close()
