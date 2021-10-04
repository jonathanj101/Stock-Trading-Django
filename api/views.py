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

# Create your views here.


@api_view(["GET"])
def fetch_news(request):
    print(request)
    url = f"{BASE_URL}/stable/time-series/news?range=1m&limit=30&token={IEX_CLOUD_API_KEY}"
    make_request = requests.get(url)
    response = make_request.json()
    # print(make_request)

    return Response(response)

@api_view(["GET"])
def search_stock(request, stock):

    try:
        URL = f"{BASE_URL}/stable/stock/{stock}/quote?token={IEX_CLOUD_API_KEY}"
        request = requests.get(URL)
        response = request.json()
        data = {
            "company_name": response["companyName"],
                "cost": response["latestPrice"],
                "change": response["change"],
                "symbol": response["symbol"]
        }
        return Response(data)

    except ValueError:
        return Response("Stock symbol/s not found!")

@api_view(["GET"])
def test(request,stock):
    print(stock)
    print(IEX_CLOUD_API_KEY)
    search_query = f"{BASE_URL}/stable/stock/{stock}/chart/1m?token={IEX_CLOUD_API_KEY}"
    request = requests.get(search_query)
    print(request)
    response = request.json()

    return Response(response)

# @api_view(["POST"])
# def add_stock(request):
    # USER_DETAILS = request.get_json()user
    #     STOCK = Stock.query.filter_by(
    #         stock_symbol=USER_DETAILS["stockSymbol"], user_id=USER_DETAILS["id"]).first()
    #     if STOCK != None:

    #         update_user_cost = (STOCK.user_estimated_cost +
    #                             USER_DETAILS['estimatedCost'])
    #         update_user_shares = (STOCK.user_estimated_shares +
    #                               USER_DETAILS['estimatedShares'])
    #         update_user_holdings = USER.user_holdings - update_user_cost
    #         filter_by_stock_symbol.user_estimated_cost = update_user_cost
    #         filter_by_stock_symbol.user_estimated_shares = update_user_shares
    #         USER.user_holdings = update_user_holdings
    #         transaction = Transactions(company_name=USER_DETAILS['company_name'], user_estimated_cost=USER_DETAILS['estimatedCost'],
    #                                    user_holdings=USER_DETAILS['estimatedCost'], user_id=USER_DETAILS['id'])
    #         db.session.add(transaction)
    #         db.session.commit()
    #         return jsonify("Success! Stock added!"), 200
    #     else:
    #         user_holdings = USER.user_holdings - USER_DETAILS['estimatedCost']
    #         USER.user_holdings = user_holdings
    #         user_stock = Stock(company_name=USER_DETAILS['company_name'],
    #                            stock_symbol=USER_DETAILS['stockSymuser
    #         return jsonify("Success! Stock updated!"), 200
    # else:
    #     return jsonify('Something went wrong on our end! Please try again later.'), 500

# @api_view(["POST"])
# def sell_stock():
#     USER_DETAILS = request.get_json()
#     USER = Users.query.filter_by(id=USER_DETAILS['id']).first()

#     STOCK = Stock.query.filter_by(
#         stock_symbol=USER_DETAILS['stockSymbol'], user_id=USER_DETAILS["id"]).first()

#     SEARCH_STOCK = "{}/stable/stock/{}/quote?token={}".format(
#         BASE_URL, USER_DETAILS['stockSymbol'], API_KEY)

#     req = requests.get(SEARCH_STOCK)

#     resp = req.json()

#     stock_bought_at = STOCK.stock_cost

#     difference_in_cost = (resp['latestPrice'] -
#                           stock_bought_at) * STOCK.user_estimated_shares

#     difference_in_shares = (STOCK.user_estimated_cost -
#                             USER_DETAILS['userSellingAmount']) / STOCK.stock_cost
#     user_holdings = USER.user_holdings + \
#         difference_in_cost + USER_DETAILS['userSellingAmount']

#     MESSAGE = "Success!"

#     if USER:
#         STOCK.user_estimated_cost = STOCK.user_estimated_cost - \
#             USER_DETAILS['userSellingAmount']
#         STOCK.user_estimated_shares = difference_in_shares
#         USER.user_holdings = user_holdings
#         if STOCK.user_estimated_cost == 0:
#             transaction = Transactions(company_name=USER_DETAILS['companyName'], user_estimated_cost=USER_DETAILS[
#                 'userSellingAmount'], user_holdings=user_holdings, user_id=USER_DETAILS['id'])
#             stock = Stock.query.filter_by(
#                 stock_symbol=USER_DETAILS['stockSymbol']).delete()
#             db.session.add(transaction)
#             db.session.commit()
#             return (MESSAGE, 200)
#         else:
#             transaction = Transactions(company_name=USER_DETAILS['companyName'], user_estimated_cost=USER_DETAILS[
#                 'userSellingAmount'], user_holdings=user_holdings, user_id=USER_DETAILS['id'])
#             db.session.add(transaction)
#             db.session.commit()

#         return (MESSAGE, 200)
#     else:
#         return ('Looks like there is an error on our end!', 500)

# @api_view(["PUT"])
# def user_stock():
#     USER_DETAILS = request.get_json()
#     USER = Users.query.filter_by(id=USER_DETAILS['id']).first()
#     STOCK = Stock.query.filter_by(user_id=USER_DETAILS['id']).all()
#     stock_list = []

#     if USER:
#         for data in STOCK:
#             search_url = "{}/stable/stock/{}/quote?token={}".format(
#                 BASE_URL, data.stock_symbol, API_KEY)
#             req = requests.get(search_url)
#             resp = req.json()
#             difference_in_cost = (
#                 resp['latestPrice'] - data.stock_cost) * data.user_estimated_shares

#             stock_obj = {
#                 "companyName": data.company_name,
#                 "symbol": data.stock_symbol,
#                 "cost": data.stock_cost,
#                 "userEstimatedShares": data.user_estimated_shares,
#                 "userEstimatedHolding": data.user_estimated_cost,
#                 "differenceInCost": difference_in_cost
#             }

#             stock_list.append(stock_obj)

#         if stock_list != '':
#             return jsonify({"stock": stock_list})
#         else:
#             return jsonify("An issue has occurred on our end! Please try again later", 500)

#     else:
#         return jsonify('User not found in our record! You will be redirected to the home page.', 500)

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
        

# @api_view(["PUT"])
# def login():
#     USER_DETAILS = request.get_json()

#     USER = Users.query.filter_by(username=USER_DETAILS["username"]).first()
#     if USER and bcrypt.check_password_hash(USER.password, USER_DETAILS['password']):
#         MESSAGE = "You are logged in successfully! You will be redirected to your account shortly!"

#         return jsonify(MESSAGE, 200, USER.id, USER.username)
#     else:
#         MESSAGE = "We don't recognize that username or password. Please try again!"
#         return jsonify(MESSAGE, 500)

# @api_view(["PUT"])
# def user():
#     USER_DETAILS = request.get_json()

#     USER = Users.query.filter_by(id=USER_DETAILS['id']).first()

#     user_obj = {
#         "username": USER.username,
#         "user_holdings": USER.user_holdings
#     }
#     if USER:

#         return jsonify(user_obj), 200
#     else:
#         return ("User not found!"), 500
