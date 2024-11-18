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
//Index route
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

// Display single planet route
app.get("/planets/:planetId", async (req, res) => {
  try {
    const id = req.params.planetId;
    const planetData = await Planet.findById(id);
    res.status(200).render("planets/show.ejs", { planet: planetData });
  } catch (error) {
    console.error(error);
    res.status(404).send("Planet not found");
  }
});

//Display edit planet form route
app.get("/planets/:planetId/edit", async (req, res) => {
  try {
    const id = req.params.planetId;
    const planetData = await Planet.findById(id);
    res.status(200).render("planets/edit.ejs", { planet: planetData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Cannot load the edit form");
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
app.put("/planets/:planetId", async (req, res) => {
  try {
    const id = req.params.planetId;
    const updateData = req.body;
    const updatedPlanet = await Planet.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).redirect("/planets")
  } catch (error) {
    console.error(error);
    res.status(501).send("Error updating planet");
  }
});

//DELETE
app.delete("/planets/:planetId", async (req, res) => {
  try {
    const id = req.params.planetId;
    const deletedPlanet = await Planet.findByIdAndDelete(id);
    res.status(200).redirect("/planets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not delete the planet");
  }
});

//Create express service
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000...");
});
