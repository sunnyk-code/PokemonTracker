import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

export const removeOldPokemon = async (req, res, next) => {

  // Calculate the time threshold (1 hour ago)
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 1);

  // Remove entries older than the threshold
  const result = await db.collection("Markers").deleteMany({
    timestamp: { $lt: threshold },
  });

  next();

};

// This will get all of the markers.
router.get("/", async (req, res) => {
  let collection = await db.collection("Markers");
  // results will be an array of objects, where each object is a document from the collection
  let results = await collection.find({}).toArray(); 
  res.send(results).status(200);
});

// This will be used to create a new marker.
router.post("/", async (req, res) => {
  console.log(req.body);
  let newDocument = {
    name: req.body.name,
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    timestamp: new Date()
  };
  let collection = await db.collection("Markers");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


export default router;