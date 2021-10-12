from django.urls import path
from django.urls import path
from .views import add_stock, fetch_news, login, search_stock, sell_stock, signup, user, user_stock


urlpatterns = [
    path("news", fetch_news),
    path("search/<str:stock>", search_stock),
    path("buy",add_stock),
    path("sell-stock", sell_stock),
    path("signup", signup),
    path('user', user),
    path("stocks", user_stock),
    path('login', login)
    # path("stocks/<str:username>", user_stock)
    ]