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
      const database = client.db("eventManagement");
      const usersCollection = database.collection("activities");
        
      // GET API
      app.get('/home', async (req, res) => {
        
        res.send("home page");
    });
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.listen(port, (err, res) => {
    console.log("listening on port ", port)
})