import django, os, csv
from datetime import datetime
django.setup()
from dashboardApi.models import Computer
def main():    
    with open("computers.csv", "r") as f:
        reader = csv.reader(f, delimiter=";")
        for row in reader:
            if row[8]:
                old_date=row[8]
                new_date=datetime.strptime(old_date, '%d/%m/%Y').strftime('%Y-%m-%d')
            else:
                new_date=None
            if row[9]:
                old_install=row[9]
                new_install=datetime.strptime(old_install, '%d/%m/%Y').strftime('%Y-%m-%d')
            else:
                new_install=None
            try:
                Computer.objects.create(
                        id = row[0], deployment_state = row[1],
                        incident_state = row[2],
                        vendor = row[3],
                        model = row[4],
                        type = row[5],
                        property = row[6],
                        site = row[7],
                        warranty = new_date,
                        install = new_install,
                        asignment = row[10],
                        cpu = row[11])
            except:
                continue
if __name__ == "__main__":    
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")    
    main()