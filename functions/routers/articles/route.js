const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp();

const router = express.Router();
const endPoint = "/articles";

const db = admin.firestore();

// /articles
router
  .route(endPoint)
  .get(async (req, res) => {
    const messages = [];
    try {
      const querySnapshot = await db
        .collection("articles")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error, "@@@@@@@@@@@@@@@");
    }
    res.json({
      messsage: "Called by the GET method",
      messages,
    });
  })
  .post(async (req, res) => {
    const { uid, caption, imageUrl } = req.body;
    const createdAt = new Date().toISOString();

    try {
      const docRef = await db.collection("articles").add({
        uid,
        caption,
        imageUrl,
        createdAt,
      });
      const docSnapshot = await docRef.get();
      const createdMessage = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };

      res.json({
        message: "Called by the POST method",
        data: createdMessage,
      });
    } catch (error) {
      console.log(error, "@@@@@@@@@@@@@@@");
    }
  });

// /articles/1
router
  .route(`${endPoint}/:id`)
  .put(async (req, res) => {
    const { id } = req.params;
    const { uid, caption, imageUrl } = req.body;

    const newData = {
      uid,
      caption,
      imageUrl,
    };

    try {
      await db.collection("articles").doc(id).update(newData);
      res.json({
        message: `Updated!! ID : ${id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error occured by update`,
      });
      console.log(error, "@@@@@@@@@@@@@@@");
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await db.collection("articles").doc(id).delete();
      res.json({
        message: `Deleted!! ID : ${id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error occured by delete`,
      });
      console.log(error, "@@@@@@@@@@@@@@@");
    }
  });

module.exports = router;
