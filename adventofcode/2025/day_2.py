import os

DAY = 2

answers = {
    "1": {
        "test": 1227775554,
        "actual": 24043483400
    },
    "2": {
        "test": 4174379265,
        "actual": 38262920235
    }
}

def debug(string):
    # print(string)
    pass

def testStar(file, star, answer):
    correctAnswer = answers[star]["test" if "test" in file.split(".")[0] else "actual"]
    if correctAnswer == None:
        print(f"Star {star} = {answer} (unknown answer) ❔")
    else:
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"✅" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = [tuple(int(item) for item in line.strip().split("-")) for line in input_values.read().split(",")]
        
    # debug(raw_data)
    
    invalidSum = 0
    
    for firstID, lastID in raw_data:
        for id in range(firstID, lastID+1, 1):
            strID = str(id)
            if len(strID) % 2 == 0:
                half = len(strID) // 2
                if strID[:half] == strID[half:]:
                    invalidSum += id
    
    testStar(file, "1", invalidSum)
    
    invalidSum = 0
    
    for firstID, lastID in raw_data:
        for id in range(firstID, lastID+1):
            strID = str(id)
                                    
            for chunckSize in range(len(strID) // 2, 0, -1): 
                if len(strID) % chunckSize == 0:
                    first = strID[:chunckSize]
                    if all(strID[j:j+chunckSize] == first for j in range(chunckSize, len(strID), chunckSize)):
                        invalidSum += id
                        break
    
    testStar(file, "2", invalidSum)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")