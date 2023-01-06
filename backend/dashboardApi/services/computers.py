from dashboardApi.models import Computer
import json
from django.db.models import Count, Case, When, IntegerField, Avg
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers

class ComputerAPI():
    def __init__(self):
        super().__init__()
    
    def search(self):
        qs = Computer.objects.all()
        qs_json = serializers.serialize('json', qs)
        return qs_json
    
    def inactive_computers_by_model(self, filters):
        qs = Computer.objects.filter(*filters, incident_state = "Incident").values('model', 'vendor').annotate(count=Count('pk')).order_by()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    
    def avg_energy(self, filters):
        if filters:
            qs = Computer.objects.filter(*filters).values('model').annotate(Avg('energy_consumption')).order_by()
        else:
            qs = Computer.objects.values('vendor').annotate(Avg('energy_consumption')).order_by()
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json
    
    def incident_computers_by_model(self, filters):
        qs = Computer.objects.filter(*filters).values('model').annotate(innactive=Count(Case(When(incident_state='Incident', then=1),output_field=IntegerField(),)),count=Count('pk')).order_by('-innactive')
        qs_json = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return qs_json

def get_computers():
    api = ComputerAPI()
    return api.search()

def get_inactive_computers_by_model(filters):
    api = ComputerAPI()
    return api.inactive_computers_by_model(filters)

def get_incident_computers_by_model(filters):
    api = ComputerAPI()
    return api.incident_computers_by_model(filters)

def get_avg_energy(filters):
    api = ComputerAPI()
    return api.avg_energy(filters)