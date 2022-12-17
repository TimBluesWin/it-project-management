from dashboardApi.models import Laptop
from django.core import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder


class LaptopAPI():
    def __init__(self):
        super().__init__()
    
    def cpu(self):
        qs = Laptop.objects.values('processor').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def operating_system(self):
        qs = Laptop.objects.values('operating_system').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def graphics(self):
        qs = Laptop.objects.values('graphics').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def memory(self):
        qs = Laptop.objects.values('memory').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def storage(self):
        qs = Laptop.objects.values('storage').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def display(self):
        qs = Laptop.objects.values('display').distinct()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json


def get_cpu():
    api = LaptopAPI()
    return api.cpu()

def get_os():
    api = LaptopAPI()
    return api.operating_system()

def get_graphics():
    api = LaptopAPI()
    return api.graphics()

def get_memory():
    api = LaptopAPI()
    return api.memory()

def get_storage():
    api = LaptopAPI()
    return api.storage()

def get_display():
    api = LaptopAPI()
    return api.display()