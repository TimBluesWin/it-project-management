from dashboardApi.models import Computer
from django.core import serializers

class ComputerAPI():
    def __init__(self):
        super().__init__()
    
    def search(self):
        qs = Computer.objects.all()
        qs_json = serializers.serialize('json', qs)
        return qs_json

def get_computers():
    api = ComputerAPI()
    return api.search()