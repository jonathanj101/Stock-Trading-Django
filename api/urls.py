from django.urls import path
from django.urls import path
from .views import fetch_news, search_stock, signup, test


urlpatterns = [
    path("news", fetch_news),
    path("search_stock/<str:stock>", search_stock),
    path("test/<str:stock>", test),
    path("signup", signup)
    ]