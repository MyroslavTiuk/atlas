from rest_framework import serializers
from .models import Intersection, Safety, Efficiency, Environmental


class SafetySerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    accident_rate = serializers.SerializerMethodField()
    near_misses = serializers.SerializerMethodField()
    speeding = serializers.SerializerMethodField()
    traffic_violations = serializers.SerializerMethodField()
    pedestrian_incidents = serializers.SerializerMethodField()
    damaged_disabled_vehicle = serializers.SerializerMethodField()

    class Meta:
        model = Safety
        fields = (
            "id",
            "points",
            "accident_rate",
            "near_misses",
            "speeding",
            "traffic_violations",
            "pedestrian_incidents",
            "damaged_disabled_vehicle",
        )

    def get_points(self, obj):
        return obj.get_safety_grade()

    def get_total(self, obj):
        return (
            obj.accident_rate
            + obj.near_misses
            + obj.speeding
            + obj.traffic_violations
            + obj.pedestrian_incidents
            + obj.damaged_disabled_vehicle
        )

    def get_percentage(self, value, total):
        if total > 0:
            return round((value / total) * 100, 2)
        return 0

    def get_accident_rate(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.accident_rate, total)

    def get_near_misses(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.near_misses, total)

    def get_speeding(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.speeding, total)

    def get_traffic_violations(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.traffic_violations, total)

    def get_pedestrian_incidents(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.pedestrian_incidents, total)

    def get_damaged_disabled_vehicle(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.damaged_disabled_vehicle, total)


class EfficiencySerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    congestion_level = serializers.SerializerMethodField()
    average_traffic_speed = serializers.SerializerMethodField()
    traffic_volume = serializers.SerializerMethodField()
    signal_timing_efficiency = serializers.SerializerMethodField()
    pedestrian_wait_time = serializers.SerializerMethodField()
    micro_mobility_wait_time = serializers.SerializerMethodField()

    class Meta:
        model = Efficiency
        fields = (
            "id",
            "points",
            "congestion_level",
            "average_traffic_speed",
            "traffic_volume",
            "signal_timing_efficiency",
            "pedestrian_wait_time",
            "micro_mobility_wait_time",
        )

    def get_points(self, obj):
        return obj.get_efficiency_grade()

    def get_total(self, obj):
        return (
            obj.congestion_level
            + obj.average_traffic_speed
            + obj.traffic_volume
            + obj.signal_timing_efficiency
            + obj.pedestrian_wait_time
            + obj.micro_mobility_wait_time
        )

    def get_percentage(self, value, total):
        if total > 0:
            return round((value / total) * 100, 2)
        return 0

    def get_congestion_level(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.congestion_level, total)

    def get_average_traffic_speed(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.average_traffic_speed, total)

    def get_traffic_volume(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.traffic_volume, total)

    def get_signal_timing_efficiency(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.signal_timing_efficiency, total)

    def get_pedestrian_wait_time(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.pedestrian_wait_time, total)

    def get_micro_mobility_wait_time(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.micro_mobility_wait_time, total)


class EnvironmentalSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    vehicle_emissions = serializers.SerializerMethodField()
    fuel_consumption = serializers.SerializerMethodField()
    noise_pollution = serializers.SerializerMethodField()
    air_quality_index = serializers.SerializerMethodField()
    driving_conditions = serializers.SerializerMethodField()

    class Meta:
        model = Environmental
        fields = (
            "id",
            "points",
            "vehicle_emissions",
            "fuel_consumption",
            "noise_pollution",
            "air_quality_index",
            "driving_conditions",
        )

    def get_points(self, obj):
        return obj.get_environmental_grade()

    def get_total(self, obj):
        return (
            obj.vehicle_emissions
            + obj.fuel_consumption
            + obj.noise_pollution
            + obj.air_quality_index
            + obj.driving_conditions
            + obj.fire_detection
        )

    def get_percentage(self, value, total):
        if total > 0:
            return round((value / total) * 100, 2)
        return 0

    def get_vehicle_emissions(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.vehicle_emissions, total)

    def get_fuel_consumption(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.fuel_consumption, total)

    def get_noise_pollution(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.noise_pollution, total)

    def get_air_quality_index(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.air_quality_index, total)

    def get_driving_conditions(self, obj):
        total = self.get_total(obj)
        return self.get_percentage(obj.driving_conditions, total)

      
class IntersectionSerializer(serializers.ModelSerializer):
    safety_scores = SafetySerializer(many=True, read_only=True)
    efficiency_scores = EfficiencySerializer(many=True, read_only=True)
    environmental_scores = EnvironmentalSerializer(many=True, read_only=True)

    class Meta:
        model = Intersection
        fields = (
            "id",
            "intersection_id",
            "coordinates",
            "condition",
            "safety_scores",
            "efficiency_scores",
            "environmental_scores",
        )


class IntersectionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intersection
        fields = (
            "id",
            "intersection_id",
            "coordinates",
            "condition",
        )
