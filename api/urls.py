from django.core.mail import send_mail
from django.urls import path
from django.urls import path
from .views import add_stock, fetch_news, login, search_stock, sell_stock, signup, stock_data, transaction_receipt, user, user_stock
urlpatterns = [
    path("news", fetch_news),
    path("search/<str:stock>", search_stock),
    path("buy",add_stock),
    path("sell-stock", sell_stock),
    path("signup", signup),
    path('user', user),
    path('login', login),
    path("stocks", user_stock),
    path("search/stock/<str:stock>", stock_data),
    path("transaction-receipt", transaction_receipt)
]