
from django.urls import path
from rest_framework import routers
from django.contrib import admin
from dashboardApi.views import OverallLaptopView
from dashboardApi.views import CPUView, MemoryView, DisplayView, OSView, StorageView, GraphicsView, FilterLaptopView, CheapestLaptopView
from dashboardApi.views import ComputersViewSet, OperationalRatioView, LifetimeView, LaptopsViewSet
from dashboardApi.views import LifetimeTopFiveView, IncidentView, MostIncidentView
from dashboardApi.views import NotWorkingView, WorkingView
from dashboardApi.views import GreenLaptopView

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
    path('api/computers/', pc_list, name='computer-list'), #crud computers
    path('api/computers/<uuid:pk>/', pc_detail, name='computer-detail'), #crud computers
    path('api/laptops/', laptop_list, name='laptop-list'),  #crud laptops
    path('api/laptops/<uuid:pk>/', laptop_detail, name='laptop-detail'), #crud laptops
    path("api/operationalratio/", OperationalRatioView.as_view(), name="operationalratio"), #Get count of nonworking and working computers
    path("api/most-incident/", MostIncidentView.as_view(), name="most-incident"), #Most incidents by vendor and model
    path("api/lifetime/", LifetimeView.as_view(), name="lifetime"), #shows models and lifetime
    path("api/lifetime-top-five/", LifetimeTopFiveView.as_view(), name="lifetime-top-five"), #Top 5 most lifetime
    path("api/not-working/", NotWorkingView.as_view(), name="not-working"), #Get count of not working computers by model
    path("api/incident/", IncidentView.as_view(), name="incident"), #Get all innactive computers data
    path("api/working/", WorkingView.as_view(), name="working"), #Get all working computers data
    path("api/cpu/", CPUView.as_view(), name="cpu"), #Get possible components to filter
    path("api/graphics/", GraphicsView.as_view(), name="graphics"), #Get possible components to filter
    path("api/storage/", StorageView.as_view(), name="storage"), #Get possible components to filter
    path("api/memory/", MemoryView.as_view(), name="memory"), #Get possible components to filter
    path("api/display/", DisplayView.as_view(), name="display"), #Get possible components to filter
    path("api/operating_system/", OSView.as_view(), name="operating_system"), #Get possible components to filter
    path("api/filter_laptop/", FilterLaptopView.as_view(), name="filter_laptop"), #Filter laptops based on provided filters
    path("api/best_green_laptop/", GreenLaptopView.as_view(), name="best_green_laptop"), #Filter laptops based on provided filters
    path("api/cheapest_laptop/", CheapestLaptopView.as_view(), name="cheapest_laptop"), #Filter laptops based on provided filters
    path("api/best_overall_laptop/", OverallLaptopView.as_view(), name="best_overall_laptop"), #Filter laptops based on provided filters
    #path("api/best_green_laptop/", GreenLaptopView.as_view(), name="best_green_laptop"), #Filter laptops based on provided filters
    #Example /api/filter_laptop/?processor=11 or /api/filter_laptop/?memory=8&processor=11
    path('admin/', admin.site.urls),
]