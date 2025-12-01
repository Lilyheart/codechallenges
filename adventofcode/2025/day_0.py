import os

DAY = 0

answers = {
    "1": {
        "test": None,
        "actual": None
    },
    "2": {
        "test": None,
        "actual": None
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
        raw_data = [line.strip().split(" ") for line in input_values.read().split("\n")]

    star1 = 0
    star2 = 0
    
    testStar(file, "1", star1)
    testStar(file, "2", star2)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")