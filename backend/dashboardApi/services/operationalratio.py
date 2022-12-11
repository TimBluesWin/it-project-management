from dashboardApi.models import Computer

class OperationalRatioAPI():
    def __init__(self):
        super().__init__()
    
    def search(self):
        inactive_pc = Computer.objects.filter(incident_state = "Incident").count()
        active_pc = Computer.objects.filter(incident_state = "Operational").count()
        operational_ratio = {
            "active": active_pc,
            "inactive": inactive_pc
        }
        return operational_ratio

def get_ratio():
    api = OperationalRatioAPI()
    return api.search()