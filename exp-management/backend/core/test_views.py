import pytest
import json
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from core.models import Employee


class TestEmployeeViewSet(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        
        # Create test employee
        self.employee = Employee(
            name="Test Employee",
            email="test@example.com", 
            position="Developer",
            department="IT"
        )
        self.employee.save()

    def tearDown(self):
        # Clean up test data
        try:
            self.employee.delete()
        except:
            pass
        Employee.objects.all().delete()

    def test_employee_list_authenticated(self):
        """Test employee list endpoint with authentication"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/employees/')
        
        assert response.status_code == status.HTTP_200_OK
        # Check pagination structure
        assert 'results' in response.data or isinstance(response.data, list)

    def test_employee_create_authenticated(self):
        """Test employee creation with authentication"""
        self.client.force_authenticate(user=self.user)
        
        data = {
            'name': 'New Employee',
            'email': 'new@example.com',
            'position': 'Manager',
            'department': 'HR'
        }
        
        response = self.client.post('/api/employees/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['name'] == 'New Employee'

    def test_employee_create_invalid_data(self):
        """Test employee creation with invalid data"""
        self.client.force_authenticate(user=self.user)
        
        data = {
            'name': 'Invalid Employee',
            'email': 'invalid-email',  # Invalid email format
            'position': 'Developer',
            'department': 'IT'
        }
        
        response = self.client.post('/api/employees/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'email' in response.data

    def test_employee_update_authenticated(self):
        """Test employee update with authentication"""
        self.client.force_authenticate(user=self.user)
        
        data = {
            'name': 'Updated Employee',
            'email': 'updated@example.com',
            'position': 'Senior Developer',
            'department': 'IT'
        }
        
        response = self.client.put(f'/api/employees/{self.employee.id}/', data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Updated Employee'

    def test_employee_delete_authenticated(self):
        """Test employee deletion with authentication"""
        self.client.force_authenticate(user=self.user)
        
        response = self.client.delete(f'/api/employees/{self.employee.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
