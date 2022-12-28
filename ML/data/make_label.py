import json
import re
import pandas as pd
from functools import reduce

genres = pd.read_csv('./node_genres.txt', sep = '\t')
label_file = open("./label_genre.txt", "w")
labels_file = open("./label_list.txt", "w")

labels = []

# with open('./movie.json', 'r', encoding='UTF8') as f:
#     json_data = json.load(f)

with open('./movie_2000.json', 'r', encoding='utf-8-sig') as f:
    json_data = json.load(f)

for i, movie in enumerate(json_data):
    ### genre
    if movie['genre'] != '':
        genre = re.split(',', movie['genre'])
        genre = [n.strip() for n in genre]
        label = []
        for g in genre:
            node2 = int(genres.loc[genres['genre'] == g]['index'])
            label.append(node2)
        label.sort()
        labels.append(label)
    else:
        labels.append([])

set_labels = reduce(lambda acc, cur: acc if cur in acc else acc+[cur], labels, [])

labels_file.write(f"index\tlabels\n")
for i, label in enumerate(set_labels):
    labels_file.write(f"{i}\t{label}\n")


label_file.write(f"movie\tlabel\n")
for i, label in enumerate(labels):
    # if label==[]: value = ""
    # else: value = label[0]
    value = set_labels.index(label)
    label_file.write(f"{i}\t{value}\n")


label_file.close()
labels_file.close()
