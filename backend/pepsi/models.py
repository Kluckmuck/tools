from django.db import models

# Create your models here.
class Business(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    location = models.TextField()

    def __str__(self):
        return self.name