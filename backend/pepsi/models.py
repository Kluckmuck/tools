from django.db import models

# Create your models here.
class Business(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    location = models.TextField()

    def __str__(self):
        return self.name

class Booking(models.Model):
    createdDate = models.DateTimeField(auto_now_add=True)
    comments = models.CharField(max_length=120)
    location = models.TextField()
    date = models.DateTimeField()
    operator = models.ForeignKey("Business", on_delete=models.CASCADE)

    def __str__(self):
        return self.comments

