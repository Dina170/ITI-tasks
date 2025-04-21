from QueueOutOfRangeException import QueueOutOfRangeException
from file_helpers import read_file, write_file
from os import path


class Queue:
    fileName = "queues.json"
    objects = {}
    def __init__(self, name, size):
        self.name = name
        self.size = size
        self.data = []
        self.front = self.rear = -1
        Queue.objects[name] = []

    def is_empty(self):
        return self.front == -1 
    
    def is_full(self):
        return self.rear == self.size - 1

    def insert(self, value):
        if self.is_full():
            raise QueueOutOfRangeException("queue is full")
        self.rear += 1
        if self.is_empty():
            self.front += 1
        self.data.append(value)
        Queue.objects[self.name] = self.data[self.front:self.rear + 1]
        Queue.save()
        
    def pop(self):
        if self.is_empty():
            print("queue is empty")
            return
        
        tmp = self.data[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
            Queue.objects[self.name] = []
        else:
            self.front += 1
            Queue.objects[self.name] = self.data[self.front:self.rear + 1]
            Queue.save()
        return tmp
    
    @staticmethod
    def save():
        write_file(Queue.fileName, Queue.objects)
        
    @staticmethod
    def load():
        if path.exists(Queue.fileName):
            Queue.objects = read_file(Queue.fileName)
        
    def print(self):
        if self.is_empty():
            print("queue is empty")
            return
        for i in range(self.front, self.rear+1):
            print(self.data[i])
        
        
q1 = Queue("test", 3)
q2 = Queue("test2", 3)
q3 = Queue("test4", 3)
Queue.load()

q1.insert(2)
q1.insert(3)
q1.insert(4)
q2.insert(5)
q3.insert(40)
q3.insert(55)
q1.print()
print("----------")
q1.pop()
q1.pop()
q1.pop()
q1.print()
print(Queue.objects)