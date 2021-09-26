from django.contrib import admin
from .models import Company
# Register your models here.


class PepsiAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'location')


admin.site.register(Company, PepsiAdmin)
