from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    EmployeeViewSet, TransactionViewSet, ProjectViewSet,
    CustomerViewSet, AssetViewSet
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'assets', AssetViewSet, basename='asset')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
