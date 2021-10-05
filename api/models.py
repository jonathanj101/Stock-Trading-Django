from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import DO_NOTHING
from django.utils import timezone
# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=25, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)
    email = models.CharField(max_length=50, null=False, unique=True)
    user_holdings = models.FloatField(null=False)
    
    def __str__(self):
        return f"User (' {self.first_name}', '{self.last_name}' , '{self.username}' , '{self.email}', '{self.user_holdings}' )"

class Stock(models.Model):
    company_name = models.CharField(max_length=100, null=False)
    stock_symbol = models.CharField(max_length=25, null=False)
    stock_cost = models.FloatField(null=False)
    user_estimated_shares = models.FloatField(null=False)
    user_estimated_cost = models.FloatField(null=False)
    user_id = models.ForeignKey(User, on_delete=DO_NOTHING)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self) :
        return f"Stock ('{self.company_name}', '{self.stock_symbol}', '{self.stock_cost}', '{self.user_estimated_shares}', '{self.user_estimated_cost}', '{self.date}')"

class Transactions(models.Model):
    company_name = models.CharField(max_length=100, null=False)
    user_estimated_cost = models.FloatField(null=False)
    user_holdings = models.FloatField(null=False)
    date = models.DateTimeField(default=timezone.now)
    user_id = models.ForeignKey(User, on_delete=DO_NOTHING)


    def __str__(self):
        return f"('{self.company_name}', '{self.user_estimated_cost}', '{self.user_holdings}' , '{self.user_id}, '{self.date}')"





