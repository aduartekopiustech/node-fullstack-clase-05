// Punto de entrada de la app de ejemplo de Handlebars.
// Ejecutar: npm run handlebars   (o npm run dev)
import app from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exit(1);
  }

  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    console.log(`${signal} recibido: cerrando servidor...`);
    server.close(() => process.exit(0));
  });
}
