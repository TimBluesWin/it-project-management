from dashboardApi.models import Laptop
from django.core import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.functions import DenseRank
from django.db.models import F, ExpressionWrapper, FloatField
from django.db.models.expressions import RawSQL


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

    def best_green_laptop(self, memory):
        # Steps:
        # Get all the ids. This will be stored in id_dictionaries variables
        id_dictionaries = []
        laptops_ranked = Laptop.objects.annotate(
            carbon_rank=RawSQL("RANK() OVER(ORDER BY carbon_footprint ASC NULLS LAST)", []),
            energy_rank=RawSQL("RANK() OVER(ORDER BY energy_consumption ASC NULLS LAST)", []),
            lifetime_rank=RawSQL("RANK() OVER(ORDER BY average_lifetime ASC NULLS LAST)", []),
            greenness_rank=ExpressionWrapper(0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank'), output_field=FloatField())
        ).order_by('greenness_rank').values('id', 'memory', 'carbon_footprint', 'energy_consumption', 'average_lifetime', 'carbon_rank', 'energy_rank', 'lifetime_rank', 'greenness_rank')
        if(memory):
            laptops_ranked = laptops_ranked.filter(memory__startswith=memory)
        qs_json = json.dumps(list(laptops_ranked), cls=DjangoJSONEncoder)
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

def get_best_green_laptop(memory):
    api = LaptopAPI()
    return api.best_green_laptop(memory)