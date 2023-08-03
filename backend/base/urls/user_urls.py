from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name="register"),
    path('reset-password/', views.resetPassword, name="reset-password"),
    path('reset-password-confirm/', views.resetPasswordConfirm, name="reset-password-confirm"),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('', views.getUsers, name="users"),
]