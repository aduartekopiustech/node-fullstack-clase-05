// Ejemplo mínimo de Handlebars (secciones 5.2 a 5.6).
// Ejecutar: npm run handlebars:basic
import express from "express";
import path from "node:path";
import { engine } from "express-handlebars";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const viewsDir = path.join(import.meta.dirname, "views");

app.engine(
  "handlebars",
  engine({
    layoutsDir: path.join(viewsDir, "layouts"),
    defaultLayout: "main",
    extname: ".handlebars",
  }),
);

app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.get("/", (request, response) => {
  // El controlador decide QUÉ datos recibe la vista.
  response.render("home", {
    title: "Hola Handlebars",
    curso: "Clase 5 de NodeJS",
    alumno: "Ariel",
    temas: ["Express", "Handlebars", "SSR"],
    html: "<b>Esto es HTML</b>",
  });
});

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exit(1);
  }

  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
