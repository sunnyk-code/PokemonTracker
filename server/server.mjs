import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import api from "./routes/api.mjs";
import { removeOldPokemon } from "./routes/api.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
// Middleware function to remove old pokemon from the database
app.use(removeOldPokemon);

app.use("/api", api);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});