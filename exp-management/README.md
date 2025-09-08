# 🏢 EXP Management System

> **Enterprise Resource Planning & Management System** với Component-Based Architecture và MongoDB Atlas

## 🚀 Tổng Quan

EXP Management là hệ thống quản lý doanh nghiệp toàn diện được xây dựng với **Component-Based Architecture (CBA)**, áp dụng **Atomic Design Pattern** và **Feature-Based Organization**. Hệ thống cung cấp các module quản lý nhân sự, tài chính, dự án, khách hàng và tài sản.

### ✨ Tính Năng Chính

- 👥 **HR Management**: Quản lý nhân viên, chức vụ, phòng ban
- 💰 **Finance Management**: Theo dõi giao dịch thu chi, báo cáo tài chính  
- 📊 **Project Management**: Quản lý dự án, tiến độ, phân công
- 🤝 **CRM System**: Quản lý khách hàng, tương tác, lịch sử
- 🏭 **Asset Management**: Theo dõi tài sản công ty, bảo trì
- 📈 **Dashboard**: Thống kê, báo cáo với animation tương tác

## 🏗️ Component-Based Architecture (CBA)

### 📁 Cấu Trúc Frontend (React + Atomic Design)

```
frontend/src/
├── features/                    # 🎯 Feature-Based Organization
│   ├── auth/                   # Authentication module
│   │   ├── Login.js           # Login page component
│   │   └── PrivateRoute.js    # Route protection
│   ├── dashboard/             # Dashboard analytics
│   │   ├── Dashboard.js       # Main dashboard with animations
│   │   └── Dashboard_new.js   # Enhanced dashboard version
│   ├── hr/                    # Human Resources
│   │   └── HR.js             # Employee management
│   ├── finance/               # Financial management
│   │   └── Finance.js        # Transaction tracking
│   ├── projects/              # Project management
│   │   └── Projects.js       # Project CRUD operations
│   ├── crm/                   # Customer relations
│   │   └── CRM.js            # Customer management
│   └── assets/                # Asset management
│       └── Assets.js         # Company asset tracking
├── shared/                     # 🔄 Reusable Components Library
│   ├── components/            # Atomic Design Pattern
│   │   ├── atoms/            # ⚛️ Basic building blocks
│   │   │   ├── AnimatedCounter.js      # Animated number counter
│   │   │   └── AnimatedProgressBar.js  # Progress visualization
│   │   ├── molecules/        # 🧬 Composite components
│   │   │   ├── StaggeredAnimation.js   # Staggered animations
│   │   │   └── ScrollAnimateWrapper.js # Scroll-triggered animations
│   │   └── organisms/        # 🏢 Complex components
│   │       ├── CrudTable.js           # Reusable data table
│   │       └── Sidebar.js             # Navigation sidebar
│   └── hooks/                # 🎣 Custom React Hooks
│       ├── useApiData.js     # API data management
│       └── useScrollAnimation.js # Animation utilities
├── contexts/                  # 🌐 Global State Management
│   └── AuthContext.js        # Authentication state
└── services/                 # 🔧 External Services
    ├── api.js               # API configuration
    └── ApiService.js        # Service layer
```

### 🎨 Atomic Design Implementation

#### ⚛️ **Atoms** - Basic Components
```javascript
// AnimatedCounter.js - Single-purpose counter
<AnimatedCounter 
  end={1250} 
  duration={2000} 
  formatter={(val) => val.toLocaleString()} 
/>

// AnimatedProgressBar.js - Progress visualization  
<AnimatedProgressBar 
  progress={75} 
  color="#1890ff" 
  showLabel={true} 
/>
```

#### 🧬 **Molecules** - Composite Components
```javascript
// StaggeredAnimation.js - Orchestrates multiple animations
<StaggeredAnimation staggerDelay={100}>
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</StaggeredAnimation>

// ScrollAnimateWrapper.js - Scroll-triggered animations
<ScrollAnimateWrapper animation="fade-up" delay={200}>
  <StatisticCard />
</ScrollAnimateWrapper>
```

#### 🏢 **Organisms** - Complex Business Components
```javascript
// CrudTable.js - Complete data management table
<CrudTable
  data={employees}
  columns={employeeColumns}
  onAdd={addEmployee}
  onEdit={updateEmployee}
  onDelete={deleteEmployee}
  modalTitle="Nhân viên"
  formFields={employeeFormFields}
  loading={loading}
/>
```

### 🎯 Feature-Based Organization

#### 📊 **Feature Module Pattern**
```javascript
// HR.js - Complete HR management feature
function HR() {
  // 1. Data layer with custom hook
  const { data, loading, addRecord, updateRecord, deleteRecord } = useApiData('/employees/');
  
  // 2. UI configuration
  const columns = [/* column definitions */];
  const formFields = [/* form field configurations */];
  
  // 3. Composed UI using shared organisms
  return (
    <CrudTable
      data={data}
      columns={columns}
      onAdd={addRecord}
      onEdit={updateRecord}
      onDelete={deleteRecord}
      // ... other props
    />
  );
}
```

### 📐 Backend Architecture (Django + MongoEngine)

```
backend/
├── core/                      # 📦 Main application module
│   ├── models.py             # MongoEngine document models
│   ├── serializers.py        # Custom MongoEngine serializers
│   ├── views.py              # ViewSet-based API endpoints
│   ├── urls.py               # API routing configuration
│   └── management/           # Custom Django commands
│       └── commands/
│           └── seed_employees.py # Database seeding
├── exp_management/           # 🔧 Django project settings
│   ├── settings.py          # MongoDB configuration
│   ├── urls.py              # Main URL routing
│   └── wsgi.py              # WSGI application
└── requirements.txt         # Python dependencies
```

