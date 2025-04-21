class Queue:
    def __init__(self):
        self.data = []
        self.front = self.rear = -1

    def is_empty(self):
        return self.front == -1  

    def insert(self, value):
        self.rear += 1
        if self.is_empty():
            self.front += 1
        self.data.append(value)

    def pop(self):
        if self.is_empty():
            print("queue is empty")
            return
        
        tmp = self.data[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front += 1
        return tmp
        
    def print(self):
        if self.is_empty():
            print("queue is empty")
            return
        for i in range(self.front, self.rear+1):
            print(self.data[i])
        
        
# q1 = Queue()
# q1.insert(2)
# q1.insert(3)
# q1.insert(4)
# q1.print()
# print("----------")
# q1.pop()
# q1.pop()
# q1.pop()
# q1.print()