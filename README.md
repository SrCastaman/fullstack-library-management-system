# Library Management System (Full Stack)

Aplicación full-stack de gestión de biblioteca con panel administrativo, desarrollada con Spring Boot en el backend y React en el frontend. El sistema incluye autenticación segura mediante JWT y control de acceso basado en roles.

---

## 🚀 Tecnologías

### 🧠 Backend
- Java 21
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Spring Data JPA
- Hibernate
- Maven

### 💻 Frontend
- React
- Tailwind CSS
- Axios
- JavaScript (ES6+)
- Componentes reutilizables

---

## 🧩 Arquitectura del sistema

- Backend: API REST con Spring Boot
- Frontend: SPA (Single Page Application) en React
- Autenticación: JWT
- Comunicación: HTTP (JSON)
- Base de datos: MySQL / H2 local

---

## 🔐 Autenticación y Seguridad

El sistema implementa autenticación mediante JWT:

- Login de administrador
- Generación de token JWT
- Protección de endpoints del backend
- Acceso restringido a usuarios autenticados
- Control de acceso basado en roles (ADMIN)

### Flujo de autenticación

1. El usuario inicia sesión
2. El backend valida credenciales
3. Se genera un JWT
4. El frontend almacena el token
5. El token se envía en cada petición protegida

---

## 🧠 Funcionalidades

### Backend
- CRUD de usuarios
- CRUD de libros
- CRUD de autores
- Gestión de reservas
- Devolución de libros
- Endpoints protegidos con JWT

### Frontend
- Dashboard administrativo
- Gestión visual de usuarios, libros y reservas
- Tablas dinámicas
- Formularios de creación y edición
- Consumo de API REST
- Interfaz responsive con Tailwind

---

## ▶️ Cómo ejecutar el proyecto

### 🔧 Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run


Servidor:
http://localhost:8080


## 📚 Backend Documentation

La documentación detallada de la API (endpoints, JSON, autenticación JWT, etc.) se encuentra en:

➡️ `/backend/README.md`
```



### 💻 Frontend (React)

```bash
cd frontend
npm install
npm start


Frontend:
http://localhost:3000
```


## 🔗 Comunicación

El frontend consume la API REST del backend mediante Axios.
Todas las operaciones (usuarios, libros, reservas) se gestionan en tiempo real.

## 📊 Estado del proyecto

- ✔ Backend funcional  
- ✔ Frontend funcional  
- ✔ CRUD completo  
- ✔ Sistema de reservas  
- ✔ Autenticación JWT  
- ✔ Panel administrativo  

---

## 📌 Mejoras futuras

- Deploy en cloud (Render / AWS / Docker)  
- Refresh tokens  
- Tests automatizados  
- Mejoras UI/UX  
