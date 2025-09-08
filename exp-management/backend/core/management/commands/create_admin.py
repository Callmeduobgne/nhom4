from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create a superuser'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        
        # Check if admin user already exists
        if User.objects.filter(username='admin').exists():
            self.stdout.write('Admin user already exists')
            admin_user = User.objects.get(username='admin')
        else:
            # Create admin user
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@company.com',
                password='admin123'
            )
            self.stdout.write('Successfully created admin user')
        
        self.stdout.write(f'Username: admin')
        self.stdout.write(f'Email: admin@company.com')
        self.stdout.write(f'Password: admin123')
        self.stdout.write(f'Admin URL: http://localhost:8000/admin/')
