from dashboardApi.models import Computer
from django.core import serializers
from django.db.models import Count
import json
from django.core.serializers.json import DjangoJSONEncoder

class OperationalRatioAPI():
    def __init__(self):
        super().__init__()
    
    def search(self):
        inactive_pc = Computer.objects.filter(incident_state = "Incident")
        qs_json = serializers.serialize('json', inactive_pc)
        return qs_json

    def most_incident(self):
        qs = Computer.objects.filter(incident_state = "Incident").values('vendor', 'model').order_by('vendor').annotate(dcount=Count('model'))
        serialized_q = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return serialized_q

def get_incident():
    api = OperationalRatioAPI()
    return api.search()

def get_most_incident():
    api = OperationalRatioAPI()
    return api.most_incident()