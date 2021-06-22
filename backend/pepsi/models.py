from django.db import models

# Create your models here.
class Business(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    location = models.TextField()

    def __str__(self):
        return self.name


class Booking(models.Model):
    PENDING = 'PN'
    ACCEPTED = 'AC'
    DENIED = 'DN'
    BOOKING_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DENIED, 'Denied')
    ] 
    createdDate = models.DateTimeField(auto_now_add=True)
    comments = models.CharField(max_length=120)
    location = models.TextField()
    date = models.DateTimeField()
    operator = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=2, choices=BOOKING_STATUS_CHOICES,default=PENDING)

    def __str__(self):
        return self.comments
    
    def accept_booking(self):
        self.status = self.ACCEPTED
        self.save()

    def deny_booking(self):
        self.status = self.DENIED
        self.save()