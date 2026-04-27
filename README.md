# Service Marketplace

A backend Service Marketplace platform designed to manage services and categories with secure authentication and authorization.

This project was developed alongside a course focused on learning JWT-based authentication and authorization, with an emphasis on building secure and scalable backend systems using Spring Boot.

---

## Features

* JWT-based Authentication and Authorization
* User Sign In and Sign Up functionality
* Role-based access control
* Category management (create, view, update)
* RESTful API design

---

## Tech Stack

**Backend**

* Java
* Spring Boot
* Spring Security
* JWT

**Database**

* H2 Database (in-memory)

**Build Tool**

* Maven

---

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/KalanaNilwakka/Service-Marketplace.git
cd Service-Marketplace
```

### 2. Build the project

```bash
mvn clean install
```

### 3. Run the application

```bash
mvn spring-boot:run
```

---

## Database

This project uses the H2 in-memory database for development and testing purposes.

You can access the H2 console (if enabled) via:

```
http://localhost:8080/h2-console
```

---

## API Endpoints

### Authentication

* POST `api/v1/noauth/signin`
* POST `api/v1/noauth/signup`

### Categories

* GET `api/v1/categories`
* POST `api/v1/categories`
* PUT `api/v1/categories/{categoryId}`

---

## Notes

* This project is intended as a learning implementation of JWT authentication and authorization.
* It can be extended further with additional modules such as booking, payments, and microservices architecture.



