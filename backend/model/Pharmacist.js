const mongoose = require('mongoose');

const PharmacistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
    wallet: {
    type: Number,
    required: true,
    default: 0.00
  }
},{ timestamps: true });

const Pharmacist = mongoose.model('Pharmacist', PharmacistSchema);
module.exports = Pharmacist;
