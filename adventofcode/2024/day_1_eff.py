import os
from collections import Counter

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as f:
        left, right = zip(*(map(int, line.split()) for line in f))

    left = sorted(left)
    right = sorted(right)

    sum_diff = sum(abs(l - r) for l, r in zip(left, right))
    print(f"Star 1= {sum_diff}")

    counts = Counter(right)
    sum_diff_weight = sum(l * counts.get(l, 0) for l in left)
    print(f"Star 2= {sum_diff_weight}")

code("1_test.txt")
code("1.txt")