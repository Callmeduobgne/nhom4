from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Employee, Transaction, Project, Customer, Asset
from .serializers import (
    EmployeeSerializer, TransactionSerializer, ProjectSerializer,
    CustomerSerializer, AssetSerializer
)

class EmployeeViewSet(viewsets.ViewSet):
    pagination_class = PageNumberPagination
    
    def list(self, request):
        employees = Employee.objects.all()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset([e for e in employees], request)
        if page is not None:
            serializer = EmployeeSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = EmployeeSerializer([e for e in employees], many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            employee = Employee.objects.get(id=pk)
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data)
        except Employee.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            employee = Employee.objects.get(id=pk)
            serializer = EmployeeSerializer(employee, data=request.data)
            if serializer.is_valid():
                employee = serializer.save()
                return Response(EmployeeSerializer(employee).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Employee.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            employee = Employee.objects.get(id=pk)
            employee.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Employee.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class TransactionViewSet(viewsets.ViewSet):
    def list(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer([t for t in transactions], many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save()
            return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            transaction = Transaction.objects.get(id=pk)
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data)
        except Transaction.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            transaction = Transaction.objects.get(id=pk)
            serializer = TransactionSerializer(transaction, data=request.data)
            if serializer.is_valid():
                transaction = serializer.save()
                return Response(TransactionSerializer(transaction).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Transaction.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            transaction = Transaction.objects.get(id=pk)
            transaction.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Transaction.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class ProjectViewSet(viewsets.ViewSet):
    def list(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer([p for p in projects], many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = serializer.save()
            return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
            serializer = ProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                project = serializer.save()
                return Response(ProjectSerializer(project).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Project.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class CustomerViewSet(viewsets.ViewSet):
    def list(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer([c for c in customers], many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            return Response(CustomerSerializer(customer).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            customer = Customer.objects.get(id=pk)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        except Customer.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            customer = Customer.objects.get(id=pk)
            serializer = CustomerSerializer(customer, data=request.data)
            if serializer.is_valid():
                customer = serializer.save()
                return Response(CustomerSerializer(customer).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Customer.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Customer.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class AssetViewSet(viewsets.ViewSet):
    def list(self, request):
        assets = Asset.objects.all()
        serializer = AssetSerializer([a for a in assets], many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            asset = serializer.save()
            return Response(AssetSerializer(asset).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            asset = Asset.objects.get(id=pk)
            serializer = AssetSerializer(asset)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            asset = Asset.objects.get(id=pk)
            serializer = AssetSerializer(asset, data=request.data)
            if serializer.is_valid():
                asset = serializer.save()
                return Response(AssetSerializer(asset).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Asset.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            asset = Asset.objects.get(id=pk)
            asset.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Asset.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
