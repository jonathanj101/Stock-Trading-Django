from django.urls import path
from django.urls import path
from .views import add_stock, fetch_news, search_stock, signup, testing, user, some_test


urlpatterns = [
    path("news", fetch_news),
    path("search/<str:stock>", search_stock),
    path("buy",add_stock),
    path("signup", signup),
    path('user', user),
    path("test/<str:stock>", some_test),
    path("testing", testing)
    ]