import { Router } from "express";

import { nav, posts, site } from "../data/site.data.js";

const router = Router();

const banner = {
  title: "This is Road Trip",
  image: "banner.jpg",
  href: "#post-1",
  label: "Learn More",
};

function buildPostCards() {
  return posts.map((post, index) => ({
    ...post,
    anchor: `post-${index + 1}`,
    nextAnchor: index < posts.length - 1 ? `post-${index + 2}` : null,
  }));
}

function readField(body, key) {
  const value = body?.[key];
  return typeof value === "string" ? value : "";
}

router.get("/", (request, response) => {
  response.render("home", {
    title: "Inicio",
    section: "home",
    site,
    nav,
    banner,
    posts: buildPostCards(),
  });
});

router.get("/posts/:slug", (request, response, next) => {
  const { slug } = request.params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return next();
  }

  response.render("post", {
    title: post.title,
    section: "posts",
    site,
    nav,
    bodyClass: "subpage",
    headerAlt: true,
    post,
  });
});

router.get("/elements", (request, response) => {
  response.render("elements", {
    title: "Elements",
    section: "elements",
    site,
    nav,
    bodyClass: "subpage",
    headerAlt: true,
  });
});

router.post("/contact", (request, response) => {
  const name = readField(request.body, "name");
  const email = readField(request.body, "email");
  const message = readField(request.body, "message");
  const errors = [];

  if (name.trim().length < 2) errors.push("El nombre es obligatorio.");
  if (!email.includes("@")) errors.push("El email no es válido.");
  if (message.trim().length < 10) errors.push("El mensaje es demasiado corto.");

  const contact = { name, email, message, errors };
  const context = {
    title: "Inicio",
    section: "home",
    site,
    nav,
    banner,
    posts: buildPostCards(),
    contact,
  };

  if (errors.length > 0) {
    return response.status(422).render("home", context);
  }

  response.render("home", {
    ...context,
    contact: { ...contact, errors: [], sent: true },
  });
});

router.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.get("/api/posts", (request, response) => {
  response.json(posts);
});

export default router;
