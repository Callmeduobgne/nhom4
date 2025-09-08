from django.core.management.base import BaseCommand
from core.models import Employee
from datetime import datetime

class Command(BaseCommand):
    help = 'Seeds the database with sample employees'

    def handle(self, *args, **kwargs):
        employees_data = [
            {"name": "Nguyễn Văn An", "email": "an.nguyen@company.com", "position": "Senior Developer", "department": "IT"},
            {"name": "Trần Thị Bình", "email": "binh.tran@company.com", "position": "HR Manager", "department": "HR"},
            {"name": "Lê Văn Cường", "email": "cuong.le@company.com", "position": "Project Manager", "department": "IT"},
            {"name": "Phạm Thị Dung", "email": "dung.pham@company.com", "position": "Accountant", "department": "Finance"},
            {"name": "Hoàng Văn Em", "email": "em.hoang@company.com", "position": "Marketing Lead", "department": "Marketing"},
            {"name": "Ngô Thị Phương", "email": "phuong.ngo@company.com", "position": "Sales Executive", "department": "Sales"},
            {"name": "Đặng Văn Giang", "email": "giang.dang@company.com", "position": "Junior Developer", "department": "IT"},
            {"name": "Vũ Thị Hương", "email": "huong.vu@company.com", "position": "HR Specialist", "department": "HR"},
            {"name": "Bùi Văn Inh", "email": "inh.bui@company.com", "position": "System Admin", "department": "IT"},
            {"name": "Đỗ Thị Kim", "email": "kim.do@company.com", "position": "Finance Manager", "department": "Finance"},
            {"name": "Hồ Văn Linh", "email": "linh.ho@company.com", "position": "Sales Manager", "department": "Sales"},
            {"name": "Mai Thị Minh", "email": "minh.mai@company.com", "position": "Marketing Specialist", "department": "Marketing"},
            {"name": "Phan Văn Nam", "email": "nam.phan@company.com", "position": "Senior Developer", "department": "IT"},
            {"name": "Trương Thị Oanh", "email": "oanh.truong@company.com", "position": "HR Director", "department": "HR"},
            {"name": "Lý Văn Phát", "email": "phat.ly@company.com", "position": "Technical Lead", "department": "IT"},
            {"name": "Nguyễn Thị Quỳnh", "email": "quynh.nguyen@company.com", "position": "Accountant", "department": "Finance"},
            {"name": "Trần Văn Rồng", "email": "rong.tran@company.com", "position": "Sales Executive", "department": "Sales"},
            {"name": "Lê Thị Sen", "email": "sen.le@company.com", "position": "Marketing Manager", "department": "Marketing"},
            {"name": "Phạm Văn Tâm", "email": "tam.pham@company.com", "position": "DevOps Engineer", "department": "IT"},
            {"name": "Hoàng Thị Uyên", "email": "uyen.hoang@company.com", "position": "HR Specialist", "department": "HR"},
            {"name": "Ngô Văn Việt", "email": "viet.ngo@company.com", "position": "Full Stack Developer", "department": "IT"},
            {"name": "Đặng Thị Xuân", "email": "xuan.dang@company.com", "position": "Finance Analyst", "department": "Finance"},
            {"name": "Vũ Văn Yến", "email": "yen.vu@company.com", "position": "Sales Director", "department": "Sales"},
            {"name": "Bùi Thị Zung", "email": "zung.bui@company.com", "position": "Marketing Executive", "department": "Marketing"},
            {"name": "Đỗ Văn Anh", "email": "anh.do@company.com", "position": "QA Engineer", "department": "IT"},
            {"name": "Hồ Thị Bảo", "email": "bao.ho@company.com", "position": "HR Manager", "department": "HR"},
            {"name": "Mai Văn Công", "email": "cong.mai@company.com", "position": "Backend Developer", "department": "IT"},
            {"name": "Phan Thị Diệu", "email": "dieu.phan@company.com", "position": "Frontend Developer", "department": "IT"},
            {"name": "Trương Văn Đức", "email": "duc.truong@company.com", "position": "UI/UX Designer", "department": "IT"},
            {"name": "Lý Thị Nga", "email": "nga.ly@company.com", "position": "Product Manager", "department": "IT"}
        ]

        # Delete existing employees
        Employee.drop_collection()
        self.stdout.write('Deleted existing employees')

        # Create new employees
        for data in employees_data:
            employee = Employee(
                name=data["name"],
                email=data["email"],
                position=data["position"],
                department=data["department"]
            )
            employee.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(employees_data)} employees'))
