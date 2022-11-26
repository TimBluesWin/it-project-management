import django, os, csv
from datetime import datetime
django.setup()
from dashboardApi.models import Computer
def main():    
    with open("computers.csv", "r") as f:
        reader = csv.reader(f, delimiter=";")
        for row in reader:
            Computer.objects.create(
                    id = row[0], deployment_state = row[1],
                    incident_state = row[2],
                    vendor = row[3],
                    model = row[4],
                    type = row[5],
                    property = row[6],
                    site = row[7],
                    warranty = row[8],
                    install = row[9],
                    asignment = row[10],
                    cpu = row[11])
if __name__ == "__main__":    
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")    
    main()