import os
import re
import numpy as np
from math import prod

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 4277556,
        "2": 3263827
    },
    "actual": {
        "1": 5733696195703,
        "2": 10951882745757
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
        raw_data = np.array(input_values.read().split("\n"))
        
    operators = raw_data[-1].split()
    operands = np.transpose([line.split() for line in raw_data[:-1]])
    
    def sumIt(operators, operands):
        sum0 = 0
        for i, op in enumerate(operators):
            if op == "+":
                sum0 += sum(int(x) for x in operands[i])
            elif op == "*":
                sum0 += prod(int(x) for x in operands[i])
            else:
                raise Exception(f"Operator {op}")
        return sum0
            
    sum1 = sumIt(operators, operands)
                
    new_operators = []
    new_operands = []
    
    raw_data = np.array([list(line) for line in raw_data])
        
    opts = []
    for i in range(len(raw_data[-1])):
        column = raw_data[:, i]
        if all(c == " " for c in column):
            new_operands.append(opts)
            opts = [] 
        else:
            if column[-1] != " ":
                new_operators.append(str(column[-1]))
            opts.append("".join(column[:-1]))
    new_operands.append(opts)
                                
    sum2 = sumIt(new_operators, new_operands)
    
    testStar(file, "1", sum1)
    testStar(file, "2", sum2)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")