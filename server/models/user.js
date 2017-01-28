import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

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
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  twitterusername:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject,['_id', 'email','username','twitterusername']);
}

userSchema.methods.generateAuthToken = function(){
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id : user._id.toHexString() , access }, "abdertoocs").toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
}

const User = mongoose.model('User', userSchema);

export default User;
