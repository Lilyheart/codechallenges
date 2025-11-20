import os

with open("input" + os.sep + "1.txt", "r", encoding="utf-8") as input_values:
	raw_data = [line.strip().split(" ") for line in input_values.read().split("\n")]

left = []
right = []

for d in raw_data:
    left.append(int(d[0]))
    right.append(int(d[3]))
    
left.sort()
right.sort()

sumDiff = 0

for i in range(len(left)):
    sumDiff += abs(left[i] - right[i])
    
print(f"Star 1= {sumDiff}")

counts = {}

for r in right:
    if r in counts:
        counts[r] += 1
    else:
        counts[r] = 1

sumDiffWeight = 0

for i in range(len(left)):
    if left[i] in counts:
        sumDiffWeight += left[i] * counts[left[i]]
        
print(f"Star 2= {sumDiffWeight}")    