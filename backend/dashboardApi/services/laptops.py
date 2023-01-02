from dashboardApi.models import Laptop
from django.core import serializers
import json
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.functions import DenseRank
from django.db.models import F, ExpressionWrapper, FloatField
from django.db.models.expressions import RawSQL


class LaptopAPI():
    def __init__(self):
        super().__init__()
    
    def cpu(self):
        qs = Laptop.objects.values('processor').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def operating_system(self):
        qs = Laptop.objects.values('operating_system').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def graphics(self):
        qs = Laptop.objects.values('graphics').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def memory(self):
        qs = Laptop.objects.values('memory').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def storage(self):
        qs = Laptop.objects.values('storage').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    def display(self):
        qs = Laptop.objects.values('display').annotate(count=Count('pk')).order_by('-count')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json

    def best_green_laptop(self, filters):
        # Steps:
        # Get all the ids. This will be stored in id_dictionaries variables
        laptops_ranked = Laptop.objects.filter(*filters).annotate(
            carbon_rank=RawSQL("RANK() OVER(ORDER BY carbon_footprint ASC NULLS LAST)", []),
            energy_rank=RawSQL("RANK() OVER(ORDER BY energy_consumption ASC NULLS LAST)", []),
            lifetime_rank=RawSQL("RANK() OVER(ORDER BY average_lifetime ASC NULLS LAST)", []),
            greenness_rank=ExpressionWrapper(0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank'), output_field=FloatField()),
            overall = ExpressionWrapper((0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank')) * 0.55 +  F('price') * 0.45, output_field=FloatField())
        ).order_by('greenness_rank').values('id', 'processor', 'operating_system', 'graphics', 'memory', 'storage', 'carbon_footprint', 'display', 'image', 'energy_consumption', 'average_lifetime', 'carbon_rank', 'energy_rank', 'lifetime_rank', 'greenness_rank', 'overall', 'price')
        qs_json = json.dumps(list(laptops_ranked), cls=DjangoJSONEncoder)
        return qs_json
        
    def cheapest_laptop(self, filters):
        # Steps:
        # Get all the ids. This will be stored in id_dictionaries variables
        laptops_ranked = Laptop.objects.filter(*filters).annotate(
            carbon_rank=RawSQL("RANK() OVER(ORDER BY carbon_footprint ASC NULLS LAST)", []),
            energy_rank=RawSQL("RANK() OVER(ORDER BY energy_consumption ASC NULLS LAST)", []),
            lifetime_rank=RawSQL("RANK() OVER(ORDER BY average_lifetime ASC NULLS LAST)", []),
            greenness_rank=ExpressionWrapper(0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank'), output_field=FloatField()),
            overall = ExpressionWrapper((0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank')) * 0.55 +  F('price') * 0.45, output_field=FloatField())
        ).order_by('price').values('id', 'processor', 'operating_system', 'graphics', 'memory', 'storage', 'carbon_footprint', 'display', 'image', 'energy_consumption', 'average_lifetime', 'carbon_rank', 'energy_rank', 'lifetime_rank', 'greenness_rank', 'overall', 'price')
        qs_json = json.dumps(list(laptops_ranked), cls=DjangoJSONEncoder)
        return qs_json
        
    def best_overall_option(self, filters):
        # Steps:
        # Get all the ids. This will be stored in id_dictionaries variables
        laptops_ranked = Laptop.objects.filter(*filters).annotate(
            carbon_rank=RawSQL("RANK() OVER(ORDER BY carbon_footprint ASC NULLS LAST)", []),
            energy_rank=RawSQL("RANK() OVER(ORDER BY energy_consumption ASC NULLS LAST)", []),
            lifetime_rank=RawSQL("RANK() OVER(ORDER BY average_lifetime ASC NULLS LAST)", []),
            greenness_rank=ExpressionWrapper(0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank'), output_field=FloatField()),
            overall = ExpressionWrapper((0.5 * F('carbon_rank') + 0.2 * F('energy_rank') + 0.3 * F('lifetime_rank')) * 0.55 +  F('price') * 0.45, output_field=FloatField())
        ).order_by('overall').values('id', 'processor', 'operating_system', 'graphics', 'memory', 'storage', 'carbon_footprint', 'display', 'image', 'energy_consumption', 'average_lifetime', 'carbon_rank', 'energy_rank', 'lifetime_rank', 'greenness_rank', 'overall', 'price')
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

def get_best_green_laptop(filters):
    api = LaptopAPI()
    return api.best_green_laptop(filters)

def get_cheapest(filters):
    api = LaptopAPI()
    return api.cheapest_laptop(filters)

def get_best_overall(filters):
    api = LaptopAPI()
    return api.best_overall_option(filters)