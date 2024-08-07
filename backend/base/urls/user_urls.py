from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name="register"),
    path('reset-password/', views.resetPassword, name="reset-password"),
    path('reset-password-confirm/', views.resetPasswordConfirm, name="reset-password-confirm"),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="users-profile-update"),
    path('', views.getUsers, name="users"),

    path('mycourses/', views.getMyCourses, name="my-courses"),
    path('course/<int:course_id>/token/', views.getTemporaryCourseToken, name='get-course-token'),
    path('course/access/<str:token>/', views.accessCourse, name='access-course'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),
]