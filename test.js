// const { MongoClient, ServerApiVersion } = require("mongodb");
// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb://localhost:27017/todo";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// async function run () {
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     await client.close();
// }

// run();
// // async function run() {
// //   try {
// //     // Connect the client to the server (optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);

// const express = require('express');
// const mongoose = require('mongoose');
// const dbname = 'todo';
// //const Router = require('./routes');


// const app = express();
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/todo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// app.listen(3000);