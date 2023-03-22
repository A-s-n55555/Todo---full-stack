from django.contrib import admin
from .models import Todo,TodoAdmin

# class TodoAdmin(admin.ModelAdmin):
#   list = ('title', 'description', 'completed')

admin.site.register(Todo)
# admin.site.register(TodoAdmin)