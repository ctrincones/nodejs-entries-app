import mongoose from 'mongoose';

const Entry = mongoose.model('Entry',{
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  entrybody: {
    type: String,
    required: true,
    minlength: 1,
    trime: true
  },
  creationdate: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorusername: {
    type: String,
    required: true
  }
});



export default Entry;
