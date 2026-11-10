// Ejemplo de la sección 4.7: orden de 404 y manejo de errores.
// Ejecutar: npm run express:errors
// Rutas: /  ·  /error (dispara el 500)  ·  /cualquier-otra (404)
import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// 1) rutas
app.get("/", (request, response) => {
  response.send("<h1>Inicio</h1>");
});

app.get("/error", (request, response) => {
  throw new Error("Error de ejemplo");
});

// 2) 404: el último middleware cuando ninguna ruta respondió
app.use((request, response) => {
  response.status(404).send("<h1>404</h1><p>No encontrado.</p>");
});

// 3) errores: exactamente cuatro argumentos
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send("<h1>500</h1><p>Algo salió mal.</p>");
});

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exit(1);
  }

  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
