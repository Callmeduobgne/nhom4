from rest_framework import serializers
from .models import Employee, Transaction, Project, Customer, Asset
from bson import ObjectId
import json

class MongoEngineModelSerializer(serializers.Serializer):
    """Base serializer for MongoEngine documents"""
    
    def to_representation(self, instance):
        """Convert MongoEngine document to dictionary"""
        data = {}
        for field_name in self.fields:
            if hasattr(instance, field_name):
                field_value = getattr(instance, field_name)
                if isinstance(field_value, ObjectId):
                    data[field_name] = str(field_value)
                elif hasattr(field_value, 'isoformat'):  # datetime
                    data[field_name] = field_value.isoformat()
                else:
                    data[field_name] = field_value
        return data
    
    def create(self, validated_data):
        """Create new MongoEngine document"""
        return self.Meta.model(**validated_data).save()
    
    def update(self, instance, validated_data):
        """Update existing MongoEngine document"""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        return instance.save()

class EmployeeSerializer(MongoEngineModelSerializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    position = serializers.CharField(max_length=100, required=True)
    department = serializers.CharField(max_length=100, required=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'position', 'department', 'created_at']

class TransactionSerializer(MongoEngineModelSerializer):
    id = serializers.CharField(read_only=True)
    date = serializers.DateTimeField(required=True)
    description = serializers.CharField(max_length=200, required=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    type = serializers.ChoiceField(choices=[('income', 'Income'), ('expense', 'Expense')], required=True)
    category = serializers.CharField(max_length=100, required=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Transaction
        fields = ['id', 'date', 'description', 'amount', 'type', 'category', 'created_at']

class ProjectSerializer(MongoEngineModelSerializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    description = serializers.CharField(required=False, allow_blank=True)
    client = serializers.CharField(max_length=100, required=True)
    status = serializers.ChoiceField(
        choices=[('planning', 'Planning'), ('active', 'Active'), ('completed', 'Completed'), ('cancelled', 'Cancelled')],
        default='planning'
    )
    start_date = serializers.DateTimeField(required=False, allow_null=True)
    end_date = serializers.DateTimeField(required=False, allow_null=True)
    progress = serializers.IntegerField(min_value=0, max_value=100, default=0)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'client', 'status', 'start_date', 'end_date', 'progress', 'created_at']

class CustomerSerializer(MongoEngineModelSerializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    company = serializers.CharField(max_length=100, required=False, allow_blank=True)
    status = serializers.ChoiceField(
        choices=[('lead', 'Lead'), ('prospect', 'Prospect'), ('customer', 'Customer'), ('inactive', 'Inactive')],
        default='lead'
    )
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'company', 'status', 'created_at']

class AssetSerializer(MongoEngineModelSerializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    description = serializers.CharField(required=False, allow_blank=True)
    category = serializers.ChoiceField(
        choices=[('equipment', 'Equipment'), ('furniture', 'Furniture'), ('vehicle', 'Vehicle'), ('software', 'Software'), ('other', 'Other')],
        required=True
    )
    value = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    status = serializers.ChoiceField(
        choices=[('active', 'Active'), ('maintenance', 'Maintenance'), ('retired', 'Retired'), ('disposed', 'Disposed')],
        default='active'
    )
    location = serializers.CharField(max_length=100, required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Asset
        fields = ['id', 'name', 'description', 'category', 'value', 'status', 'location', 'created_at']
