# Library API

API REST para la gestión de una biblioteca: usuarios, autores, libros y reservas. Permite CRUD completo y operaciones como devolver libros o consultar reservas de usuarios.

## Tabla de Contenidos

* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Uso](#uso)
* [Endpoints](#endpoints)
* [Ejemplos de JSON](#ejemplos-de-json)
* [Colección Postman](#colección-postman)
* [Licencia](#licencia)

---

## Tecnologías

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* Postman (para pruebas)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SrCastaman/API-Biblioteca.git

# Entrar al directorio
cd library-api

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

La API se ejecuta por defecto en:
`http://localhost:8080`

---

## Uso

Puedes interactuar con la API usando **Postman**, **curl** o cualquier cliente HTTP.
La API tiene **usuarios, autores, libros y reservas**. En cada entidad tiene su propio CRUD, además de un Patch para actualizar datos específicos. Para las reservas, se puede devolver un libro y consultar las reservas hechas en total y los libros que siguen pendiente de devolución de un usuario.

---

## Endpoints

### Usuarios

| Método | Endpoint           | Descripción                     |
| ------ | ------------------ | ------------------------------- |
| GET    | /api/usuarios      | Listar todos los usuarios       |
| GET    | /api/usuarios/{id} | Obtener usuario por ID          |
| POST   | /api/usuarios      | Crear usuario                   |
| PUT    | /api/usuarios/{id} | Actualizar usuario completo     |
| PATCH  | /api/usuarios/{id} | Actualizar usuario parcialmente |
| DELETE | /api/usuarios/{id} | Eliminar usuario                |

### Autores

| Método | Endpoint          | Descripción                   |
| ------ | ----------------- | ----------------------------- |
| GET    | /api/autores      | Listar todos los autores      |
| GET    | /api/autores/{id} | Obtener autor por ID          |
| POST   | /api/autores      | Crear autor                   |
| PUT    | /api/autores/{id} | Actualizar autor completo     |
| PATCH  | /api/autores/{id} | Actualizar autor parcialmente |
| DELETE | /api/autores/{id} | Eliminar autor                |

### Libros

| Método | Endpoint         | Descripción                   |
| ------ | ---------------- | ----------------------------- |
| GET    | /api/libros      | Listar todos los libros       |
| GET    | /api/libros/{id} | Obtener libro por ID          |
| POST   | /api/libros      | Crear libro                   |
| PUT    | /api/libros/{id} | Actualizar libro completo     |
| PATCH  | /api/libros/{id} | Actualizar libro parcialmente |
| DELETE | /api/libros/{id} | Eliminar libro                |

### Reservas

### Reservas

| Método | Endpoint                                  | Descripción                                           |
| ------ | ----------------------------------------- | ----------------------------------------------------- |
| GET    | /api/reservas                             | Listar todas las reservas                             |
| GET    | /api/reservas/{id}                        | Obtener reserva por ID                                |
| POST   | /api/reservas                             | Crear nueva reserva (body: libroId y usuarioId)       |
| PUT    | /api/reservas/{id}                        | Actualizar toda la reserva                            |
| PATCH  | /api/reservas/{id}                        | Actualizar parcialmente la reserva                    |
| DELETE | /api/reservas/{id}                        | Eliminar reserva                                      |
| POST   | /api/reservas/devolver/{reservaId}        | Marcar un libro como devuelto                         |
| GET    | /api/reservas/usuario/{usarioId}          | Listar todas las reservas de un usuario               |
| GET    | /api/reservas/usuario/{usuarioId}/libros  | Listar libros actualmente reservados por un usuario   |



---

## Ejemplos de JSON

### Crear Usuario

```json
{
    "nombre": "Mario",
    "email": "mario@example.com"
}
```

### Crear Autor

```json
{
    "nombre": "Brandon Sanderson"
}
```

### Crear Libro

```json
{
    "nombre": "El heroe de las eras",
    "disponible": true,
    "autor": {
        "id": 1
    }
}
```

### Crear Reserva

```json
{
    "libroId": 1,
    "usuarioId": 1
}
```

### Actualizar Reserva Parcial

```json
{
    "fechaDevolucion": "2025-09-26T15:00:00"
}
```

---

## Colección Postman

Importa la colección `Library Collection` desde Postman para probar todos los endpoints.

* Variable `baseURL`: `http://localhost:8080`

---

Autor: SrCastaman
