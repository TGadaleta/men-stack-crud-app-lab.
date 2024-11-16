//NPM Packages
import morgan from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import methodOverride from "method-override";

dotenv.config();

//Custom Modules
import "./db/connection.js";
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

//Server Routes
//GET
app.get("/", (req, res) => {
    res.render("index.ejs");
  });









//Create express service
app.listen(3000, () => {
    console.log("Listening on 3000...");
  });