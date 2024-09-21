from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Intersection, Safety, Efficiency, Environmental
from .serializers import (
    SafetySerializer,
    IntersectionSerializer,
    EfficiencySerializer,
    IntersectionCreateSerializer,
    EnvironmentalSerializer,
)


class IntersectionCreateView(generics.CreateAPIView):
    queryset = Intersection.objects.all()
    serializer_class = IntersectionCreateSerializer


class IntersectionView(generics.RetrieveAPIView):
    queryset = Intersection.objects.all()
    serializer_class = IntersectionSerializer
    lookup_field = "intersection_id"


class IntersectionEventUpdateView(APIView):
    def post(self, request, intersection_id):
        try:
            intersection = Intersection.objects.get(intersection_id=intersection_id)
        except Intersection.DoesNotExist:
            return Response(
                {"error": "Intersection not found."}, status=status.HTTP_404_NOT_FOUND
            )

        safety, _ = Safety.objects.get_or_create(intersection=intersection)
        safety.update_safety(request.data)

        efficiency, _ = Efficiency.objects.get_or_create(intersection=intersection)

        is_school_hours = request.data.get("is_school_hours", False)
        is_near_school = request.data.get("is_near_school", False)
        efficiency.update_efficiency(request.data, is_school_hours, is_near_school)

        environmental, _ = Environmental.objects.get_or_create(intersection=intersection)
        environmental.update_environmental(request.data)

        safety_serializer = SafetySerializer(safety)
        efficiency_serializer = EfficiencySerializer(efficiency)
        environmental_serializer = EnvironmentalSerializer(environmental)
        return Response(
            {
                "safety": safety_serializer.data,
                "efficiency": efficiency_serializer.data,
                "environmental": environmental_serializer.data,
            },
            status=status.HTTP_200_OK,
        )
