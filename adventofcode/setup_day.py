#!/usr/bin/env python3
"""
Script to set up a new Advent of Code day by copying the template
and creating the necessary input files.
"""

import os
import shutil
from datetime import datetime

def setup_day():
    # Get current date
    now = datetime.now()
    current_year = now.year
    current_month = now.month
    current_day = now.day
    
    # Get year (default to current year)
    year_input = input(f"Enter year (default: {current_year}): ").strip()
    year = int(year_input) if year_input else current_year
    
    # Get day (default to current day if December, otherwise prompt)
    if current_month == 12:
        day_input = input(f"Enter day (default: {current_day}): ").strip()
        day = int(day_input) if day_input else current_day
    else:
        day_input = input("Enter day: ").strip()
        if not day_input:
            print("Day is required (not December)")
            return
        day = int(day_input)
    
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_file = os.path.join(base_dir, "day_0.py")
    year_dir = os.path.join(base_dir, str(year))
    day_file = os.path.join(year_dir, f"day_{day}.py")
    input_dir = os.path.join(year_dir, "input")
    test_file = os.path.join(input_dir, f"{day}_test.txt")
    actual_file = os.path.join(input_dir, f"{day}.txt")
    
    # Create year directory if it doesn't exist
    os.makedirs(year_dir, exist_ok=True)
    
    # Create input directory if it doesn't exist
    os.makedirs(input_dir, exist_ok=True)
    
    # Check if day file already exists and copy if needed
    if os.path.exists(day_file):
        response = input(f"day_{day}.py already exists. Overwrite? (y/N): ").strip().lower()
        if response == 'y':
            shutil.copy2(template_file, day_file)
            print(f"✓ Overwritten {year}/day_{day}.py")
        else:
            print(f"  Skipped {year}/day_{day}.py (already exists)")
    else:
        # Copy template to day file
        shutil.copy2(template_file, day_file)
        print(f"✓ Created {year}/day_{day}.py")
    
    # Create input files if they don't exist
    if not os.path.exists(test_file):
        with open(test_file, 'w') as f:
            pass
        print(f"✓ Created {year}/input/{day}_test.txt")
    else:
        print(f"  {year}/input/{day}_test.txt already exists")
    
    if not os.path.exists(actual_file):
        with open(actual_file, 'w') as f:
            pass
        print(f"✓ Created {year}/input/{day}.txt")
    else:
        print(f"  {year}/input/{day}.txt already exists")
    
    print(f"\n✓ Setup complete for day {day}, year {year}!")

if __name__ == "__main__":
    setup_day()

