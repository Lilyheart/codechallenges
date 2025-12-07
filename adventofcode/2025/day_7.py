import os
import re
from collections import defaultdict

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 21,
        "2": 40
    },
    "actual": {
        "1": 1590,
        "2": 20571740188555
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

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = input_values.read().split("\n")
        
    # debug(raw_data)
    
    beams = set()
    beamTimelines = defaultdict(int)
    splits = 0
    
    for r in raw_data:
        # prop beams
        for beam in list(beams):
            if r[beam] == "^":
                beams.remove(beam)
                beams.update([beam-1, beam+1])
                splits += 1
                
                beamTimelines[beam-1] += beamTimelines[beam]
                beamTimelines[beam+1] += beamTimelines[beam]
                
                beamTimelines[beam] = 0
        
        for i, c in enumerate(r):
            if c == "S":
                beams.add(i)
                beamTimelines[i] += 1
    
    testStar(file, "1", splits)
    testStar(file, "2", sum(beamTimelines.values()))
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")