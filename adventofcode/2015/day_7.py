import os
import re
import copy

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 72,
        "2": None
    },
    "actual": {
        "1": 956,
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
        print(f"Star {star} {"🎄🎄🎄" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = [line.strip().split(" -> ") for line in input_values.read().split("\n")]
        
    # debug(raw_data)
    
    wires = {}
    
    def valid(num):
        while 0 > num or num > 65535:
            if num < 0:
                num += 65536
            elif num > 65535:
                num -= 65536
        return num

    while len(raw_data) > 0:
        for instruction, wire in raw_data[:]:
            # debug(dict(sorted(wires.items())))
            rule = instruction.split(" ")
            # debug(rule)
            if len(rule) == 1: # Original Set
                if not instruction.isdigit() and instruction not in wires.keys():
                    continue
                wires[wire] = int(instruction) if instruction.isdigit() else wires[instruction]
            elif len(rule) == 2: # Not
                if not rule[1].isdigit() and rule[1] not in wires.keys():
                    continue
                
                value = int(rule[1]) if rule[1].isdigit() else wires[rule[1]]
                
                wires[wire] = valid(~value)
            else:
                if not rule[0].isdigit() and rule[0] not in wires.keys():
                    continue
                if not rule[2].isdigit() and rule[2] not in wires.keys():
                    continue
                
                left = int(rule[0]) if rule[0].isdigit() else wires[rule[0]]
                right = int(rule[2]) if rule[2].isdigit() else wires[rule[2]]
                
                if rule[1] == "AND":
                    wires[wire] = valid(left & right)
                elif rule[1] == "OR":
                    wires[wire] = valid(left | right)
                elif rule[1] == "LSHIFT":
                    wires[wire] = valid(left << right)
                elif rule[1] == "RSHIFT":
                    wires[wire] = valid(left >> right)
                    
            raw_data.remove([instruction, wire])
        
        # debug(dict(sorted(wires.items())))
        # debug(len(raw_data))
        # debug("=========")
    
    testStar(file, "1", dict(sorted(wires.items()))["a"])
    testStar(file, "2", None)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")