
from django.urls import path
from rest_framework import routers
from django.contrib import admin
from dashboardApi.views import ComputersViewSet, OperationalRatioView, LifetimeView

router = routers.DefaultRouter()
router.register(r'api/computers', ComputersViewSet)                                                                         
urlpatterns = router.urls

# add regular views to the urlpatterns array
urlpatterns += [
    path("api/operationalratio/", OperationalRatioView.as_view(), name="operationalratio"),
    path("api/lifetime/", LifetimeView.as_view(), name="lifetime"),
    path('admin/', admin.site.urls),
]