// App de ejemplo de Handlebars (secciones 5 y 6).
// Separar app.js de server.js permite importar la app en un test sin abrir un puerto.
import express from "express";
import path from "node:path";
import { engine } from "express-handlebars";
import { nav, posts, site } from "./data/demo.data.js";

const app = express();
const viewsDir = path.join(import.meta.dirname, "views");
const publicDir = path.join(import.meta.dirname, "..", "public");

app.engine(
  "handlebars",
  engine({
    layoutsDir: path.join(viewsDir, "layouts"),
    partialsDir: path.join(viewsDir, "partials"),
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: {
      eq: (a, b) => a === b,
      upper: (value) => String(value ?? "").toUpperCase(),
      formatDate: (value) =>
        new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
          new Date(value),
        ),
      json: (value) => JSON.stringify(value, null, 2),
    },
  }),
);

app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.render("home", {
    title: "Inicio",
    section: "home",
    site,
    nav,
    posts,
  });
});

app.get("/posts/:slug", (request, response, next) => {
  const post = posts.find((item) => item.slug === request.params.slug);

  if (!post) {
    return next();
  }

  response.render("post", {
    title: post.title,
    section: "posts",
    site,
    nav,
    post,
  });
});

app.get("/elements", (request, response) => {
  response.render("elements", {
    title: "Elementos",
    section: "elements",
    site,
    nav,
    posts,
  });
});

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

app.get("/error", (request, response) => {
  throw new Error("Error de ejemplo");
});

app.use((request, response) => {
  response
    .status(404)
    .render("404", { title: "No encontrado", section: "404", site, nav });
});

app.use((error, request, response, next) => {
  console.error(error);
  response
    .status(500)
    .render("500", { title: "Error", section: "500", site, nav });
});

export default app;
