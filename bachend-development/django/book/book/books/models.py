from django.db import models
from django.utils import timezone


# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    

class Book(models.Model):
    name = models.CharField(max_length=100)
    publish_date = models.DateField()
    add_to_site_at = models.DateTimeField(default=timezone.now)
    price = models.FloatField()
    appropriate = models.CharField(choices=[
        ('under_8', 'under 8'),
        ('8-15', '8-15'),
        ('adults', 'adults')
    ], default='8-15')
    image = models.ImageField(default='default.jpg', upload_to='book_pics')
    description = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

    
