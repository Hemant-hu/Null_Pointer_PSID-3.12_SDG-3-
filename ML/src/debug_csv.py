with open("../data/data.csv", "rb") as f:
    first = f.readline()
    print(first[:200])
