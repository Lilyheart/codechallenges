import os
import re
import shapely

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 50,
        "2": 24
    },
    "actual": {
        "1": 4777824480,
        "2": 1542119040
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
        raw_data = [tuple(map(int, line.split(","))) for line in input_values]
        
    # debug(raw_data)
    areasWithTiles = set()
    
    for i, tile1 in enumerate(raw_data):
        for tile2 in raw_data[i+1:]:
            area = (abs(tile1[0] - tile2[0]) + 1) * (abs(tile1[1] - tile2[1]) + 1)
            areasWithTiles.add((area, tile1, tile2))
        
    edges = [] # reminder - sets are not ordered
    for i, edge in enumerate(raw_data):
        edges.append((edge, raw_data[(i+1) % len(raw_data)]))
        
    pip_cache = {point: True for point in raw_data}
    def pip(point):
        if point in pip_cache:
            return pip_cache[point]
        x, y = point

        crosses = 0
        for edge1, edge2 in edges:
            x1, y1 = edge1
            x2, y2 = edge2
            
            if (y - y1) * (x2 - x1) - (x - x1) * (y2 - y1) == 0 and (min(x1, x2) <= x <= max(x1, x2)) and (min(y1, y2) <= y <= max(y1, y2)):
                pip_cache[point] = True
                return pip_cache[point]
            
            if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1) + x1):
                crosses += 1
              
        pip_cache[point] = crosses % 2 == 1
        return pip_cache[point]         
    
    maxArea = None
    
    for area, tile1, tile2 in sorted(areasWithTiles, key=lambda x: x[0], reverse=True):
        tile3 = (tile1[0], tile2[1])
        tile4 = (tile2[0], tile1[1])
        
        if not (pip(tile3) and pip(tile4)):
            continue
        
        rec_edges = [(tile1, tile3), (tile3, tile2), (tile2, tile4), (tile4, tile1)]
        
        inside = True
        
        for rec_a, rec_b in rec_edges:
            for poly_a, poly_b in edges:
                side_a = (poly_b[0] - poly_a[0]) * (rec_a[1] - poly_a[1]) - (poly_b[1] - poly_a[1]) * (rec_a[0] - poly_a[0])
                side_b = (poly_b[0] - poly_a[0]) * (rec_b[1] - poly_a[1]) - (poly_b[1] - poly_a[1]) * (rec_b[0] - poly_a[0])
                side_c = (rec_b[0] - rec_a[0])   * (poly_a[1] - rec_a[1]) - (rec_b[1] - rec_a[1])   * (poly_a[0] - rec_a[0])
                side_d = (rec_b[0] - rec_a[0])   * (poly_b[1] - rec_a[1]) - (rec_b[1] - rec_a[1])   * (poly_b[0] - rec_a[0])
                
                if side_c * side_d < 0 and side_a * side_b < 0:
                    inside = False
                    break
            if not inside:
                break
        if inside:
            maxArea = area
            break

    testStar(file, "1", max(area for (area, _, _) in areasWithTiles))
    testStar(file, "2", maxArea)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")