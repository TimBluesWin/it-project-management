from django.db import models
import uuid

# Create your models here.
class Computer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(unique=True, max_length=50)
    deployment_state = models.TextField(max_length=50, blank=True, null=True)
    incident_state = models.TextField(max_length=50,blank=True, null=True)
    vendor = models.TextField(max_length=50,blank=True, null=True)
    model = models.TextField(max_length=50,blank=True, null=True)
    type = models.TextField(max_length=50,blank=True, null=True)
    property = models.TextField(max_length=50,blank=True, null=True)
    site = models.TextField(max_length=50,blank=True, null=True)
    warranty = models.DateField(blank=True, null=True)
    install = models.DateField(blank=True, null=True)
    asignment = models.TextField(max_length=50,blank=True, null=True)
    cpu = models.TextField(max_length=50,blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Laptop(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    processor = models.CharField(max_length=50, blank=True, null=True)
    operating_system = models.CharField(max_length=50, blank=True, null=True)
    graphics = models.CharField(max_length=50, blank=True, null=True)
    memory = models.CharField(max_length=50, blank=True, null=True)
    storage = models.CharField(max_length=50, blank=True, null=True)
    display = models.CharField(max_length=50, blank=True, null=True)
    carbon_footprint = models.IntegerField(blank=True, null=True)
    average_lifetime = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    energy_consumption = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        unique_together = ('name', 'price', 'processor', 'operating_system', 'graphics', 'memory', 'storage', 'display')