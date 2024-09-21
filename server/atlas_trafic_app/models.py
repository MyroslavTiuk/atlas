from django.db import models


class Intersection(models.Model):
    intersection_id = models.CharField(max_length=50, unique=True)
    coordinates = models.CharField(max_length=100)
    condition = models.CharField(max_length=50, default="Live")

    def update_intersection(self, data):
        if data.get("condition"):
            self.condition = data["condition"]

    def __str__(self):
        return f"{self.intersection_id} - {self.coordinates}"


class Safety(models.Model):
    intersection = models.ForeignKey(
        Intersection, on_delete=models.CASCADE, related_name="safety_scores"
    )
    points = models.FloatField(default=120)
    accident_rate = models.FloatField(default=0)
    near_misses = models.FloatField(default=0)
    speeding = models.FloatField(default=0)
    traffic_violations = models.FloatField(default=0)
    pedestrian_incidents = models.FloatField(default=0)
    damaged_disabled_vehicle = models.FloatField(default=0)

    def update_safety(self, data) -> None:
        if data.get("accident_rate"):
            self.accident_rate += data["accident_rate"] * 20

        if data.get("near_misses"):
            self.near_misses += data["near_misses"]

        if data.get("speeding"):
            self.speeding += data["speeding"] * 0.1

        traffic_violations = data.get("traffic_violations", {})
        self.traffic_violations += (
                traffic_violations.get("tailgating", 0) * 0.25 +
                traffic_violations.get("red_light_running", 0) * 0.25 +
                traffic_violations.get("distracted_driving", 0) * 0.25 +
                traffic_violations.get("changing_lanes", 0) * 0.25
        )

        pedestrian_incidents = data.get("pedestrian_incidents", {})
        self.pedestrian_incidents += (
                pedestrian_incidents.get("no_crosswalk_sign", 0) * 0.25 +
                pedestrian_incidents.get("near_miss", 0) * 0.25 +
                pedestrian_incidents.get("aggressive_behavior", 0) * 0.25
        )

        damaged_disabled_vehicle = data.get("damaged_disabled_vehicle", {})
        self.damaged_disabled_vehicle += (
                damaged_disabled_vehicle.get("stuck_in_lane", 0) * 5 +
                damaged_disabled_vehicle.get("broken_down_intersection", 0) * 5 +
                damaged_disabled_vehicle.get("broken_down_side", 0) * 5
        )

        self.save()
        self.calculate_safety_score()

    def calculate_safety_score(self) -> float:
        points_deducted = (
            self.accident_rate
            + self.near_misses
            + self.speeding
            + self.traffic_violations
            + self.pedestrian_incidents
            + self.damaged_disabled_vehicle
        )
        self.points = max(0, 120 - points_deducted)
        self.save()
        return self.points

    def get_safety_grade(self) -> str:
        score = self.points
        if score >= 100:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 60:
            return "C"
        elif score >= 40:
            return "D"
        else:
            return "F"

    def __str__(self) -> str:
        return f"{self.intersection.intersection_id} - Safety Score: {self.calculate_safety_score()}"


