from django.contrib import admin
from .models import Company, Message

# Register your models here.


class PepsiAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "location")


admin.site.register(Company, PepsiAdmin)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "body", "booking", "created_on", "active")
    list_filter = ("active", "created_on")
    search_fields = ("name", "email", "body")
    actions = ["approve_messages"]

    def approve_messages(self, request, queryset):
        queryset.update(active=True)
