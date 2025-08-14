# Full-Stack Ecommerce Website

A modern, full-stack ecommerce application built with React frontend and Spring Boot backend.

## 🚀 Features

### Frontend (React)
- **Modern UI**: Built with React, Tailwind CSS, and Material-UI
- **State Management**: Redux Toolkit for efficient state management
- **Authentication**: JWT-based authentication with protected routes
- **Responsive Design**: Mobile-first responsive design
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add, update, and remove items from cart
- **User Profile**: User registration, login, and profile management
- **Checkout Process**: Complete checkout flow (Razorpay integration ready)

### Backend (Spring Boot)
- **RESTful API**: Clean REST API architecture
- **Security**: Spring Security with JWT authentication
- **Database**: MySQL integration with JPA/Hibernate
- **Payment Gateway**: Razorpay integration support
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Proper error handling and responses

## 🛠️ Technology Stack

### Frontend
- React 18
- Redux Toolkit
- React Router DOM
- Material-UI (MUI)
- Tailwind CSS
- Axios
- JWT Decode

### Backend
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- MySQL 8
- JWT (JSON Web Tokens)
- Razorpay Java SDK
- Maven

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Java** (JDK 17 or higher)
- **Maven** (v3.6 or higher)
- **MySQL** (v8.0 or higher)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-fullstack
```

### 2. Database Setup

#### Create MySQL Database
```sql
CREATE DATABASE ecommerce_db;
```

#### Update Database Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### 3. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies and run
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

#### Navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Start development server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### 5. Run Both Services Concurrently (Optional)

From the root directory:
```bash
npm install
npm run install-all
npm run dev
```

## 🔐 Environment Variables

### Backend Configuration
Update `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JWT Configuration
jwt.secret=mySecretKey123456789012345678901234567890
jwt.expiration=86400000

# Razorpay Configuration (Optional)
razorpay.key.id=your_razorpay_key_id
razorpay.key.secret=your_razorpay_key_secret
```

## 📊 Database Schema

The application will automatically create the following tables:
- `users` - User information and authentication
- `categories` - Product categories
- `products` - Product catalog
- `carts` - User shopping carts
- `cart_items` - Items in shopping carts
- `orders` - Order information
- `order_items` - Items in orders

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

### Cart (Protected Routes)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{itemId}` - Update cart item
- `DELETE /api/cart/remove/{itemId}` - Remove item from cart

## 🚀 Deployment

### Backend Deployment
1. Build the application: `mvn clean package`
2. Run the JAR file: `java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your web server

## 🔧 Configuration Steps

### Required Manual Actions

1. **MySQL Database Setup**:
   - Install MySQL 8.0+
   - Create database: `CREATE DATABASE ecommerce_db;`
   - Update credentials in `application.properties`

2. **JWT Secret Configuration**:
   - Generate a secure JWT secret key (minimum 32 characters)
   - Update `jwt.secret` in `application.properties`

3. **Razorpay Integration** (Optional):
   - Sign up for Razorpay account
   - Get API keys from Razorpay dashboard
   - Update `razorpay.key.id` and `razorpay.key.secret`

4. **Product Data Integration**:
   - The application includes sample data initialization
   - To use data from https://github.com/codewithzosh/ecommerce-products-data:
     - Download the JSON data
     - Create a data migration script or use the admin panel to add products

## 🎨 Customization

### Adding New Product Categories
1. Use the admin panel or API to create categories
2. Categories are automatically available in product filters

### Styling Customization
- Modify `frontend/tailwind.config.js` for Tailwind customization
- Update Material-UI theme in `frontend/src/main.jsx`

### Adding New Features
- Backend: Add new controllers, services, and entities
- Frontend: Add new components and Redux slices

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify MySQL is running
   - Check database credentials
   - Ensure database exists

2. **JWT Token Issues**:
   - Verify JWT secret is properly configured
   - Check token expiration settings

3. **CORS Issues**:
   - Verify CORS configuration in `SecurityConfig.java`
   - Check frontend API base URL

4. **Port Conflicts**:
   - Backend default: 8080
   - Frontend default: 3000
   - Change ports in respective configuration files

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please create an issue in the repository.