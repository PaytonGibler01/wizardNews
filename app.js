const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/posts/:id", (req, res) => {
  const id = req.params.id
  const post = postBank.find(id)
  if(!post.id) {
    res.status(404)
    const error = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(error)
  } else {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <header><img src="/logo.png"/>Wizard News</header>
  <div class='news-list'>
  <body>
    <div class='news-item'>
    <h1>${post.title}</h1>
    <h2>${post.content}</h2>
    </div>
  </body>
  </div>
</html>`;
  res.send(html)
}});

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">
            ${post.id}. ▲</span><a href="/posts/${post.id}">
            ${post.title}</a>
            <small>(by ${post.name})</small>
        
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
            
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;
  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
