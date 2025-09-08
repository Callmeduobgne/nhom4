import os
import django
import sys

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exp_management.settings')
django.setup()

from django.contrib.auth.models import User
from django.db import connection

try:
    # Check if tables exist
    with connection.cursor() as cursor:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='auth_user';")
        result = cursor.fetchone()
        
        if not result:
            print("❌ auth_user table does not exist. Running migrations...")
            from django.core.management import execute_from_command_line
            execute_from_command_line(['manage.py', 'migrate'])
        
    # Create superuser
    if not User.objects.filter(username='admin').exists():
        admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@company.com',
            password='admin123'
        )
        print("✅ Created admin user successfully")
    else:
        print("✅ Admin user already exists")
    
    # Create demo user
    if not User.objects.filter(username='demo').exists():
        demo_user = User.objects.create_user(
            username='demo',
            email='demo@company.com',
            password='demo123'
        )
        print("✅ Created demo user successfully")
    else:
        print("✅ Demo user already exists")
    
    print("\n📋 TÀI KHOẢN ĐĂNG NHẬP:")
    print("👤 Admin: admin / admin123")
    print("👤 Demo:  demo / demo123")
    print("🔗 Login URL: http://localhost:3333")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
