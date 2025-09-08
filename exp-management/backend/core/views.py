from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee, Transaction, Project, Customer, Asset
from .serializers import (
    EmployeeSerializer, TransactionSerializer, ProjectSerializer,
    CustomerSerializer, AssetSerializer
)

class MongoEngineViewSet(viewsets.ViewSet):
    """Base ViewSet for MongoEngine documents"""
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        try:
            instance = self.model.objects.get(id=pk)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except self.model.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def update(self, request, pk=None):
        try:
            instance = self.model.objects.get(id=pk)
            serializer = self.get_serializer(instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except self.model.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, pk=None):
        try:
            instance = self.model.objects.get(id=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except self.model.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_queryset(self):
        return self.model.objects.all()
    
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

class EmployeeViewSet(MongoEngineViewSet):
    model = Employee
    serializer_class = EmployeeSerializer

class TransactionViewSet(MongoEngineViewSet):
    model = Transaction
    serializer_class = TransactionSerializer

class ProjectViewSet(MongoEngineViewSet):
    model = Project
    serializer_class = ProjectSerializer

class CustomerViewSet(MongoEngineViewSet):
    model = Customer
    serializer_class = CustomerSerializer

class AssetViewSet(MongoEngineViewSet):
    model = Asset
    serializer_class = AssetSerializer
