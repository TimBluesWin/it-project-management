

from django.http.response import JsonResponse
from rest_framework.response import Response
from dashboardApi.serializers import ComputerSerializer
from rest_framework import views, status, viewsets
import abc
from dashboardApi.models import Computer
from .services.operationalratio import get_ratio
from .services.average_lifetime import get_lifetime
from .services.incident import get_incident
from .services.incident import get_most_incident

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

class OperationalRatioView(ThroughAPIBaseView):
    def get(self, request):
        words = get_ratio()
        return JsonResponse(words, safe=False)

class LifetimeView(ThroughAPIBaseView):
    def get(self, request):
        words = get_lifetime()
        return JsonResponse(words, safe=False)

class LifetimeTopFiveView(ThroughAPIBaseView):
    def get(self, request):
        words = get_lifetime(5)
        return JsonResponse(words, safe=False)

class IncidentView(ThroughAPIBaseView):
    def get(self, request):
        words = get_incident()
        return JsonResponse(words, safe=False)

class MostIncidentView(ThroughAPIBaseView):
    def get(self, request):
        words = get_most_incident()
        return JsonResponse(words, safe=False)