class Efficiency(models.Model):
    intersection = models.ForeignKey(
        Intersection, on_delete=models.CASCADE, related_name="efficiency_scores"
    )
    points = models.FloatField(default=120)
    congestion_level = models.FloatField(default=0)
    average_traffic_speed = models.FloatField(default=0)
    traffic_volume = models.FloatField(default=0)
    signal_timing_efficiency = models.FloatField(default=0)
    pedestrian_wait_time = models.FloatField(default=0)
    micro_mobility_wait_time = models.FloatField(default=0)

    def update_efficiency(self, data, is_school_hours=False, is_near_school=False) -> None:
        if data.get("congestion_level") and data["congestion_level"] >= 50:
            self.congestion_level += 1

        average_traffic_speed_data = data.get("average_traffic_speed", {})
        avg_speed = average_traffic_speed_data.get("avg_speed")
        min_speed_limit = average_traffic_speed_data.get("min_speed_limit")
        max_speed_limit = average_traffic_speed_data.get("max_speed_limit")

        if avg_speed is not None and min_speed_limit is not None and max_speed_limit is not None:
            if avg_speed <= (min_speed_limit - 8) or avg_speed >= (max_speed_limit + 8):
                self.average_traffic_speed += 1

        if data.get("traffic_volume") and data["traffic_volume"] >= 2000:
            self.traffic_volume += 1

        if data.get("signal_timing_efficiency") and data["signal_timing_efficiency"] >= 40:
            self.signal_timing_efficiency += 0.25

        if data.get("pedestrian_wait_time"):
            if not is_school_hours and data["pedestrian_wait_time"] >= 60:
                self.pedestrian_wait_time += 0.5
            elif is_school_hours and is_near_school and data["pedestrian_wait_time"] >= 30:
                self.pedestrian_wait_time += 0.5

        if data.get("micro_mobility_wait_time"):
            if not is_school_hours and data["micro_mobility_wait_time"] >= 60:
                self.micro_mobility_wait_time += 0.5
            elif is_school_hours and is_near_school and data["micro_mobility_wait_time"] >= 30:
                self.micro_mobility_wait_time += 0.5

        self.save()
        self.calculate_efficiency_score()

    def calculate_efficiency_score(self) -> float:
        points_deducted = (
            self.congestion_level
            + self.average_traffic_speed
            + self.traffic_volume
            + self.signal_timing_efficiency
            + self.pedestrian_wait_time
            + self.micro_mobility_wait_time
        )
        self.points = max(0, 120 - points_deducted)
        self.save()
        return self.points

    def get_efficiency_grade(self) -> str:
        score = self.points
        if score >= 100:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 60:
            return "C"
        elif score >= 40:
            return "D"
        else:
            return "F"

    def __str__(self) -> str:
        return f"{self.intersection.intersection_id} - Efficiency Score: {self.calculate_efficiency_score()}"


class Environmental(models.Model):
    intersection = models.ForeignKey(
        Intersection, on_delete=models.CASCADE, related_name="environmental_scores"
    )
    points = models.FloatField(default=120)
    vehicle_emissions = models.FloatField(default=0)
    fuel_consumption = models.FloatField(default=0)
    noise_pollution = models.FloatField(default=0)
    air_quality_index = models.FloatField(default=0)
    driving_conditions = models.FloatField(default=0)
    fire_detection = models.BooleanField(default=False)

    def update_environmental(self, data) -> None:
        if data.get("vehicle_emissions") and data["vehicle_emissions"] > 30:  # 30 seconds
            self.vehicle_emissions += 0.2

        if data.get("fuel_consumption") and data["fuel_consumption"] > 30:  # 30 seconds
            self.fuel_consumption += 0.2

        if data.get("noise_pollution") and data["noise_pollution"] > 75:  # 75 decibels
            self.noise_pollution += 0.5

        if data.get("air_quality_index") and data["air_quality_index"] > 100:  # 100 per one hour
            self.air_quality_index += 5

        driving_conditions = data.get("driving_conditions", {})
        visibility = driving_conditions.get("visibility")
        weather = driving_conditions.get("weather")
        if visibility is not None and weather is not None:
            if visibility < 0.5:  # 0.5 miles
                self.driving_conditions += 1
            if weather in ["rain", "dust storm", "snow"]:
                self.driving_conditions += 1

        if data.get("fire_detection"):
            self.fire_detection = True
        self.save()
        self.calculate_environmental_score()

    def calculate_environmental_score(self) -> float:
        points_deducted = (
            self.vehicle_emissions
            + self.fuel_consumption
            + self.noise_pollution
            + self.air_quality_index
            + self.driving_conditions
            + self.fire_detection
        )
        self.points = max(0, 120 - points_deducted)
        self.save()
        return self.points

    def get_environmental_grade(self) -> str:
        score = self.points
        if score >= 100:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 60:
            return "C"
        elif score >= 40:
            return "D"
        else:
            return "F"

    def __str__(self) -> str:
        return f"{self.intersection.intersection_id} - Environmental Score: {self.calculate_environmental_score()}"
