// Ejemplo de la sección 4.4: routing, parámetros, query y Router.
// Ejecutar: npm run express:routing
import express, { Router } from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

const posts = [
  { slug: "atacama", title: "Atacama en cuatro días" },
  { slug: "patagonia", title: "Patagonia sin prisa" },
];

// Leer bodies: registrar ANTES de las rutas.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.send(
    "<h1>Routing</h1><p>Probá /posts/atacama?page=2 o /api/posts</p>",
  );
});

app.get("/posts/:slug", (request, response) => {
  const { slug } = request.params; // /posts/atacama → "atacama"
  const page = request.query.page ?? "1"; // /posts/atacama?page=2 → "2"

  response.json({ slug, page });
});

const postsRouter = Router();

postsRouter.get("/", (request, response) => {
  response.json(posts);
});

postsRouter.get("/:slug", (request, response, next) => {
  const post = posts.find((item) => item.slug === request.params.slug);
  if (!post) return next();
  response.json(post);
});

app.use("/api/posts", postsRouter);

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
