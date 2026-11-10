// Ejemplo de la sección 4.3: primera aplicación con Express.
// Ejecutar: npm run express:basic
import express from "express";

const app = express();
// app.use((request, response) => {
//   response.status(404).send("Page not found");
// });
// app.listen(8080);

const PORT = Number(process.env.PORT ?? 3000);
app.get("/", (request, response) => {
  response.send("<h1>Inicio</h1>");
});

app.get("/about", (request, response) => {
  response.send("<h1>Acerca de</h1>");
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
app.get("/", (request, response) => {
  response.send("Express Server");
});
