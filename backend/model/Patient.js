const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    required: true,
    enum: ['MALE','FEMALE']
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  addresses: [
    {
      street:{
        type: String,
      },
      city:{
        type: String,
      },
      country:{
        type: String,
      },
  }
],

  emergencyContact: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    relationToPatient: {
      type: String,
      required: true,
      enum: ['WIFE','HUSBAND','CHILDREN']
    }
  },
  wallet: {
    type: Number,
    required: true,
    default: 0.00
  }
},{ timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;