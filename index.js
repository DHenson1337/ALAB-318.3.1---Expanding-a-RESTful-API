const express = require("express");
const app = express();

//For the View Engines am not using but installed (haha whoops)
/* app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine()); */

const bodyParser = require("body-parser");
// import the data from the fake database files

const vegetables = require("./data/vegetables.js");
const jsxViewEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

// middleware imported
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

const PORT = 3000;

// Listen to see if our port is up
app.listen(PORT, () => {
  console.log("Navi: Link Listen!, Hello!, Listen!, Watch out!");
});

app.get("/", (req, res) => {
  res.send("<div>This is my home! Get OUT OF ME SWAMP!</div>");
});

//index route
app.get("/index", (req, res) => {
  res.send("<h1>A Certain Magical Index</h1>");
});

//default vegetables route
app.get("/api/vegetables", (req, res) => {
  res.json(vegetables);
});

//vegetable get by id route
app.get("/api/vegetables/:id", (req, res) => {
  // in this case, my unique identifier is going to be the array index
  // res.send(`<div>${req.params.id}</div>`)
  // this id can be anything, so i probably want to do some checking
  // before accessing the array
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

app.post("/api/vegetables", (req, res) => {
  console.log(req.body);
  // you should check this when you first start, but then get rid of this console.log
  // console.log(req.body);
  // need to add logic to change the check or not checked to true or false
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  // res.send('this was the post route');
  res.json(vegetables);
});

// DELETE
app.delete("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    vegetables.splice(req.params.id, 1);
    res.json(vegetables);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// patch updates part of it
app.patch("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    // patch only replaces the properties that we give it
    // find the id and replace only they new properties
    console.log(vegetables[req.params.id]);
    console.log(req.body);
    const newFruit = { ...vegetables[req.params.id], ...req.body };
    vegetables[req.params.id] = newFruit;
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// UPDATE
// put replaces a resource
app.put("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    // put takes the request body and replaces the entire database entry with it
    // find the id and replace the entire thing with the req.body
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    vegetables[req.params.id] = req.body;
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// E - Edit
app.get("/vegetables/:id/edit", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    res.render("vegetables/Edit", {
      fruit: vegetables[req.params.id],
      id: req.params.id,
    });
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// SHOW
// another version of READ is called a show route
// in this one, we can see more information on an idividual piece of data
app.get("/api/vegetables/:id", (req, res) => {
  // in this case, my unique identifier is going to be the array index
  // res.send(`<div>${req.params.id}</div>`)
  // this id can be anything, so i probably want to do some checking
  // before accessing the array
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});
