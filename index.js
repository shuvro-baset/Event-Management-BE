const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;


// use cors into my app 
app.use(cors());
// receive json data from frontend
app.use(express.json());

// database connection url
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oh18i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("event-management");
      const activitiesCollection = database.collection("activities");
      const eventCollection = database.collection("events")
        
      // GET API
      app.get('/home', async (req, res) => {
        console.log("get url hitted...")
        const cursor = activitiesCollection.find({})
        const activities = await cursor.toArray();
        res.send(activities);
    });

    // get single activities info
    app.get('/add-activities/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const activity = await activitiesCollection.findOne(query);
      console.log('load activities: ', id, activity);
      res.send(activity);
    })
    // get single activities info
    app.post('/add-activities/:id', async (req, res) => {
      const id = req.params.id;
      const newEvents = req.body
      const result = await eventCollection.insertOne(newEvents)
      console.log('load activities: ', id, result);
      res.send(result);
    })
     // get single activities info
    app.get('/my-events/', async (req, res) => {
      const cursor = eventCollection.find({})
        const events = await cursor.toArray();
      console.log('load my events: ', events);
      res.send(events);
    })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.listen(port, (err, res) => {
    console.log("listening on port ", port)
})