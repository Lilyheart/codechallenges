import os
import re
import itertools
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 7,
        "2": 33
    },
    "actual": {
        "1": 473,
        "2": 18681
    }
}

def debug(input, divider=0, divchar="="):
    if type(input) == dict:
        for key, value in input.items():
            print(f"{key}: {value}")
    elif type(input) == list:
        for value in input:
            print(f"{value}")
    else:
        print(input)
    if divider > 0:
        print(divchar * divider)
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
        raw_data = [line.strip().split(" ") for line in input_values.read().split("\n")]
        
    # debug(raw_data, 30)
        
    machines = []
    
    for line in raw_data:
        new_line = {"fewest_on": None, "fewest_jolts": None, "fewest_joltsBF": None}
        new_line["lights"] = list(line[0][1:-1])
        new_line["buttons"] = list(list(map(int, wiring[1:-1].split(","))) for wiring in line[1:-1])
        new_line["joltage"]= list(map(int, line[-1][1:-1].split(",")))
        machines.append(new_line)
        
    # debug(machines, 20)
    
    ## PART 1
    
    def press_buttons_1(to_press, num_lights, buttons):
        lights = [0] * num_lights
        for i, pressed in enumerate(to_press):
            if int(pressed) > 0:
                for light in buttons[i]:
                    lights[light] ^= 1
        return ["#" if c == 1 else "." for c in lights]
    
    # light_cache = {}
    # lights = press_buttons_1("100000", 4, machines[0]["buttons"])
    # debug(f"{"".join(lights)} expected ...#")
    # lights = press_buttons_1("110000", 4, machines[0]["buttons"])
    # debug(f"{"".join(lights)} expected .#..")
    # del lights, light_cache
            
    for machine in machines:
        buttons_num = len(machine["buttons"])

        for height in range(buttons_num+1):
            combos = [''.join('1' if i in pos else '0' for i in range(buttons_num)) for pos in itertools.combinations(range(buttons_num), height)]
            for key in combos:
                lights = press_buttons_1(key, len(machine["lights"]), machine["buttons"])
                # debug(f"{lights}: {machine["lights"]}")
                if lights == machine["lights"]:
                    machine["fewest_on"] = height
                    break
            if machine["fewest_on"] is not None:
                break
    
    # ## PART 2 with libraries
            
    for machine in machines:
        n_buttons = len(machine["buttons"])
        n_counters = len(machine["joltage"])
        
        # which lights are affected by which buttons [e.g., row zero == 0 that index of button doesn't change, 1, it does]
        A = np.zeros((n_counters, n_buttons), dtype=int)
        for i, button in enumerate(machine["buttons"]):
            for j in button:
                A[j][i] = 1
        
        constraints = LinearConstraint(A, lb=np.array(machine["joltage"]), ub=np.array(machine["joltage"]))
        bounds = Bounds(lb=0, ub=np.inf)
        integrality = np.ones(n_buttons)
        result = milp(np.ones(n_buttons), constraints=constraints, bounds=bounds, integrality=integrality)
                
        if result.success:
            machine["fewest_jolts"] = int(round(sum(result.x)))
        else:
            print(f"No solution found for machine: {machine}")
    
    # ## PART 2 with pruning
    
    def join_volt(arr, sep=","):
        return sep.join(map(str, arr))
    
    def press_buttons_2(to_press, buttons, jolts):
        jolts_curr = [0] * len(jolts)
        for i, presses in enumerate(to_press):
            for counter in buttons[i]:
                jolts_curr[counter] += presses
        return jolts_curr
    
    for j, machine in enumerate(machines):
        if "test" not in file:
            break
        debug(f"Solving {j+1} out of {len(machines)}")
        tree = {}
                        
        current_level = {join_volt([0] * len(machine["buttons"]))}
                        
        for height in range(1, 100):
            debug(height)
            
            next_level = set() # while we check for duplicates before pressing buttons, sets is faster for `if in`
            
            for parent in current_level: # for each parent
                pressed = list(map(int, parent.split(",")))
                for i in range(len(pressed)): # for each 
                    new_pressed = pressed[:]
                    new_pressed[i] += 1
                    if join_volt(new_pressed) in next_level:
                        continue
                    jolts = press_buttons_2(new_pressed, machine["buttons"], machine["joltage"])
                    # debug(f"{height} {jolts}: {machine["joltage"]} {new_pressed}")
                    if jolts == machine["joltage"]:
                        machine["fewest_joltsBF"] = height
                        break
                    if all(a <= b for a, b in zip(jolts, machine["joltage"])):
                        next_level.add(join_volt(new_pressed))
                if machine["fewest_joltsBF"] is not None:
                    break
            current_level = next_level
            if machine["fewest_joltsBF"] is not None:
                break
                
    # debug("", 100, "x")
    # debug(machines, 20)
    
    testStar(file, "1", sum(machine["fewest_on"] for machine in machines if machine["fewest_on"] is not None))
    testStar(file, "2", sum(machine["fewest_jolts"] for machine in machines if machine["fewest_jolts"] is not None))
    testStar(file, "2", sum(machine["fewest_joltsBF"] for machine in machines if machine["fewest_joltsBF"] is not None))
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")