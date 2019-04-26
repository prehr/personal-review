const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  user_email: {
    type: String,
    },
user_id: {
type: String,
},
reviewer_id: {
type: String,
default: ""
},
  title: {
    type: String,
    default: "",
    required: true
  },
  field: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(),
  },
  complete: {
    type: Boolean,
    default: false,
  }
});

module.exports = Reviews = mongoose.model("reviews", ReviewsSchema);
