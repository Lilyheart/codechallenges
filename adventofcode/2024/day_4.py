import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 18,
        "2": 9
    },
    "actual": {
        "1": 2521,
        "2": None
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
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"✅" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = [list(line) for line in input_values.read().split("\n")]
        
    # debug(raw_data)
    
    countXMAS = 0
    directions = [(-1,-1), (-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1,-1), (0,-1)] # clockwise starting in northwest corner
    string = ["M", "A", "S"]
    
    for row in range(len(raw_data)):
        for col in range(len(raw_data[row])):
            if raw_data[row][col] != "X":
                continue # stop looking at this col but look at the next one
            for i in range(len(directions)):
                newRow = row
                newCol = col
                for j in range(len(string)):
                    newRow += directions[i][0]
                    newCol += directions[i][1]
                                        
                    if (not (0 <= newRow < len(raw_data))) or (not (0 <= newCol < len(raw_data[row]))):
                        break # end the letter loop completely
                    if raw_data[newRow][newCol] != string[j]:
                        break # end the letter loop completely
                    if j == len(string)-1:
                        countXMAS += 1
    
    countxMAS = 0
    string = ["M", "S"]
    
    for row in range(len(raw_data)):
        for col in range(len(raw_data[row])):
            if raw_data[row][col] != "A":
                continue # stop looking at this col but look at the next one
            tlRow = row - 1
            tlCol = col - 1
            trRow = row - 1
            trCol = col + 1
            
            blRow = row + 1
            blCol = col - 1
            brRow = row + 1
            brCol = col + 1
                                
            if (not (0 <= tlRow < len(raw_data))) or (not (0 <= tlCol < len(raw_data[row]))):
                continue # stop looking at this col but look at the next one
            if (not (0 <= trRow < len(raw_data))) or (not (0 <= trCol < len(raw_data[row]))):
                continue # stop looking at this col but look at the next one
            if (not (0 <= blRow < len(raw_data))) or (not (0 <= blCol < len(raw_data[row]))):
                continue # stop looking at this col but look at the next one
            if (not (0 <= brRow < len(raw_data))) or (not (0 <= brCol < len(raw_data[row]))):
                continue # stop looking at this col but look at the next one
            
            tl, tr, bl, br = (raw_data[tlRow][tlCol], raw_data[trRow][trCol], raw_data[blRow][blCol], raw_data[brRow][brCol])
            if tl == br or tr == bl:
                continue # stop looking at this col but look at the next one
            if all(item in string for item in [tl, tr, bl, br]):
                countxMAS += 1

    testStar(file, "1", countXMAS)
    testStar(file, "2", countxMAS)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")