# customer-management-system

# Tech stack
🔹Frontend
    React.js
    Axios
    Tailwind CSS
🔹Backend
    Spring Boot
    MariaDB
# Features

    ➕ Add new customers
    ✏️ Update existing customers
    🗑️ Delete customers
    📋 View customer list in table format
    📍 Manage multiple addresses per customer
    📱 Manage multiple mobile numbers
    🌆 Assign city and country to each address
    👨‍👩‍👧 Family relationship mapping between customers
    📂 Excel file upload for bulk customer import
    🔍 DTO-based clean data transfer to frontend

## Run
Steps:
git clone ...

# Backend
--open sql file using mariaDB
--create DB 
--run SQL

--open backend code using Intellij IDEA
--Configure Database
    spring.datasource.url=jdbc:mysql://localhost:3306/customer_db
    spring.datasource.username=root
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update

--start Spring Boot
--Backend runs at: http://localhost:8080

# Frontend
cd frontend
1. Install dependencies
npm install
2. Run React app
npm start

Frontend runs at: http://localhost:3000
