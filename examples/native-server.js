// Ejemplo de la sección 3.3: servidor HTTP nativo con routing manual.
// Ejecutar: npm run native
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 8080);
const HOST = process.env.HOST ?? "0.0.0.0";
const routes = new Map();
routes.set("GET /", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(`<!doctype html>
 <html lang="es">
   <head><meta charset="utf-8" /><title>Mi primer WebServer</title></head>
   <body><h1>Mi primer WebServer</h1></body>
 </html>`);
});

routes.set("GET /api/health", (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
});

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const handler = routes.get(`${request.method} ${url.pathname}`);
  if (handler) {
    handler(request, response);
    return;
  }
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not Found");
});
server.on("error", (error) => {
  console.error(`No se pudo iniciar el servidor: ${error.message}`);
  process.exit(1);
});
server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// createServer((request, response) => {
//   response.write(`Hello, Node Server!`);
//   response.end();
// }).listen(8080);
