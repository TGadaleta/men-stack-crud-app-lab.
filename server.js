//NPM Packages
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";

dotenv.config();
const app = express();

//Custom Modules
import "./db/connection.js";
import Planet from "./models/planets.js";

// Middlewares
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

//Server Routes
//GET
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// New planet template route
app.get("/planets/new", (req, res) => {
  res.render("planets/new.ejs");
});

//View all planets route
app.get("/planets", async (req, res) => {
  try {
    const allPlanets = await Planet.find({});
    res.render("planets/index.ejs", { planets: allPlanets });
  } catch (error) {
    console.error(error);
    res.send("There was an error getting all planets");
  }
});

//POST
app.post("/planets", async (req, res) => {
    try {
      const newPlanet = await Planet.create(req.body);
      res.status(200).redirect("/planets");
    } catch (error) {
      console.error(error);
      res.status(418).send("There was an error with creating a new planet");
    }
  });

//PUT

//DELETE

//Create express service
app.listen(3000, () => {
  console.log("Listening on 3000...");
});
