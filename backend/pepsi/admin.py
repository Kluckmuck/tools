from django.contrib import admin
from .models import Booking, Company, Message

# Register your models here.


class PepsiAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "location")


admin.site.register(Company, PepsiAdmin)
# admin.site.register(Booking, PepsiAdmin)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "comments",
        "status",
        "location",
        "createdDate",
        "date",
        "operator",
        "owner",
    )
    list_filter = ("status", "createdDate", "operator")
    search_fields = ("comments", "location")
    actions = ["approve_bookings"]

    def approve_bookings(self, request, queryset):
        queryset.update(active=True)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "body", "booking", "created_on", "active")
    list_filter = ("active", "created_on")
    search_fields = ("name", "email", "body")
    actions = ["approve_messages"]

    def approve_messages(self, request, queryset):
        queryset.update(active=True)
