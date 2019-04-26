const express = require("express");
const mongo = require('mongodb');
const router = express.Router();
const path = require('path');
const Reviews = require("../../models/Reviews");

router.post('/requests', (req, res) => {
  const newReq = new Reviews(req.body);
  newReq.save()
      .then(doc => res.status(200))
      .catch(err => res.status(500).send(err));
});

/* Read */
router.get('/requests', (req, res) => {
  let query = req.query || {};
  // find requests and convert to array (with optional query)
  Reviews.find(query)
      .then(docs => res.status(200).send(docs))
      .catch(err => res.status(500).send(err));
});

router.get('/available', (req, res) => {
  // find requests and convert to array (with optional query)
  Reviews.find({ reviewer_id: null })
      .then(docs => res.status(200).send(docs))
      .catch(err => res.status(500).send(err));
});

router.put('/requests/:id', (req, res) => {
  const o_id = new mongo.ObjectId(req.params.id);
  // extract data from body and add timestamps
  const data = Object.assign({}, req.body, {
      complete: "true" 
  });
  // build out findOneAndUpdate variables to keep things organized
  let query = { _id: o_id },
      body = { $set: data },
      opts = { returnOriginal: false, upsert: true }
  // find and update document based on passed in id (via route)
  Reviews.findOneAndUpdate(query, body, opts)
      .then()
      .catch(err => res.status(500).send(err));
  //res.redirect("/inquiries");
});

router.put('/select/:id', (req, res) => {
  const o_id = new mongo.ObjectId(req.params.id);
  // extract data from body and add timestamps
  const data = Object.assign({}, req.body, {
      reviewer_id: req.body.reviewer_id
  });
  // build out findOneAndUpdate variables to keep things organized
  let query = { _id: o_id },
      body = { $set: data },
      opts = { returnOriginal: false, upsert: true }
  // find and update document based on passed in id (via route)
  Reviews.findOneAndUpdate(query, body, opts)
      .then()
      .catch(err => res.status(500).send(err));
  //res.redirect("/inquiries");
});

/* Delete */
router.delete('/requests/:id', (req, res) => {
  const o_id = new mongo.ObjectID(req.params.id);
  console.log(o_id);
  // remove one document based on passed in id (via route)
  Reviews.findOneAndDelete({ _id: o_id })
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(500).send(err));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = router;
