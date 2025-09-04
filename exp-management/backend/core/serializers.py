from rest_framework import serializers
from .models import Employee, Transaction, Project, Customer, Asset

class EmployeeSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    position = serializers.CharField(max_length=100)
    department = serializers.CharField(max_length=100)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

class TransactionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    date = serializers.DateField()
    description = serializers.CharField(max_length=200)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    type = serializers.ChoiceField(choices=['income', 'expense'])
    category = serializers.CharField(max_length=100)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

class ProjectSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    client = serializers.CharField(max_length=100)
    status = serializers.ChoiceField(choices=['planning', 'active', 'completed', 'cancelled'])
    start_date = serializers.DateField(required=False, allow_null=True)
    end_date = serializers.DateField(required=False, allow_null=True)
    progress = serializers.IntegerField(min_value=0, max_value=100, default=0)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

class CustomerSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    company = serializers.CharField(max_length=100, required=False, allow_blank=True)
    status = serializers.ChoiceField(choices=['lead', 'prospect', 'customer', 'inactive'])
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

class AssetSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    category = serializers.ChoiceField(choices=['equipment', 'furniture', 'vehicle', 'software', 'other'])
    value = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.ChoiceField(choices=['active', 'maintenance', 'retired', 'disposed'])
    location = serializers.CharField(max_length=100, required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Asset.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
