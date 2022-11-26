from django.contrib import admin
from .models import Computer
from import_export.admin import ImportExportModelAdmin

class ComputerAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    model = Computer
    list_display = [field.name for field in Computer._meta.get_fields()]
    resource_classes = [Computer]

admin.site.register(Computer, ComputerAdmin)
