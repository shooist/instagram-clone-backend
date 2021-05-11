const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const messageRouter = require("./routers/articles/route");

const app = express();
const region = "asia-northeast1";
app.use(cors({ origin: true }));
app.use("/", messageRouter);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase1234!");
// });

exports.api = functions.region(region).https.onRequest(app);
