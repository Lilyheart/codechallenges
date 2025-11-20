import os

def code(file):
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as f:
        reports = [list(map(int, line.split())) for line in f]
    
    def isSafe(report):
        diffs = [report[i+1] - report[i] for i in range(len(report) - 1)]        
        return all(1 <= d <= 3 for d in diffs) or all(-3 <= d <= -1 for d in diffs)
    
    def isSafeDampener(report):
        if isSafe(report):
            return True
        
        for i in range(len(report)):
            modified = report[:i] + report[i+1:]
            if isSafe(modified):
                return True
        
        return False
    
    print(f"Star 1= {sum(isSafe(report) for report in reports)}")
    print(f"Star 2= {sum(isSafeDampener(report) for report in reports)}")

code("2_test.txt")
code("2.txt")