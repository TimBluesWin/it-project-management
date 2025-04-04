from dashboardApi.models import Computer
from django.db.models import Avg, F, fields
import json
import datetime
from django.core.serializers.json import DjangoJSONEncoder



class LifetimeAPI():
    def __init__(self):
        super().__init__()
    
    def search(self,filters, limit=None):
        today = datetime.datetime.now().strftime ("%Y-%m-%d")
        if filters:
            qs = Computer.objects.filter(*filters).exclude(install__isnull=True).values('model').annotate(avg_life=Avg(F('install') - (today), output_field=fields.TextField(), function='ABS')).order_by('-avg_life')
        else:
            qs = Computer.objects.exclude(install__isnull=True).values('vendor').annotate(avg_life=Avg(F('install') - (today), output_field=fields.TextField(), function='ABS')).order_by('-avg_life')
        if limit is not None:
            qs = qs[:limit]
        serialized_q = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return serialized_q
    
    def get_lifetime_model(self, limit=None):
        today = datetime.datetime.now().strftime ("%Y-%m-%d")
        qs = Computer.objects.exclude(install__isnull=True).values('vendor','model').annotate(avg_life=Avg(F('install') - (today), output_field=fields.TextField(), function='ABS')).order_by('-avg_life')
        if limit is not None:
            qs = qs[:limit]
        serialized_q = json.dumps(list(qs), cls=DjangoJSONEncoder)
        return serialized_q

def get_lifetime(filters, limit=None):
    api = LifetimeAPI()
    return api.search(filters, limit)

def get_lifetime_model(limit=None):
    api = LifetimeAPI()
    return api.get_lifetime_model(limit)