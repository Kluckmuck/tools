from django.db import models
from django.conf import settings

# Create your models here.


class Company(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    location = models.TextField()
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        related_name="companies",
    )

    def claim(self, user: settings.AUTH_USER_MODEL):
        self.owner = user
        self.save()

    def __str__(self):
        return self.name


class Booking(models.Model):
    PENDING = "PN"
    ACCEPTED = "AC"
    DENIED = "DN"
    BOOKING_STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (DENIED, "Denied"),
    ]
    createdDate = models.DateTimeField(auto_now_add=True)
    comments = models.CharField(max_length=120)
    location = models.TextField()
    date = models.DateTimeField()
    operator = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="bookings"
    )
    status = models.CharField(
        max_length=2, choices=BOOKING_STATUS_CHOICES, default=PENDING
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        related_name="bookings",
    )

    def __str__(self):
        return self.comments

    def accept_booking(self):
        self.status = self.ACCEPTED
        self.save()

    def deny_booking(self):
        self.status = self.DENIED
        self.save()


class Message(models.Model):
    booking = models.ForeignKey(
        Booking, on_delete=models.CASCADE, related_name="messages"
    )
    name = models.CharField(max_length=80)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return "Message {} by {}".format(self.body, self.name)
