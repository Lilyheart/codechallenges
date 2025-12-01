import os

DAY = 1

answers = {
    "1": {
        "test": 3,
        "actual": 1059
    },
    "2": {
        "test": 6,
        "actual": 6305
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
        raw_data = [(cell[0], int(cell[1:]))for cell in [line.strip() for line in input_values.read().split("\n")]]
        
    # debug(raw_data)
    dirMulti = {"L": -1, "R": 1}
    
    atZero = 0
    passedZero = 0
    dialAt = 50

    for dir, clicks in raw_data:
        lastDialAt = dialAt
        dialAt = (dialAt + (dirMulti[dir] * clicks)) % 100

        if dialAt == 0:
            atZero += 1
        
        if dir == "L":
            if (lastDialAt - clicks) < 0:
                passedZero += abs((100 + lastDialAt - clicks) // 100)
                if lastDialAt != 0:
                    passedZero += 1
            if dialAt == 0:
                passedZero += 1
        elif dir == "R":
            passedZero += (lastDialAt + clicks) // 100
    
    testStar(file, "1", atZero)                        
    testStar(file, "2", passedZero)     
            
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")