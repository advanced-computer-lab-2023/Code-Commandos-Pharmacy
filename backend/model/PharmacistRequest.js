const mongoose = require('mongoose');

const PharmacistRequestSchema = new mongoose.Schema({
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
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING','ACCEPTED','REJECTED']
  }
},{ timestamps: true });

const PharmacistRequest = mongoose.model('PharmacistRequest', PharmacistRequestSchema);
module.exports = PharmacistRequest;