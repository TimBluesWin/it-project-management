
from django.urls import path
from rest_framework import routers
from django.contrib import admin
from dashboardApi.views import ComputersViewSet, OperationalRatioView, LifetimeView
from dashboardApi.views import LifetimeTopFiveView, IncidentView, MostIncidentView
from dashboardApi.views import NotWorkingView

router = routers.DefaultRouter()
router.register(r'api/computers', ComputersViewSet)                                                                         
urlpatterns = router.urls

# add regular views to the urlpatterns array
urlpatterns += [
    path("api/operationalratio/", OperationalRatioView.as_view(), name="operationalratio"),
    path("api/incident/", IncidentView.as_view(), name="incident"),
    path("api/most-incident/", MostIncidentView.as_view(), name="most-incident"),
    path("api/lifetime/", LifetimeView.as_view(), name="lifetime"),
    path("api/lifetime-top-five/", LifetimeTopFiveView.as_view(), name="lifetime-top-five"),
    path("api/not-working/", NotWorkingView.as_view(), name="not-working"),
    path('admin/', admin.site.urls),
]