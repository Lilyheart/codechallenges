import os
import re
import numpy as np
from scipy.spatial import distance
from math import prod

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 40,
        "2": 25272
    },
    "actual": {
        "1": 121770,
        "2": 7893123992
    }
}

def debug(string):
    print(string)
    pass

def testStar(file, star, answer):
    correctAnswer = answers["test" if "test" in file.split(".")[0] else "actual"][star]
    if correctAnswer == None:
        print(f"Star {star} = {answer} (unknown answer) ❔")
    else:
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"🎄🎄🎄" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")
    
    if "test" in file:
        pairs = 10
    else:
        pairs = 1000

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = np.array([list(map(int, line.split(","))) for line in input_values])
    
    distances = distance.squareform(distance.pdist(raw_data))
    pairs_list = []
    for i in range(len(raw_data)):
        for j in range(i+1, len(raw_data)):
            pairs_list.append((distances[i][j], i, j))
    pairs_list.sort()
            
    circuits = list(range(len(raw_data)))
    num_components = len(circuits)
    
    def find_rec(parent, i):
        if parent[i] != i:
            parent[i] = find_rec(parent, parent[i])
        return parent[i]
                    
    for pair in range(pairs):
        _, first, second = pairs_list[pair]
        old_circuit, new_circuit = find_rec(circuits, first), find_rec(circuits, second) 
        if old_circuit != new_circuit:
            circuits[new_circuit] = old_circuit  
            num_components -= 1
                
    final_circuits = [find_rec(circuits, i) for i in range(len(circuits))]
        
    last_pair = None
    while num_components > 1:
        pair += 1
        _, first, second = pairs_list[pair]
        old_circuit, new_circuit = find_rec(circuits, first), find_rec(circuits, second) 
        if old_circuit != new_circuit:
            circuits[new_circuit] = old_circuit  
            last_pair = (first, second)  
            num_components -= 1

    testStar(file, "1", prod(sorted(np.unique_counts(final_circuits).counts)[-3:]))
    testStar(file, "2", raw_data[last_pair[0]][0] * raw_data[last_pair[1]][0])
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")