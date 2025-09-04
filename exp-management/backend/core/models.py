from mongoengine import Document, StringField, EmailField, DateTimeField, IntField, DecimalField, DateField
from datetime import datetime

class Employee(Document):
    name = StringField(max_length=100, required=True)
    email = EmailField(required=True)
    position = StringField(max_length=100, required=True)
    department = StringField(max_length=100, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'employees'}

class Transaction(Document):
    TYPE_CHOICES = ['income', 'expense']
    
    date = DateField(required=True)
    description = StringField(max_length=200, required=True)
    amount = DecimalField(min_value=0, precision=2, required=True)
    type = StringField(max_length=10, choices=TYPE_CHOICES, required=True)
    category = StringField(max_length=100, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'transactions'}

class Project(Document):
    STATUS_CHOICES = ['planning', 'active', 'completed', 'cancelled']
    
    name = StringField(max_length=100, required=True)
    description = StringField()
    client = StringField(max_length=100, required=True)
    status = StringField(max_length=20, choices=STATUS_CHOICES, required=True)
    start_date = DateField()
    end_date = DateField()
    progress = IntField(min_value=0, max_value=100, default=0)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'projects'}

class Customer(Document):
    STATUS_CHOICES = ['lead', 'prospect', 'customer', 'inactive']
    
    name = StringField(max_length=100, required=True)
    email = EmailField(required=True)
    phone = StringField(max_length=20)
    company = StringField(max_length=100)
    status = StringField(max_length=20, choices=STATUS_CHOICES, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'customers'}

class Asset(Document):
    CATEGORY_CHOICES = ['equipment', 'furniture', 'vehicle', 'software', 'other']
    STATUS_CHOICES = ['active', 'maintenance', 'retired', 'disposed']
    
    name = StringField(max_length=100, required=True)
    description = StringField()
    category = StringField(max_length=20, choices=CATEGORY_CHOICES, required=True)
    value = DecimalField(min_value=0, precision=2, required=True)
    status = StringField(max_length=20, choices=STATUS_CHOICES, required=True)
    location = StringField(max_length=100)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'assets'}
