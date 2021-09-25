import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


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