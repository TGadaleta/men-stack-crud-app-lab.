import mongoose from "mongoose";

const planetSchema = mongoose.Schema({
  name: String,
  type: String,
  radius: Number,
  orbit: Number,
  moons: Number,
});

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;