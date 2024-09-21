from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import get_user_model
from django_otp.plugins.otp_email.models import EmailDevice
from user.serializers import (
    UserSerializer,
    OTPSerializer,
    RegistrationSerializer,
    LoginSerializer,
    ResetPasswordSerializer,
    SendOTPSerializer,
)

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        EmailDevice.objects.create(user=user, email=user.email)


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        answer_1 = request.data.get("answer_1", "")
        answer_2 = request.data.get("answer_2", "")
        answer_3 = request.data.get("answer_3", "")

        user = get_object_or_404(User, email=email)

        if not user.check_password(password):
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        if all(answer == "" for answer in [answer_1, answer_2, answer_3]):
            device = EmailDevice.objects.filter(user=user).first()
            if not device:
                device = EmailDevice.objects.create(user=user, email=user.email)
            device.generate_challenge()
            return Response(
                {"otp": ["OTP sent to your email"]}, status=status.HTTP_200_OK
            )

        if (
            user.answer_1 == answer_1
            and user.answer_2 == answer_2
            and user.answer_3 == answer_3
        ):
            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access),
                }
            )

        return Response(
            {
                "detail": "Incorrect or missing answers",
                "answer_1": answer_1,
                "answer_2": answer_2,
                "answer_3": answer_3,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class LogoutView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ManageUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class VerifyOTPView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = OTPSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]
        user = User.objects.get(email=email)
        device = EmailDevice.objects.filter(user=user).first()
        if device and device.verify_token(otp):
            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access),
                }
            )
        return Response(
            {"otp": ["Invalid OTP"]}, status=status.HTTP_400_BAD_REQUEST
        )


class ResetPasswordView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]
        new_password = serializer.validated_data["new_password"]

        user = User.objects.get(email=email)
        device = EmailDevice.objects.filter(user=user).first()
        if device and device.verify_token(otp):
            user.set_password(new_password)
            user.save()
            return Response(
                {"detail": "Password reset successful"}, status=status.HTTP_200_OK
            )
        return Response(
            {"otp": ["Invalid OTP"]}, status=status.HTTP_400_BAD_REQUEST
        )


class SendOTPView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SendOTPSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        user = User.objects.get(email=email)
        device = EmailDevice.objects.filter(user=user).first()
        if not device:
            device = EmailDevice.objects.create(user=user, email=user.email)
        device.generate_challenge()
        return Response(
            {"otp": ["OTP sent to your email"]}, status=status.HTTP_200_OK
        )
