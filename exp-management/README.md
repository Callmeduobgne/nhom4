# EXP Management - MongoDB Atlas

## Cấu hình Database

Database sử dụng MongoDB Atlas:

- URI: `mongodb+srv://callmeduongne:<password>@luong.efq8mjx.mongodb.net/exp_management`
- Cần thay `<password>` bằng password thực tế trong file `.env`

## Khởi chạy nhanh

```bash
cd exp-management
# Chỉnh sửa password trong backend/.env
docker-compose up --build
```

## Truy cập

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:8000/api>  
- Database: MongoDB Atlas (cloud)

## Dừng

```bash
docker-compose down
```

## Xóa data và rebuild

```bash
docker-compose down -v
docker-compose up --build
```

- **Asset Management**: Company asset tracking and management

## Tech Stack

- Frontend: React + Ant Design + Axios
- Backend: Django + Django REST Framework
- Database: SQLite (can be switched to PostgreSQL)

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `/api/employees/` - Employee management
- `/api/transactions/` - Financial transactions
- `/api/projects/` - Project management
- `/api/customers/` - Customer records
- `/api/assets/` - Asset management

## Architecture

Component-based architecture with:

- Reusable React components
- RESTful API design
- Modular Django apps
- Clean separation of concerns