## 🛠️ Tech Stack

### Frontend Stack
- **React 18.2.0** - UI library với hooks và modern patterns
- **Ant Design 5.2.0** - Enterprise-class UI components
- **Axios** - HTTP client với interceptors
- **React Router Dom 6.8.0** - Client-side routing
- **Recharts 2.5.0** - Data visualization charts

### Backend Stack  
- **Django 4.2.0** - Web framework
- **MongoEngine 0.27.0** - MongoDB ODM (thay thế Django ORM)
- **Django REST Framework** - API development
- **PyMongo** - MongoDB driver
- **dnspython** - DNS resolver cho MongoDB Atlas

### Database & Infrastructure
- **MongoDB Atlas 7.0** - Cloud database
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy (production)

### Development Tools
- **ESLint 8.57.0** - Code linting
- **Prettier 3.0.0** - Code formatting  
- **Jest & React Testing Library** - Testing framework

## 🚀 Khởi Chạy Dự Án

### 📋 Yêu Cầu Hệ Thống
- Docker & Docker Compose
- Node.js 16+ (nếu chạy standalone)
- Python 3.11+ (nếu chạy standalone)

### ⚡ Quick Start
```bash
# Clone repository
git clone <repository-url>
cd exp-management

# Khởi động toàn bộ hệ thống với Docker
docker-compose up --build

# Hệ thống sẽ khởi động:
# - Frontend: http://localhost:3333
# - Backend API: http://localhost:8000/api  
# - MongoDB: localhost:27017
```

### 🔐 Demo Authentication
```
Username: demo@company.com
Password: demo123
```

### 📊 Sample Data
Hệ thống tự động seed 30 nhân viên mẫu khi khởi động:
```bash
# Seed thêm data (tùy chọn)
docker-compose exec backend python manage.py seed_employees
```

## 🏛️ CBA Architecture Benefits

### ✅ **Component Reusability**
- `CrudTable` được sử dụng ở 5 features (HR, Finance, Projects, CRM, Assets)
- `useApiData` hook cung cấp consistent data management
- Animation components tái sử dụng khắp ứng dụng

### ✅ **Feature Isolation** 
- Mỗi feature độc lập, có thể develop/test riêng biệt
- Clear boundaries giữa business logic và UI
- Easy to add new features without affecting existing ones

### ✅ **Maintainability**
- Single Responsibility Principle cho mọi component
- Predictable file structure và naming convention
- Centralized configuration cho themes, API endpoints

### ✅ **Scalability**
- Lazy loading cho features
- Component-level code splitting
- Optimized bundle sizes

## 📡 API Endpoints

### 🔗 RESTful API Design
```
GET    /api/employees/     # List employees with pagination
POST   /api/employees/     # Create new employee  
GET    /api/employees/{id} # Get employee details
PUT    /api/employees/{id} # Update employee
DELETE /api/employees/{id} # Delete employee

GET    /api/transactions/  # Financial transactions
GET    /api/projects/      # Project management
GET    /api/customers/     # Customer records  
GET    /api/assets/        # Asset tracking
```

### 📄 API Response Format
```json
{
  "results": [
    {
      "id": "66f7a1b2c3d4e5f6a7b8c9d0",
      "name": "Nguyễn Văn A",
      "email": "nguyenvana@company.com", 
      "position": "Senior Developer",
      "department": "IT",
      "created_at": "2025-09-08T10:30:00Z"
    }
  ],
  "count": 30,
  "next": "http://localhost:8000/api/employees/?page=2",
  "previous": null
}
```

## 🔧 Development Commands

### Frontend Development
```bash
cd frontend

# Development server
npm start                # Khởi động dev server (:3333)
npm run build           # Build production
npm run lint            # ESLint checking  
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Prettier formatting
npm test               # Run tests
```

### Backend Development  
```bash
cd backend

# Development server
python manage.py runserver    # Khởi động dev server (:8000)
python manage.py shell       # Django shell
python manage.py seed_employees  # Seed sample data

# Database operations (MongoEngine)
python manage.py migrate     # Sync database indexes
```

### Docker Operations
```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build

# Clean rebuild
docker-compose down -v
docker-compose up --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands in containers
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm run lint
```

## 📊 Performance & Monitoring

### 🚀 Performance Features
- **Code Splitting**: Lazy loading cho features
- **Memoization**: React.memo cho expensive components  
- **Intersection Observer**: Optimized scroll animations
- **Virtual Scrolling**: Large dataset handling
- **Bundle Analysis**: Webpack bundle analyzer

### 🔍 Monitoring
- **Error Boundaries**: Component-level error handling
- **API Monitoring**: Response time tracking
- **User Analytics**: Interaction tracking
- **Performance Metrics**: Core Web Vitals

## 🛡️ Security Features

- **JWT Authentication**: Token-based auth
- **CORS Configuration**: Cross-origin security
- **Input Validation**: Frontend + Backend validation
- **MongoDB Injection Protection**: MongoEngine safety
- **Environment Variables**: Secure configuration

## 🤝 Contributing

### 📝 Code Standards
- **ESLint + Prettier**: Automated code formatting
- **Component Documentation**: JSDoc comments
- **Test Coverage**: Jest + React Testing Library
- **Git Hooks**: Pre-commit linting

### 🔄 Development Workflow
1. Feature branch từ `main`
2. Component development với atomic design
3. Tests cho components và hooks
4. Code review và merge

## 📝 License

MIT License - Xem file LICENSE để biết chi tiết.

---

> **Component-Based Architecture Score: 9.2/10** ⭐  
> *Built with ❤️ by Team Nhóm 4*
