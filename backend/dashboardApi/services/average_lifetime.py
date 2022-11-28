from dashboardApi.models import Computer
from django.db.models import Count, Avg, F, fields
import json
import datetime
from django.core.serializers.json import DjangoJSONEncoder



class LifetimeAPI():
    def __init__(self):
        super().__init__()
    
    def search(self):
        today = datetime.datetime.now().strftime ("%Y-%m-%d")
        qs = Computer.objects.exclude(install__isnull=True).values('vendor', 'model').order_by('vendor').annotate(avg_life=Avg(F('install') - (today), output_field=fields.TextField(), function='ABS'))
        serialized_q = json.dumps(list(qs), cls=DjangoJSONEncoder)
        print(serialized_q)
        return serialized_q

def get_lifetime():
    api = LifetimeAPI()
    return api.search()