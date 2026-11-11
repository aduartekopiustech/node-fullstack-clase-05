import path from "node:path";

import express from "express";
import { engine } from "express-handlebars";

import { nav, site } from "./data/site.data.js";
import { eq, formatDate } from "./helpers.js";
import routes from "./routes/index.js";

const projectRoot = path.join(import.meta.dirname, "..");

const app = express();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(projectRoot, "public")));

app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    helpers: { eq, formatDate },
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(import.meta.dirname, "views"));

app.use((request, response, next) => {
  response.locals.site = site;
  response.locals.nav = nav;
  next();
});

app.use(routes);

app.use((request, response) => {
  response.status(404).render("404", {
    title: "Página no encontrada",
    section: "",
    site,
    nav,
    bodyClass: "subpage",
    headerAlt: true,
  });
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).render("500", {
    title: "Error del servidor",
    section: "",
    site,
    nav,
    bodyClass: "subpage",
    headerAlt: true,
  });
});

export default app;
