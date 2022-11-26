from django.db import models

# Create your models here.
class Computer(models.Model):
    id = models.CharField(unique=True, primary_key=True, max_length=50)
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
        return self.id