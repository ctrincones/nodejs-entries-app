import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

const JWT_SECRET = "abdertoocs";

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
  hiddentweets: [],
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
  return _.pick(userObject,['_id', 'email','username','twitterusername', 'hiddentweets']);
}

userSchema.methods.generateAuthToken = function(){
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id : user._id.toHexString() , access }, JWT_SECRET).toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
}

userSchema.methods.addHiddenTweet = function(tweetId) {
  const user = this;
  user.hiddentweets.push(tweetId);
  return user.save();
}

userSchema.methods.showHiddenTweet = function(tweetId) {
  const user = this;
  const tweetIndex = user.hiddentweets.indexOf(tweetId);
  user.hiddentweets.splice(tweetIndex, 1);
  return user.save();
}

userSchema.pre('save', function(next){
  const user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(user.password, salt, (err,hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function(username,password) {
  var User = this;

  return User.findOne({ username }).then((user) => {
    if(!user){
      return Promise.reject();
    }

    return new Promise (( resolve,reject ) => {
      bcrypt.compare(password,user.password, (error,res) => {
        if(res){
          resolve(user);
        } else {
          reject(error);
        }
      });
    })
  });
}

userSchema.methods.removeToken = function(token){
  const user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
}

userSchema.statics.findByToken = function(token){
  const User = this;
  let decoded;
  try {
     decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
     return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

const User = mongoose.model('User', userSchema);

export default User;
