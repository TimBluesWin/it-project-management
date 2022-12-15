from django.contrib import admin
from .models import Computer, Laptop
from import_export.admin import ImportExportModelAdmin

class ComputerAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    model = Computer
    list_display = [field.name for field in Computer._meta.get_fields()]
    resource_classes = [Computer]

class LaptopAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    model = Laptop
    list_display = [field.name for field in Laptop._meta.get_fields()]
    resource_classes = [Laptop]

admin.site.register(Computer, ComputerAdmin)
admin.site.register(Laptop, LaptopAdmin)
