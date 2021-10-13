from django.core.checks import messages
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Stock, Transactions


import os
from dotenv import load_dotenv

load_dotenv()

IEX_CLOUD_API_KEY = os.environ.get("IEX_API_KEY")
BASE_URL = "https://cloud.iexapis.com"

@api_view(["GET"])
def fetch_news(request):
    url = f"{BASE_URL}/stable/time-series/news?range=1m&limit=30&token={IEX_CLOUD_API_KEY}"
    make_request = requests.get(url)
    response = make_request.json()

    return Response(response)

@api_view(["GET"])
def search_stock(request, stock):
    try:
        URL = f"{BASE_URL}/stable/search/{stock}?token={IEX_CLOUD_API_KEY}"
        request = requests.get(URL)
        response = request.json()
        return Response(response)

    except ValueError:
        return Response("Stock symbol/s not found!")

@api_view(["GET"])
def stock_data(request, stock):
    try:
        URL = f"{BASE_URL}/stable/stock/{stock}/quote?token={IEX_CLOUD_API_KEY}"
        request = requests.get(URL)
        response = request.json()

        data = {
            "cost": response["latestPrice"],
        }
        
        return Response(data)

    except ValueError:
        return Response("Stock symbol/s not found!")

@api_view(["POST"])
def add_stock(request):
    DATA_RECIEVED = request.data
    FILTER_BY_USER = User.objects.filter(username=DATA_RECIEVED["username"]).first()
    FILTER_BY_STOCK = Stock.objects.filter(stock_symbol=DATA_RECIEVED["stockSymbol"], user_id_id=FILTER_BY_USER.id).first()

    if FILTER_BY_USER:

        if FILTER_BY_STOCK != None:

            update_user_cost = (FILTER_BY_STOCK.user_estimated_cost + DATA_RECIEVED["estimatedCost"])
            update_user_shares = (FILTER_BY_STOCK.user_estimated_shares + DATA_RECIEVED["estimatedShares"])
            update_user_holdings = FILTER_BY_USER.user_holdings - DATA_RECIEVED["estimatedCost"]

            FILTER_BY_STOCK.user_estimated_cost = update_user_cost
            FILTER_BY_STOCK.user_estimated_shares = update_user_shares
            FILTER_BY_USER.user_holdings = update_user_holdings


            transaction = Transactions(company_name=DATA_RECIEVED["companyName"], user_estimated_cost=DATA_RECIEVED ["estimatedCost"],user_holdings=FILTER_BY_USER.user_holdings, user_id_id=FILTER_BY_USER.id)

            transaction.save()
            FILTER_BY_USER.save()
            FILTER_BY_STOCK.save()

            return Response({"message":"Success! Stock added!", "status_code":201})
        else:
            user_holdings = FILTER_BY_USER.user_holdings - DATA_RECIEVED['estimatedCost']
            FILTER_BY_USER.user_holdings = user_holdings
            user_stock = Stock(company_name=DATA_RECIEVED['companyName'],
                               stock_symbol=DATA_RECIEVED['stockSymbol'], stock_cost=DATA_RECIEVED['stockCost'],
                               user_estimated_shares=DATA_RECIEVED['estimatedShares'], user_estimated_cost=DATA_RECIEVED['estimatedCost'], user_id_id=FILTER_BY_USER.id)
            transaction = Transactions(company_name=DATA_RECIEVED['companyName'], user_estimated_cost=DATA_RECIEVED[
                'estimatedCost'], user_holdings=user_holdings, user_id_id=FILTER_BY_USER.id)
            user_stock.save()
            transaction.save()
            FILTER_BY_USER.save()
            
            return Response({"message":"Success! Stock updated!", "status_code":201})

    return Response({"message":"Something went wrong on out end! Please try again!", "status_code":500})

