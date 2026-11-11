import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import app from "../src/app.js";
import { posts } from "../src/data/site.data.js";

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET / renders the SSR home with the banner and every post", async () => {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(html, /This is Road Trip/);

  for (const post of posts) {
    assert.ok(html.includes(post.title), `missing title: ${post.title}`);
  }

  assert.equal(html.includes("{{"), false);
  assert.equal(html.includes("}}"), false);
});

test("GET /posts/:slug renders each existing post", async () => {
  for (const post of posts) {
    const response = await fetch(`${baseUrl}/posts/${post.slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, `status for ${post.slug}`);
    assert.ok(html.includes(post.title), `title for ${post.slug}`);
    assert.ok(html.includes(post.body[0]), `body for ${post.slug}`);
  }
});

test("GET /posts/no-existe returns the 404 view with the full layout", async () => {
  const response = await fetch(`${baseUrl}/posts/no-existe`);
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /Página no encontrada/);
  assert.match(html, /<header id="header"/);
  assert.match(html, /<footer id="footer">/);
  assert.match(html, /href="\/"/);
});

test("GET /elements renders with the shared layout and absolute image paths", async () => {
  const response = await fetch(`${baseUrl}/elements`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<nav id="menu">/);
  assert.match(html, /src="\/images\/pic01.jpg"/);
  assert.equal(html.includes('src="images/'), false);
});

test("POST /contact returns 422 with visible validation errors", async () => {
  const response = await fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ name: "A", email: "nope", message: "corto" }),
  });
  const html = await response.text();

  assert.equal(response.status, 422);
  assert.match(html, /El nombre es obligatorio\./);
  assert.match(html, /El email no es válido\./);
  assert.match(html, /El mensaje es demasiado corto\./);
  assert.match(html, /class="error-list"/);
});

test("POST /contact accepts valid data and shows feedback", async () => {
  const response = await fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Quiero reservar un viaje a la Patagonia.",
    }),
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Tu mensaje fue enviado/);
  assert.match(html, /value="Ada Lovelace"/);
});

test("GET /api/health responds with JSON", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  assert.equal(body.status, "ok");
});

test("GET /api/posts returns the same data used by the views", async () => {
  const response = await fetch(`${baseUrl}/api/posts`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.length, posts.length);
  assert.deepEqual(
    body.map((post) => post.slug),
    posts.map((post) => post.slug),
  );
});

test("static assets are served from public/", async () => {
  for (const asset of [
    "/assets/css/main.css",
    "/assets/js/main.js",
    "/assets/fonts/fontawesome-webfont.woff2",
    "/images/banner.jpg",
  ]) {
    const response = await fetch(`${baseUrl}${asset}`);
    assert.equal(response.status, 200, `status for ${asset}`);
  }
});

test("post titles are escaped and cannot inject scripts", async () => {
  const malicious = {
    slug: "xss",
    title: "<script>alert('xss')</script>",
    date: "2026-01-01",
    image: "banner.jpg",
    summary: "<b>resumen</b>",
    body: ["<img src=x onerror=alert(1)>"],
  };

  posts.push(malicious);

  try {
    const home = await (await fetch(`${baseUrl}/`)).text();
    assert.ok(home.includes("&lt;script&gt;alert"));
    assert.equal(home.includes("<script>alert"), false);

    const detail = await (await fetch(`${baseUrl}/posts/xss`)).text();
    assert.ok(detail.includes("&lt;script&gt;alert"));
    assert.equal(detail.includes("<script>alert"), false);
    assert.ok(detail.includes("&lt;img src"));
    assert.equal(detail.includes("<img src=x"), false);
  } finally {
    const index = posts.findIndex((post) => post.slug === "xss");
    if (index !== -1) posts.splice(index, 1);
  }
});
