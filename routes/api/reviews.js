const express = require("express");
const mongo = require("mongodb");
const router = express.Router();
const path = require("path");
const Reviews = require("../../models/Reviews");
const nodeMailer = require("nodemailer");

router.post("/requests", (req, res) => {
  const newReq = new Reviews(req.body);
  newReq
    .save()
    .then(doc => res.status(200))
    .catch(err => res.status(500).send(err));
});

/* Read */
router.get("/requests", (req, res) => {
  let query = req.query || {};
  // find requests and convert to array (with optional query)
  Reviews.find(query)
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(500).send(err));
});

router.get("/available", (req, res) => {
  // find requests and convert to array (with optional query)
  Reviews.find({ reviewer_id: null })
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(500).send(err));
});

router.get("/byfield", (req, res) => {
  let query = req.query.field;
  console.log(query);
  // find requests and convert to array (with optional query)
  Reviews.find({ reviewer_id: null, field: query })
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(500).send(err));
});

router.get("/sort", (req, res) => {
  let sortField = req.query.field;
  let usrId = req.query.user_id;
  // find requests and convert to array (with optional query)
  Reviews.find({ user_id: usrId, field: sortField })
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(500).send(err));
});

router.get("/sortreviewers", (req, res) => {
  let sortField = req.query.field;
  let usrId = req.query.reviewer_id;
  // find requests and convert to array (with optional query)
  Reviews.find({ reviewer_id: usrId, field: sortField })
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(500).send(err));
});

router.put("/requests/:id", (req, res) => {
  const o_id = new mongo.ObjectId(req.params.id);
  // extract data from body and add timestamps
  const data = Object.assign({}, req.body, {
    complete: "true"
  });
  // build out findOneAndUpdate variables to keep things organized
  let query = { _id: o_id },
    body = { $set: data },
    opts = { returnOriginal: false, upsert: true };
  // find and update document based on passed in id (via route)
  Reviews.findOneAndUpdate(query, body, opts)
    .then()
    .catch(err => res.status(500).send(err));
  //res.redirect("/inquiries");
});

router.put("/select/:id", (req, res) => {
  const o_id = new mongo.ObjectId(req.params.id);
  // extract data from body and add timestamps
  const data = Object.assign({}, req.body, {
    reviewer_id: req.body.reviewer_id
  });

  Reviews.findOne(o_id).exec(function(err, users) {

    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply.reviewme@gmail.com",
        pass: "$Cosc412ReviewMe$"
      }
    });

    let mailOptions = {
      from: "ReviewMe New Request",
      to: users.user_email,
      subject: `Review Request Confirmation: ${users.title}`,
      html: `<ul><li>Please forward the documents to: ${
        req.body.reviewer_email
      } so you can get your work reviewed! Don't forget to mark it as
     complete once you recieved feedback.</li><li>This is for 
     ${users.title}: ${users.notes}</li></ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
    });
  });
  // build out findOneAndUpdate variables to keep things organized
  let query = { _id: o_id },
    body = { $set: data },
    opts = { returnOriginal: false, upsert: true };
  // find and update document based on passed in id (via route)
  Reviews.findOneAndUpdate(query, body, opts)
    .then()
    .catch(err => res.status(500).send(err));
});

/* Delete */
router.delete("/requests/:id", (req, res) => {
  const o_id = new mongo.ObjectID(req.params.id);
  console.log(o_id);
  // remove one document based on passed in id (via route)
  Reviews.findOneAndDelete({ _id: o_id })
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(500).send(err));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

module.exports = router;
