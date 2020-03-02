def calcSum(pbs):
# Calculating sums for each entries in pbs. Check included for int numbers.
    sum = 0
    for p in pbs:
        try:
            pVal = int(p['value'])
            sum += pVal
        except ValueError:
            pass        
    return sum