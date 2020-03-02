def calcSum(pbs):
    sum = 0
    for p in pbs:
        sum += int(p['value'])
    return sum