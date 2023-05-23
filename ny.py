
def hei(arr: list):
    
    arr2 = arr.copy()
    
    arr2[0][1], arr2[1][1] = arr2[1][1], arr2[0][1]
    
    return arr2



arr = [[1, 2, 3], ["a", "b", "c"]]

arr2 = hei(arr)

print(arr2)
