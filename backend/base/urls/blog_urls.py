from django.urls import path
from base.views import blog_views as views

urlpatterns = [
    path('', views.getArticles, name="aritcles"),
    path('create/', views.createArtile, name="article-create"),
    path('upload/', views.uploadImageToArticle, name="image-upload-to-article"),
    path('<str:pk>/', views.getArticle, name="article"),
    path('update/<str:pk>/', views.updateArticle, name="article-update"),
    path('delete/<str:pk>/', views.deleteArticle, name="article-delete"),
]