This microservice allows account recovery by passing through token validation. This technology fails. 
If the user wishes to recover their account, they will receive a token to reset their password.
Otherwise, they won't be able to do so.

## Architecture

### Architectural Style
- **Microservices Architecture**: This project implements an independent and autonomous microservice.
- **RESTful Architecture**: REST API for communication between services.
- **Layered Architecture**: Clear separation between routes, controllers, and database configuration.

### Design Patterns
- **MVC (Model-View-Controller)**: Separation of responsibilities between routes, controllers, and business logic.
- **Repository Pattern**: Abstraction of the data layer through a connection pool.
- **Dependency Injection**: Dependency injection through ES6 modules.
- **Factory Pattern**: Creating Email Transporters
- **Singleton Pattern**: Database Connection Pool

### Database
- **MySQL**: Relational database management system
- **mysql2**: MySQL driver for Node.js with promise support

### Security
- **bcrypt**: Secure password hashing library
- **UUID**: Unique token generation for recovery

### Email Communication
- **Nodemailer**: Email sending library
- **SMTP**: Email sending protocol

## Communication Protocols

### HTTP/HTTPS
- **REST API**: RESTful endpoints for communication
- **JSON**: Data exchange format
- **HTTP Status Codes**: Standard status codes for responses

### SMTP
- **SMTP Protocol**: For sending emails
- **Gmail Support**: Default configuration for Gmail SMTP

### Database
- **MySQL Protocol**: Communication with MySQL databases
- **Connection Pooling**: Efficient connection management

## 🚀 Installation and Configuration

### Prerequisites
- Node.js 20.x or higher
- MySQL 8.0 or higher
- Docker (optional)