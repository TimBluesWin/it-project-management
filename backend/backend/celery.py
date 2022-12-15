

import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


app.conf.beat_schedule = {
    'schedule-extract_laptops': {
        'task': 'extract_laptops',
        'schedule': crontab(day_of_week=1),
    },
    'extract_footprints': {
        'task': 'extract_footprints',
        'schedule': crontab(day_of_week = 2),
    },
}

