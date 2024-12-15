const express = require("express");
const app = express();
const port = 5002;
var path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
    // res.sendFile("public/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile("public/pages/about.html", { root: __dirname });
});

app.get("/blog", (req, res) => {
    res.sendFile("public/pages/blog.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
