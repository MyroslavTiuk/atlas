from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from user.views import (
    CreateUserView,
    LoginView,
    LogoutView,
    VerifyOTPView,
    ManageUserView,
    SendOTPView,
    ResetPasswordView
)

app_name = "user"

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("send-otp/", SendOTPView.as_view(), name="send_otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
]
