# Reading files

- Strings are iterable.  You don't need to `list(stringVar)`
- Converting to in: `list(map(int, line))`

# For loops

- Instead of `for i in range(len(raw_data)):`, you can `for i, char in enumerate(raw_data):`
	- If you want to start at something other than 1 for an offset: `for i, char in enumerate(raw_data, 1):`

# General cleanliness

- If using min and/or max multiple times, does it make sense to sort first and use top/bottom instead?