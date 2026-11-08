<div align="center">

<a href="https://nodejs.org/en" target="_blank"><img src="https://user-images.githubusercontent.com/3438503/260495760-ca5d8c24-b382-43d9-8fbe-d905b4b208f0.png" width="260" alt="Logo de Node.js" /></a>

# Clase 5 de NodeJS

### Curso progresivo · WebServer y API REST

**WebServer: HTTP nativo, Express y Handlebars**

![Node.js](https://img.shields.io/badge/Node.js-26.x_LTS-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

---

## CONTENIDO

1. [Objetivos y requisitos](#1-objetivos-y-requisitos)
2. [Qué es un WebServer](#2-qué-es-un-webserver)
3. [Servidor HTTP nativo](#3-servidor-http-nativo)
4. [Express y rutas](#4-express-y-rutas)
5. [Handlebars y res.render](#5-handlebars-y-resrender)
6. [Arquitectura](#6-arquitectura)
7. [Tarea 010](#tarea-010-sitio-renderizado-en-el-servidor)
8. [Referencias](#referencias)

---

> [!NOTE]
> Comenzamos desde el protocolo HTTP y avanzamos hasta generar HTML dinámico en el servidor. Handlebars se usa como herramienta didáctica para comprender renderizado del lado del servidor, no como sustituto obligatorio de un frontend moderno.

## 1. Objetivos y requisitos

Al finalizar podrás explicar el ciclo request/response, levantar un servidor, definir rutas y renderizar una lista de usuarios con un layout.

**Requisitos:** Node.js 26 LTS, npm y un navegador. Verificar:

```bash
node --version
npm --version
```

> [!IMPORTANT]
> Usaremos ES Modules. El archivo `package.json` debe contener `"type": "module"`.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 2. ¿Qué es un WebServer?

Un **servidor web** es un proceso que escucha peticiones HTTP en un puerto y produce respuestas. El navegador es el cliente.

```text
Navegador ── GET /users ──> Node.js
Navegador <─ 200 + HTML ─── Node.js
```

| Parte  | Ejemplo        | Responsabilidad           |
| ------ | -------------- | ------------------------- |
| Método | `GET`          | Intención de la petición  |
| Ruta   | `/users`       | Recurso solicitado        |
| Estado | `200`          | Resultado de la operación |
| Header | `Content-Type` | Formato de la respuesta   |
| Body   | HTML           | Contenido enviado         |

> [!WARNING]
> `localhost` identifica tu propia computadora. El puerto diferencia procesos; si `3000` está ocupado, el servidor no podrá escucharlo.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 3. Servidor HTTP nativo

Node incluye `node:http`; no requiere instalación.

```javascript
// src/native-server.js
import { createServer } from "node:http";

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<h1>Mi primer WebServer</h1>");
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not Found");
});

server.listen(3000, () => console.log("http://localhost:3000"));
```

El callback recibe la petición y la respuesta. Debemos decidir manualmente la ruta, el estado, los headers y el final del body. Express no reemplaza HTTP: organiza este trabajo.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 4. Express y rutas

```bash
npm init -y
npm install express@5
```

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  }
}
```

```javascript
// src/server.js
import express from "express";

const app = express();
app.get("/", (request, response) => response.send("<h1>Inicio</h1>"));
app.get("/about", (request, response) => response.send("<h1>Acerca de</h1>"));
app.use((request, response) => response.status(404).send("Not Found"));
app.listen(3000, () => console.log("http://localhost:3000"));
```

| HTTP nativo      | Express                     |
| ---------------- | --------------------------- |
| `request.url`    | `app.get("/ruta", handler)` |
| `writeHead(200)` | `res.status(200)`           |
| `end(body)`      | `res.send(body)`            |

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 5. Handlebars y `res.render()`

```bash
npm install express-handlebars@9
```

```javascript
import express from "express";
import { engine } from "express-handlebars";

const app = express();
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/users", (req, res) =>
  res.render("users", {
    title: "Users",
    users: [
      { id: 1, name: "Ana" },
      { id: 2, name: "Bruno" },
    ],
  }),
);
```

```handlebars
{{! src/views/layouts/main.handlebars }}
<html lang="es"><head><meta charset="utf-8" /><title>{{title}}</title></head>
  <body><nav><a href="/users">Usuarios</a></nav><main
    >{{{body}}}</main></body></html>
```

```handlebars
{{! src/views/users.handlebars }}
<h1>{{title}}</h1>
<ul>{{#each users}}<li>{{this.id}} · {{this.name}}</li>{{else}}<li>Sin usuarios</li>{{/each}}</ul>
```

`res.render()` combina datos, vista y layout. `{{value}}` escapa HTML; `{{{body}}}` es una excepción controlada del motor para insertar la vista.

> [!WARNING]
> No uses triple llave para datos ingresados por usuarios: desactiva el escape y puede habilitar inyección de HTML.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 6. Arquitectura

```text
clase-01/
├── src/
│   ├── public/styles.css
│   ├── views/layouts/main.handlebars
│   ├── views/users.handlebars
│   └── server.js
└── package.json
```

`express.static("src/public")` publica CSS e imágenes. La ruta decide **qué** representar; la vista decide **cómo** escribir el HTML.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

#### Tarea 010: Sitio renderizado en el servidor

> [!IMPORTANT]
> **Objetivo:** construir un sitio con `/`, `/users` y `/users/:id`, layout común, navegación, CSS estático y página 404.

**Pasos**

1. Crear primero una versión mínima con `node:http` y dos rutas.
2. Rehacerla con Express sin cambiar las URLs.
3. Renderizar usuarios con Handlebars y `res.render()`.
4. Mostrar un mensaje alternativo si el array está vacío.

**Criterios de aceptación**

- `npm run dev` inicia el servidor en el puerto 3000.
- `/users` responde `200`, `text/html` y lista todos los usuarios.
- `/users/999` responde `404` con una vista legible.
- Todas las vistas comparten layout y navegación.
- Los nombres se interpolan con doble llave.

> [!TIP]
> **Desafío:** agregar un partial `user-card.handlebars` y reutilizarlo dentro del `each`.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## Referencias

- 📘 [Node.js HTTP](https://nodejs.org/api/http.html)
- 📘 [Express 5](https://expressjs.com/)
- 📘 [Express routing](https://expressjs.com/en/guide/routing.html)
- 📘 [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- 📘 [Handlebars guide](https://handlebarsjs.com/guide/)

## Mentor

**Ariel Duarte** · Kopius · The Academy

<sub>[⬆ Volver al índice](#contenido)</sub>
