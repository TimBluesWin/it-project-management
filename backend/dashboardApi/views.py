

from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q
from dashboardApi.serializers import ComputerSerializer, LaptopSerializer
from rest_framework import views, status, viewsets
import abc
from dashboardApi.models import Computer, Laptop
from .services.computers import get_inactive_computers_by_model, get_incident_computers_by_model, get_avg_energy, get_brands, get_avg_energy_model
from .services.operationalratio import get_ratio
from .services.average_lifetime import get_lifetime, get_lifetime_model
from .services.incident import get_incident, get_most_incident, get_not_working, get_working, get_not_working_model
from .services.laptops import get_best_overall, get_cheapest, get_cpu, get_display, get_graphics, get_memory, get_os, get_storage, get_best_green_laptop

class ThroughAPIBaseView(views.APIView):
    response_viewset = None

    @abc.abstractmethod
    def get_token(self, *args, **kwargs):
        return None

    def get(self, request, *args, **kwargs):
        params = self.request.query_params.dict()
        response = {}
        if self.response_viewset:
            response = self.response_viewset.as_view()(
                request=request._request, *args, **kwargs
            ).data
        return Response(response, status=status.HTTP_200_OK)


class ComputersViewSet(viewsets.ModelViewSet):
    serializer_class = ComputerSerializer
    queryset = Computer.objects.all()

class LaptopsViewSet(viewsets.ModelViewSet):
    serializer_class = LaptopSerializer
    queryset = Laptop.objects.all()

class OperationalRatioView(ThroughAPIBaseView):
    def get(self, request):
        words = get_ratio()
        return JsonResponse(words, safe=False)

class LifetimeView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('brand', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_lifetime(filters)
        return JsonResponse(words, safe=False)

class LifetimeModelView(ThroughAPIBaseView):
    def get(self, request):
        words = get_lifetime_model()
        return JsonResponse(words, safe=False)

class LifetimeTopFiveView(ThroughAPIBaseView):
    def get(self, request):
        words = get_lifetime([], 5)
        return JsonResponse(words, safe=False)

class IncidentView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('brand', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_incident(filters)
        return JsonResponse(words, safe=False)

class MostIncidentView(ThroughAPIBaseView):
    def get(self, request):
        words = get_most_incident()
        return JsonResponse(words, safe=False)

class NotWorkingView(ThroughAPIBaseView):
    def get(self, request):
        words = get_not_working()
        return JsonResponse(words, safe=False)

class NotWorkingModelView(ThroughAPIBaseView):
    def get(self, request):
        words = get_not_working_model()
        return JsonResponse(words, safe=False)

class WorkingView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('brand', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_working(filters)
        return JsonResponse(words, safe=False)

class InactiveBrandCountView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('vendor', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_inactive_computers_by_model(filters)
        return JsonResponse(words, safe=False)

class IncidentBrandCountView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('vendor', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_incident_computers_by_model(filters)
        return JsonResponse(words, safe=False)

class AVGEnergyView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('vendor', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_avg_energy(filters)
        return JsonResponse(words, safe=False)

class AVGEnergyModelView(ThroughAPIBaseView):
    def get(self, request):
        words = get_avg_energy_model()
        return JsonResponse(words, safe=False)

class CPUView(ThroughAPIBaseView):
    def get(self, request):
        words = get_cpu()
        return JsonResponse(words, safe=False)

class StorageView(ThroughAPIBaseView):
    def get(self, request):
        words = get_storage()
        return JsonResponse(words, safe=False)

class DisplayView(ThroughAPIBaseView):
    def get(self, request):
        words = get_display()
        return JsonResponse(words, safe=False)

class GraphicsView(ThroughAPIBaseView):
    def get(self, request):
        words = get_graphics()
        return JsonResponse(words, safe=False)

class MemoryView(ThroughAPIBaseView):
    def get(self, request):
        words = get_memory()
        return JsonResponse(words, safe=False)

class OSView(ThroughAPIBaseView):
    def get(self, request):
        words = get_os()
        return JsonResponse(words, safe=False)

class BrandView(ThroughAPIBaseView):
    def get(self, request):
        words = get_brands()
        return JsonResponse(words, safe=False)

class GreenLaptopView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        memory = self.request.GET.getlist('memory', None)
        display = self.request.GET.getlist('display', None)
        processor = self.request.GET.getlist('processor', None)
        ops_sys = self.request.GET.getlist('operating_system', None)
        storage = self.request.GET.getlist('storage', None)
        graphics = self.request.GET.getlist('graphics', None)
        if memory :
            filters.append(Q(memory__in=memory))
        if display :
            filters.append(Q(display__in=display))
        if processor :
            filters.append(Q(processor__in=processor))
        if ops_sys :
            filters.append(Q(operating_system__in=ops_sys))
        if storage :
            filters.append(Q(storage__in=storage))
        if graphics :
            filters.append(Q(graphics__icontains=graphics))
        words = get_best_green_laptop(filters)
        return JsonResponse(words, safe=False)

class CheapestLaptopView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        memory = self.request.GET.getlist('memory', None)
        display = self.request.GET.getlist('display', None)
        processor = self.request.GET.getlist('processor', None)
        ops_sys = self.request.GET.getlist('operating_system', None)
        storage = self.request.GET.getlist('storage', None)
        graphics = self.request.GET.getlist('graphics', None)
        if memory :
            print(memory)
            filters.append(Q(memory__in=memory))
        if display :
            filters.append(Q(display__in=display))
        if processor :
            filters.append(Q(processor__in=processor))
        if ops_sys :
            filters.append(Q(operating_system__in=ops_sys))
        if storage :
            filters.append(Q(storage__in=storage))
        if graphics :
            filters.append(Q(graphics__in=graphics))
        words = get_cheapest(filters)
        return JsonResponse(words, safe=False)

class OverallLaptopView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        memory = self.request.GET.getlist('memory', None)
        display = self.request.GET.getlist('display', None)
        processor = self.request.GET.getlist('processor', None)
        ops_sys = self.request.GET.getlist('operating_system', None)
        storage = self.request.GET.getlist('storage', None)
        graphics = self.request.GET.getlist('graphics', None)
        if memory :
            filters.append(Q(memory__in=memory))
        if display :
            filters.append(Q(display__in=display))
        if processor :
            filters.append(Q(processor__in=processor))
        if ops_sys :
            filters.append(Q(operating_system__in=ops_sys))
        if storage :
            filters.append(Q(storage__in=storage))
        if graphics :
            filters.append(Q(graphics__in=graphics))
        words = get_best_overall(filters)
        return JsonResponse(words, safe=False)
        

class FilterLaptopView(generics.ListAPIView):
    serializer_class = LaptopSerializer

    def get_queryset(self):
        queryset = Laptop.objects.all()
        filters = []
        memory = self.request.GET.getlist('memory', None)
        display = self.request.GET.getlist('display', None)
        processor = self.request.GET.getlist('processor', None)
        ops_sys = self.request.GET.getlist('operating_system', None)
        storage = self.request.GET.getlist('storage', None)
        graphics = self.request.GET.getlist('graphics', None)
        if memory :
            filters.append(Q(memory__in=memory))
        if display :
            filters.append(Q(display__in=display))
        if processor :
            filters.append(Q(processor__in=processor))
        if ops_sys :
            filters.append(Q(ops_sys__in=ops_sys))
        if storage :
            filters.append(Q(storage__in=storage))
        if graphics :
            filters.append(Q(graphics__in=graphics))
        return queryset.filter(*filters)
