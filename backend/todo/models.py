from django.db import models
from django.contrib import admin

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
      return self.title


class TodoAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')
