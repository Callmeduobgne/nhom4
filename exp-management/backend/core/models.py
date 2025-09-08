from mongoengine import Document, fields
from datetime import datetime

class Employee(Document):
    name = fields.StringField(max_length=100, required=True)
    email = fields.EmailField(required=True)
    position = fields.StringField(max_length=100, required=True)
    department = fields.StringField(max_length=100, required=True)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'employees',
        'indexes': ['email', 'department']
    }
    
    def __str__(self):
        return f"{self.name} - {self.position}"

class Transaction(Document):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    date = fields.DateTimeField(required=True)
    description = fields.StringField(max_length=200, required=True)
    amount = fields.DecimalField(max_digits=10, decimal_places=2, required=True)
    type = fields.StringField(max_length=10, choices=TYPE_CHOICES, required=True)
    category = fields.StringField(max_length=100, required=True)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'transactions',
        'indexes': ['date', 'type', 'category']
    }
    
    def __str__(self):
        return f"{self.description} - {self.amount}"

class Project(Document):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    name = fields.StringField(max_length=100, required=True)
    description = fields.StringField()
    client = fields.StringField(max_length=100, required=True)
    status = fields.StringField(max_length=20, choices=STATUS_CHOICES, default='planning')
    start_date = fields.DateTimeField()
    end_date = fields.DateTimeField()
    progress = fields.IntField(min_value=0, max_value=100, default=0)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'projects',
        'indexes': ['status', 'client', 'start_date']
    }
    
    def __str__(self):
        return f"{self.name} - {self.client}"

class Customer(Document):
    STATUS_CHOICES = [
        ('lead', 'Lead'),
        ('prospect', 'Prospect'),
        ('customer', 'Customer'),
        ('inactive', 'Inactive'),
    ]
    
    name = fields.StringField(max_length=100, required=True)
    email = fields.EmailField(required=True)
    phone = fields.StringField(max_length=20)
    company = fields.StringField(max_length=100)
    status = fields.StringField(max_length=20, choices=STATUS_CHOICES, default='lead')
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'customers',
        'indexes': ['email', 'status', 'company']
    }
    
    def __str__(self):
        return f"{self.name} - {self.company}"

class Asset(Document):
    CATEGORY_CHOICES = [
        ('equipment', 'Equipment'),
        ('furniture', 'Furniture'),
        ('vehicle', 'Vehicle'),
        ('software', 'Software'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('maintenance', 'Maintenance'),
        ('retired', 'Retired'),
        ('disposed', 'Disposed'),
    ]
    
    name = fields.StringField(max_length=100, required=True)
    description = fields.StringField()
    category = fields.StringField(max_length=20, choices=CATEGORY_CHOICES, required=True)
    value = fields.DecimalField(max_digits=10, decimal_places=2, required=True)
    status = fields.StringField(max_length=20, choices=STATUS_CHOICES, default='active')
    location = fields.StringField(max_length=100)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'assets',
        'indexes': ['category', 'status', 'location']
    }
    
    def __str__(self):
        return f"{self.name} - {self.category}"
