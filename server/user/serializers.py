from django.contrib.auth import get_user_model
from rest_framework import serializers
from django_otp.plugins.otp_email.models import EmailDevice

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    answer_1 = serializers.CharField(required=True, max_length=128)
    answer_2 = serializers.CharField(required=True, max_length=128)
    answer_3 = serializers.CharField(required=True, max_length=128)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "answer_1",
            "answer_2",
            "answer_3",
            "is_staff",
        )
        read_only_fields = ("is_staff",)
        extra_kwargs = {"password": {"write_only": True, "min_length": 6}}

    def validate(self, attrs):
        password = attrs.get("password")
        if not any(char.isdigit() for char in password) or not any(
            char.isupper() for char in password
        ):
            raise serializers.ValidationError(
                {
                    "password": "Password must contain at least one number and one uppercase letter"
                }
            )
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class RegistrationSerializer(UserSerializer):
    pass


class LoginSerializer(UserSerializer):
    answer_1 = serializers.CharField(required=False, max_length=128, allow_blank=True)
    answer_2 = serializers.CharField(required=False, max_length=128, allow_blank=True)
    answer_3 = serializers.CharField(required=False, max_length=128, allow_blank=True)


class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        if not User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "User not found"})
        return attrs


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(max_length=128)
    repeat_password = serializers.CharField(max_length=128)

    def validate(self, attrs):
        if not User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "User not found"})

        password = attrs["new_password"]

        if not any(char.isdigit() for char in password) or not any(
            char.isupper() for char in password
        ):
            raise serializers.ValidationError(
                {
                    "password": "Password must contain at least one number and one uppercase letter"
                }
            )

        if attrs["new_password"] != attrs["repeat_password"]:
            raise serializers.ValidationError(
                {"password_error": "Passwords do not match"}
            )
        return attrs


class SendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        if not User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "User not found"})
        return attrs
