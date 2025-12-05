# Reading files

- Strings are iterable.  You don't need to `list(stringVar)`

# For loops

- Instead of `for i in range(len(raw_data)):`, you can `for i, char in enumerate(raw_data):`
	- If you want to start at something other than 1 for an offset: `for i, char in enumerate(raw_data, 1):`