@api_view(["POST"])
def sell_stock(request):
    DATA_RECIEVED = request.data
    FILTER_BY_USER = User.objects.filter(username=DATA_RECIEVED["username"]).first()
    FILTER_BY_STOCK = Stock.objects.filter(stock_symbol=DATA_RECIEVED["stockSymbol"], user_id_id=FILTER_BY_USER.id).first()

    SEARCH_STOCK = f"{BASE_URL}/stable/stock/{DATA_RECIEVED['stockSymbol']}/quote?token={IEX_CLOUD_API_KEY}"

    make_request = requests.get(SEARCH_STOCK)
    response = make_request.json()

    stock_bought_at = FILTER_BY_STOCK.stock_cost

    difference_in_cost = (response['latestPrice'] - stock_bought_at) * FILTER_BY_STOCK.user_estimated_shares
    difference_in_shares = (FILTER_BY_STOCK.user_estimated_cost - DATA_RECIEVED["userSellingAmount"])/ FILTER_BY_STOCK.stock_cost

    user_holdings = FILTER_BY_USER.user_holdings + difference_in_cost + DATA_RECIEVED["userSellingAmount"]

    MESSAGE = "SUCCESS!"

    if FILTER_BY_USER:
        FILTER_BY_STOCK.user_estimated_cost = FILTER_BY_STOCK.user_estimated_cost - DATA_RECIEVED["userSellingAmount"]
        FILTER_BY_STOCK.user_estimated_shares = difference_in_shares
        FILTER_BY_USER.user_holdings = user_holdings
        if FILTER_BY_STOCK.user_estimated_cost == 0:
            transaction = Transactions(company_name=DATA_RECIEVED["companyName"], user_estimated_cost=DATA_RECIEVED["userSellingAmount"], user_holdings=user_holdings, user_id_id=FILTER_BY_USER.id)
            FILTER_BY_STOCK.delete()
            transaction.save()
            FILTER_BY_USER.save()
            return Response({"message":MESSAGE, "status_code": 201})
        else:
            transaction = Transactions(company_name=DATA_RECIEVED["companyName"], user_estimated_cost=DATA_RECIEVED["userSellingAmount"], user_holdings=user_holdings,user_id_id=FILTER_BY_USER.id)

            transaction.save()

            return Response({"message":MESSAGE, "status_code": 201})
    else:
        return Response({"message":"Looks like there is an error on our end!", "status_code":500})

@api_view(["PUT"])
def user_stock(request):
    DATA_RECIEVED = request.data
    FILTER_BY_USER = User.objects.filter(username=DATA_RECIEVED['username']).first()
    FILTER_STOCK = Stock.objects.filter(user_id_id=FILTER_BY_USER.id).all()
    data = []
    total_investing = 0
    if FILTER_BY_USER:

        for stock in FILTER_STOCK:
            SEARCH_STOCK = f"{BASE_URL}/stable/stock/{stock.stock_symbol}/quote?token={IEX_CLOUD_API_KEY}"
            make_request = requests.get(SEARCH_STOCK)
            response = make_request.json()
            difference_in_cost = (response["latestPrice"] - stock.stock_cost) * stock.user_estimated_shares
            total_investing += stock.user_estimated_cost + difference_in_cost
            objs = {
                "companyName": stock.company_name,
                "symbol": stock.stock_symbol,
                "cost": stock.stock_cost,
                "userEstimatedShares": stock.user_estimated_shares,
                "userEstimatedHolding": stock.user_estimated_cost,
                "differenceInCost": difference_in_cost,
                "userHoldings": FILTER_BY_USER.user_holdings,
                "investing": stock.user_estimated_cost + difference_in_cost
            }
            data.append(objs)
        if data != "":
            return Response({"data":data,"investing":total_investing})
        else:
            return Response({"message":"An issue has occured on our end! Please try again later", "status_code": 500})
    else:
        return Response({"message":"User not found in our record! You will be redirected to the home page.", "status_code": 500})

@api_view(["PUT","POST"])
def signup(request):
    USER_DETAIL = request.data
    FILTER_BY_USERNAME = User.objects.filter(username=USER_DETAIL['username']).first()
    FILTER_BY_EMAIL = User.objects.filter(email=USER_DETAIL['email']).first()
    print(USER_DETAIL)
    print(USER_DETAIL['username'])
    print(FILTER_BY_USERNAME)
    print(FILTER_BY_EMAIL)

    if request.method == "PUT":
        if FILTER_BY_USERNAME is not None:
            return Response({"message":"That username is already been used! Please choose another username!", "status_code": 500})
        elif FILTER_BY_EMAIL is not None:
            return Response({"message":"That email is already been used! Please choose another email!", "status_code": 500})
        else:
            return Response({"message":"Success! You will be redirected to your account shortly!",'status_code': 201})
    else:
        hashed_password = make_password(USER_DETAIL['password'], salt=None, hasher='default')
        USER = User(first_name=USER_DETAIL['firstName'], last_name=USER_DETAIL['lastName'], username=USER_DETAIL['username'], password=hashed_password, email=USER_DETAIL['email'], user_holdings=USER_DETAIL['userHoldings'])
        USER.save()
        return Response({"status_code":200} )

@api_view(["PUT"])
def login(request):
    DATA_RECIEVED = request.data
    USER = User.objects.filter(username=DATA_RECIEVED['username']).first()
    if USER:
        if check_password(DATA_RECIEVED["password"], USER.password):
            return Response({"message":"You are logged in successfully! You will be redirected to your account shortly!", "username":USER.username, "status_code":201})
    else:
        return Response({"message":"We don't recognice that username!", "status_code":500})

@api_view(["PUT"])
def user(request):
    USER_DETAILS = request.data
    USER = User.objects.filter(username=USER_DETAILS["username"]).first()
    if USER:
        return Response({"username": USER.username, "user_holdings":USER.user_holdings},201)
    else: 
        return Response({"message":"User not found on our database","status_code": 500})