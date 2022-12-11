
from django.urls import path
from rest_framework import routers
from django.contrib import admin
from dashboardApi.views import ComputersViewSet, OperationalRatioView, LifetimeView, LaptopsViewSet
from dashboardApi.views import LifetimeTopFiveView, IncidentView, MostIncidentView
from dashboardApi.views import NotWorkingView

router = routers.DefaultRouter()                                                                       
urlpatterns = router.urls

pc_list = ComputersViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

pc_detail = ComputersViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

laptop_list = LaptopsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

laptop_detail = LaptopsViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

# add regular views to the urlpatterns array
urlpatterns += [
    path('api/computers/', pc_list, name='computer-list'),
    path('api/computers/<uuid:pk>/', pc_detail, name='computer-detail'),
    path('api/laptops/', laptop_list, name='laptop-list'),
    path('api/laptops/<uuid:pk>/', laptop_detail, name='laptop-detail'),
    path("api/operationalratio/", OperationalRatioView.as_view(), name="operationalratio"),
    path("api/incident/", IncidentView.as_view(), name="incident"),
    path("api/most-incident/", MostIncidentView.as_view(), name="most-incident"),
    path("api/lifetime/", LifetimeView.as_view(), name="lifetime"),
    path("api/lifetime-top-five/", LifetimeTopFiveView.as_view(), name="lifetime-top-five"),
    path("api/not-working/", NotWorkingView.as_view(), name="not-working"),
    path('admin/', admin.site.urls),
]