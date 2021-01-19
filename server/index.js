require("dotenv-flow").config();

const express = require("express");
const port = process.env.PORT || 6942;

const app = express();
app.listen(port, () => console.log("Listening on port", port, "(·_· )"));

app.use(express.static("client/"));
app.use(express.json({ limit: "1mb" }));
app.set("view engine", "ejs");
app.set("views", "views");

const softwares = require("./softwares");
const { sortObj, filterObj, sliceObj } = require("./helpers");
app.get("/", (_req, res) => res.render("index", {
  softwares: sliceObj(sortObj(
    softwares,
    ([_ka, sa], [_kb, sb]) => (sa.info.downloads < sb.info.downloads) ? 1 : -1
  ), 0, 10),
  title: "TOP DES APPLICATIONS"
}));

app.get("/contact", (_req, res) => res.render("contact"));
app.get("/account", (_req, res) => res.render("account"));

// Hehehe
app.get("/infos-legales", (_req, res) =>
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
app.get("/charte-de-contribution", (_req, res) =>
  res.redirect("https://github.com/team-spartha/perioeci"));

const route = name => require(`./routes/${name}`);
app.use("/news", route("news"));
app.use("/software", route("software"));

app.get("/:anything", (req, res) => {
  if ([
    "windows", "macos", "linux", "mobile", "ios",
    "indispensables", "populaires", "internet",
    "jeux", "professionnel", "utilitaires", "sécurité"
  ].includes(req.params.anything)) {
    res.render("index", {
      softwares: sliceObj(filterObj(
        softwares,
        ([_k, s]) => s.tags.includes(req.params.anything)
      ), 0, 15),
      title: `TOP DES APPLICATIONS ${req.params.anything.toUpperCase()}`
    })
  } else {
    res.status(404);
    res.render("oof-404");
  }

  res.end();
});

const lunr = require("lunr");
const softwareQuery = Object.entries(softwares)
                      .map(([key, software], id) => ({
                        ...software,
                        key,
                        id,
                        //info: undefined,
                        //...software.info
                      }))
//console.log(softwareQuery);

const searchIndex = lunr(function() {
  for (const field of [
    "name", "title", "info", "synopsis", "description", "tags"
  ]) this.field(field);

  this.add(softwareQuery);
});

console.log(searchIndex.search("atom"));