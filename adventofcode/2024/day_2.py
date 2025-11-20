import os
import copy
from collections import Counter

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as f:
        reports = [list(map(int, line.split())) for line in f]
        
    def dir(x, y):
        if x < y:
            return "inc"
        if x > y:
            return "dec"
        return "n"
    
    def funcIsOkay(report):
        isOkay = True
        rDir = dir(report[0], report[1])
        if rDir == "n" or abs(report[0] - report[1]) > 3:
            return False
        for i in range(1, len(report) - 1):
            if dir(report[i], report[i+1]) != rDir or abs(report[i] - report[i+1]) > 3:
                if report == [1, 2, 4, 5]:
                    print(f"first {report[i]} {report[i+1]} {rDir}")
                isOkay = False
                break
        return isOkay
      
    safe = 0 
    safeReports = []
    for rep in reports:
        if funcIsOkay(rep):
            safe += 1
            safeReports.append(rep)
            
    print(f"Star 1= {safe}")

    safe = 0 
    safeReports = []
    for rep in reports:
        if funcIsOkay(rep):
            safe += 1
            safeReports.append(rep)
        else:
            for i in range(len(rep)):
                c = copy.deepcopy(rep)
                c.pop(i)
                if funcIsOkay(c):
                    safe += 1
                    safeReports.append(rep)
                    break            
    print(f"Star 2= {safe}")

code("2_test.txt")
code("2.txt")