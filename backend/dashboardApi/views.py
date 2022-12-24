

from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q
from dashboardApi.serializers import ComputerSerializer, LaptopSerializer
from rest_framework import views, status, viewsets
import abc
from dashboardApi.models import Computer, Laptop
from .services.operationalratio import get_ratio
from .services.average_lifetime import get_lifetime
from .services.incident import get_incident, get_most_incident, get_not_working, get_working
from .services.laptops import get_cheapest, get_cpu, get_display, get_graphics, get_memory, get_os, get_storage, get_best_green_laptop

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

class WorkingView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        brand = self.request.query_params.get('brand', None)
        if brand is not None:
            filters.append(Q(vendor__icontains=brand))
        words = get_working(filters)
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

class GreenLaptopView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        memory = self.request.query_params.get('memory', None)
        display = self.request.query_params.get('display', None)
        processor = self.request.query_params.get('processor', None)
        ops_sys = self.request.query_params.get('operating_system', None)
        storage = self.request.query_params.get('storage', None)
        graphics = self.request.query_params.get('graphics', None)
        if memory is not None:
            filters.append(Q(memory__icontains=memory))
        if display is not None:
            filters.append(Q(display__icontains=display))
        if processor is not None:
            filters.append(Q(processor__icontains=processor))
        if ops_sys is not None:
            filters.append(Q(ops_sys__icontains=ops_sys))
        if storage is not None:
            filters.append(Q(storage__icontains=storage))
        if graphics is not None:
            filters.append(Q(graphics__icontains=graphics))
        words = get_best_green_laptop(filters)
        return JsonResponse(words, safe=False)

class CheapestLaptopView(ThroughAPIBaseView):
    def get(self, request):
        filters = []
        memory = self.request.query_params.get('memory', None)
        display = self.request.query_params.get('display', None)
        processor = self.request.query_params.get('processor', None)
        ops_sys = self.request.query_params.get('operating_system', None)
        storage = self.request.query_params.get('storage', None)
        graphics = self.request.query_params.get('graphics', None)
        if memory is not None:
            filters.append(Q(memory__icontains=memory))
        if display is not None:
            filters.append(Q(display__icontains=display))
        if processor is not None:
            filters.append(Q(processor__icontains=processor))
        if ops_sys is not None:
            filters.append(Q(ops_sys__icontains=ops_sys))
        if storage is not None:
            filters.append(Q(storage__icontains=storage))
        if graphics is not None:
            filters.append(Q(graphics__icontains=graphics))
        words = get_cheapest(filters)
        return JsonResponse(words, safe=False)
        

class FilterLaptopView(generics.ListAPIView):
    serializer_class = LaptopSerializer

    def get_queryset(self):
        queryset = Laptop.objects.all()
        filters = []
        memory = self.request.query_params.get('memory', None)
        display = self.request.query_params.get('display', None)
        processor = self.request.query_params.get('processor', None)
        ops_sys = self.request.query_params.get('operating_system', None)
        storage = self.request.query_params.get('storage', None)
        graphics = self.request.query_params.get('graphics', None)
        if memory is not None:
            filters.append(Q(memory__icontains=memory))
        if display is not None:
            filters.append(Q(display__icontains=display))
        if processor is not None:
            filters.append(Q(processor__icontains=processor))
        if ops_sys is not None:
            filters.append(Q(ops_sys__icontains=ops_sys))
        if storage is not None:
            filters.append(Q(storage__icontains=storage))
        if graphics is not None:
            filters.append(Q(graphics__icontains=graphics))
        return queryset.filter(*filters)
