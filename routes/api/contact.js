const express = require("express");
const mongo = require('mongodb');
const router = express.Router();
const path = require('path');
const nodeMailer = require('nodemailer');
const Contact = require("../../models/Contact");

router.post('/contactus', (req, res) => {
    console.log(req.body);
    const newReq = new Contact(req.body);

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply.reviewme@gmail.com',
            pass: '$Cosc412ReviewMe$'
        }
    });
    let mailOptions = {
        from: '"Review Me Contact" <noreply.reviewme@gmail.com>',
        to: req.body.email,
        subject: "We have recieved your request",
        text: "Thank you for your interest in ReviewMe! A member of our team will reach out soon.", 
        html: '<b>Thank you for your interest in ReviewMe! A member of our team will reach out soon.</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    newReq.save()
        .then(doc => res.status(200).redirect('/thankyou'))
        .catch(err => res.status(500).send(err));
  });
  
  module.exports = router;
