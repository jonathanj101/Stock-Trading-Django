from django.urls import path
from django.urls import path
from .views import fetch_news, search_stock


urlpatterns = [
    path("news", fetch_news),
    path("search_stock/<str:stock>", search_stock)
    ]