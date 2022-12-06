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