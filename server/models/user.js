import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  password: {
    type: String,
    require: true,
    minlength: 1
  },
  twitterusername:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  }
});

const User = mongoose.model('User', userSchema);

export default User;
