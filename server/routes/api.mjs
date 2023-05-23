import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

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
  };
  let collection = await db.collection("Markers");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


export default router;