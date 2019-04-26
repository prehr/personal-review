const express = require("express");
const mongo = require('mongodb');
const router = express.Router();
const path = require('path');
// Load User model
const Reviews = require("../../models/Reviews");

// @route POST api/users/register
// @desc Register user
// @access Public
// router.post("/newrequest", (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateRegisterInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       return res.status(400).json({ email: "Email already exists" });
//     }
//     const newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       reviewer: req.body.reviewer
//     });
//     // Hash password before saving in database
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser
//           .save()
//           .then(user => res.json(user))
//           .catch(err => console.log(err));
//       });
//     });
//   });
// });

// router.get("/getrequests", (req, res) => {
//   let query = req.query || {};
//   // find requests and convert to array (with optional query)
//   User.find(query)
//     .then(docs => res.status(200).send(docs))
//     .catch(err => res.status(500).send(err));
// });

// //dont work
// // router.get("/:id", (req, res) => {
// //   console.log(req);
// //   User.findById(req.params.id) // <== Specify your id here
// //     .then(doc => {
// //       console.log(res.data);
// //       return res.data;
// //     })
// //     .catch(err => console.log(err));
// // });
// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;
//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ emailnotfound: "Email not found" });
//     }
//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         };
//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926 // 1 year in seconds
//           },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//           }
//         );
//       } else {
//         return res
//           .status(400)
//           .json({ passwordincorrect: "Password incorrect" });
//       }
//     });
//   });
// });


/** Create */
router.post('/requests', (req, res) => {
  // extract data from body and add timestamps
  //const data = { ...req.body, created: new Date(), updated: new Date() };
  const newReq = new Reviews(req.body);

  // let transporter = nodeMailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //         user: 'tuyoungprofessionals@gmail.com',
  //         pass: 'myPassword1'
  //     }
  // });
  // let mailOptions = {
  //     from: '"TU Young Professionals" <no-reply-tuProfessionals@gmail.com>',
  //     to: req.body.email,
  //     subject: "TU Young Professionals",
  //     text: "Thank you for your interest in our workshops! A member of our team will reach out soon.", 
  //     html: '<b>Thank you for your interest in our workshops! A member of our team will reach out soon.</b>'
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     console.log('Message %s sent: %s', info.messageId, info.response);
  // });

  // insert one object into requests collection
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
