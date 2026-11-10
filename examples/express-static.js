// Ejemplo de la sección 4.6: servir contenido estático con express.static().
// Ejecutar: npm run express:static
// Probá: /assets/css/main.css  ·  /images/placeholder.svg
import express from "express";
import path from "node:path";

const app = express();
const PORT = Number(process.env.PORT ?? 8080);

// Ruta absoluta: no depende del directorio desde donde se lanzó el proceso.
const publicDir = path.join(import.meta.dirname, "public");

app.use(
  express.static(publicDir, {
    maxAge: "1h",
    etag: true,
    lastModified: true,
  }),
);

app.get("/", (request, response) => {
  response.send(`<!doctype html>
<html lang="es">
  <head><meta charset="utf-8" /><title>Estáticos</title></head>
  <body>
    <h1>Contenido estático</h1>
    <ul>
      <li><a href="/assets/css/main.css">/assets/css/main.css</a></li>
      <li><a href="/images/placeholder.svg">/images/placeholder.svg</a></li>
    </ul>
  </body>
</html>`);
});

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

app.use((request, response) => {
  response.status(404).send("Not Found");
});

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exit(1);
  }

  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
