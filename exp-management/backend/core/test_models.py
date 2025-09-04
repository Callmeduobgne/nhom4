import pytest
from core.models import Employee
from core.serializers import EmployeeSerializer


class TestEmployee:
    def test_employee_creation(self):
        """Test Employee model creation with valid data"""
        employee = Employee(
            name="John Doe",
            email="john@example.com",
            position="Developer",
            department="IT"
        )
        employee.save()
        
        assert employee.name == "John Doe"
        assert employee.email == "john@example.com"
        assert employee.position == "Developer"
        assert employee.department == "IT"
        assert employee.created_at is not None
        
        # Cleanup
        employee.delete()

    def test_employee_serializer_valid_data(self):
        """Test EmployeeSerializer with valid data"""
        data = {
            'name': 'Jane Smith',
            'email': 'jane@example.com',
            'position': 'Manager',
            'department': 'HR'
        }
        
        serializer = EmployeeSerializer(data=data)
        assert serializer.is_valid()
        
        employee = serializer.save()
        assert employee.name == 'Jane Smith'
        assert employee.email == 'jane@example.com'
        
        # Cleanup
        employee.delete()

    def test_employee_serializer_invalid_email(self):
        """Test EmployeeSerializer with invalid email"""
        data = {
            'name': 'Invalid User',
            'email': 'invalid-email',
            'position': 'Developer',
            'department': 'IT'
        }
        
        serializer = EmployeeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'email' in serializer.errors

    def test_employee_serializer_missing_required_fields(self):
        """Test EmployeeSerializer with missing required fields"""
        data = {
            'name': 'Incomplete User'
            # Missing email, position, department
        }
        
        serializer = EmployeeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'email' in serializer.errors
        assert 'position' in serializer.errors
        assert 'department' in serializer.errors
