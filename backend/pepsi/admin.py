from django.contrib import admin
from .models import Business
# Register your models here.

class PepsiAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'location')

admin.site.register(Business, PepsiAdmin)