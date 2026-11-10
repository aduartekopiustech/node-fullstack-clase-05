// Ejemplo de la sección 4.5: middleware, logger y error handler.
// Ejecutar: npm run express:middleware
// Rutas: /  ·  /boom (error sincrónico)  ·  /async-boom (promesa rechazada)
import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Middleware logger: se ejecuta en el orden en que se registra.
app.use((request, response, next) => {
  const startedAt = Date.now();

  response.on("finish", () => {
    console.log(
      `${request.method} ${request.url} → ${response.statusCode} (${Date.now() - startedAt} ms)`,
    );
  });

  next();
});

app.get("/", (request, response) => {
  response.send("<h1>Middleware</h1><p>Mirá la consola del servidor.</p>");
});

app.get("/boom", (request, response) => {
  throw new Error("Explota a propósito (sincrónico)");
});

app.get("/async-boom", async (request, response) => {
  // Express 5 detecta la promesa rechazada y la envía al error handler.
  throw new Error("Explota a propósito (async)");
});

app.use((request, response) => {
  response.status(404).send("Not Found");
});

// Error handler: SIEMPRE cuatro argumentos.
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
