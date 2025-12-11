import os
import re
from functools import cache

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 5,
        "2": 2
    },
    "actual": {
        "1": 733,
        "2": 290219757077250
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
    
    file1, file2 = file, file
    
    if "test" in file:
        file1 = file + "_1"
        file2 = file + "_2"

    with open(os.path.join("input", f"{file1}.txt"), "r", encoding="utf-8") as input_values:
        raw_data1 = [line.strip().split(" ") for line in input_values.read().split("\n")]

    with open(os.path.join("input", f"{file2}.txt"), "r", encoding="utf-8") as input_values:
        raw_data2 = [line.strip().split(" ") for line in input_values.read().split("\n")]
        
    # debug(raw_data)
        
    data1 = {}
    data2 = {}
    
    for d in raw_data1:
        data1[d[0][:-1]] = d[1:]
    
    for d in raw_data2:
        data2[d[0][:-1]] = d[1:]
    
    # debug(data)
    
    # BFS = []
    # curr_paths = [["you"]]
    # while True:
    #     # debug(f"--Paths size {len(curr_paths[0])}")
    #     next_paths = []
    #     for path in curr_paths:
    #         for branch in data1[path[-1]]:
    #             if branch == "out":
    #                 BFS.append(path)
    #                 continue
    #             else:
    #                 next_paths.append(path + [branch])
    #     if len(next_paths) == 0:
    #         break
    #     else:
    #         curr_paths = next_paths
               
    def walk_the_line1(head):
        if head == "out":
            return 1
        return sum(walk_the_line1(branch) for branch in data1[head])

    DFS1 = walk_the_line1("you")
            
    @cache   
    def walk_the_line2(head, stillNeed: tuple):
        stillNeed = tuple(item for item in stillNeed if item != head)
        if head == "out":
            return 1 if len(stillNeed) == 0 else 0
        return sum(walk_the_line2(branch, stillNeed) for branch in data2[head])

    DFS2 = walk_the_line2("svr", ("dac", "fft"))
        
    testStar(file, "1", DFS1)
    testStar(file, "2", DFS2)
 
code(f"{DAY}_test")
code(f"{DAY}")