from django.contrib import admin

# Register your models here.

from .models import File, Purchase, Review


admin.site.register(File)
admin.site.register(Purchase)
admin.site.register(Review)
