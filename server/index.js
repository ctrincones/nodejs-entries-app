import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import BodyParser from 'body-parser';
import moment from 'moment';
import _ from 'lodash';

import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from './db/mongoose';
import User from './models/user';
import getUserTimeline from './twitter/timeline';
import authenticate from './middleware/authenticate';
import Entry from './models/entries';

//Express and webpack configs

let app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler,{
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(BodyParser.json());

//Api routes

//Register a new user
app.post('/api/users/register', (req, res) => {
  const requestBody = req.body;
  const newUser = new User(requestBody);
  getUserTimeline(requestBody.twitterusername).then((data)=>{
     return newUser.save();
  }).then(() => {
    return newUser.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(newUser);
  }).catch((e) => {
    console.log(e);
    res.status(400).send(e);
  });
});

//Log in a user
app.post('/api/users/login', (req,res) => {
  const body = req.body;
  User.findByCredentials(body.username,body.password).then((user) => {
     return user.generateAuthToken().then((token) => {
       res.header('x-auth',token).send(user);
     });
  }).catch(() => {
     res.status(400).send();
  });
});

//Log out user
app.delete('/api/users/delete/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
     res.status(200).send();
  }).catch(() => {
     res.status(400).send();
  });
});

//Add a new entry
app.post('/api/entries/add/', authenticate ,(req, res) => {
   const body = req.body;
   console.log(body);
   body.author = req.user._id;
   body.authorusername = req.user.username;
   body.creationdate = new Date().getTime();
   const entry = new Entry(body);
   entry.save().then((newEntry) => {
     res.send(newEntry);
   }).catch(()=> {
     res.status(400).send();
   });
});

//Get last three entries per user ordered by creation date
app.get('/api/entries/',(req,res) => {

   Entry.aggregate({
      $sort: {
        author: 1,
        creationdate: -1
      }
    },
    {
      $group: {
          _id: "$author",
          data: {
            $push: "$$ROOT"
          }
      }
    },
    {
       $project: {
          _id: 0,
          lastN: {
             $slice: ["$data", 3]
          }
       }
    },
    {
       $unwind: "$lastN"
    },
    {
      $sort: {
      creationdate: -1
      }
}).then((entries) => {
    const newArray =  entries.map(function(value){
     value.lastN.formattedcreationdate = moment(value.lastN.creationdate).format('h:mm:ss');
     return value.lastN;
   });
   newArray.sort(function(a,b){
     return b.creationdate - a.creationdate;
   });
   res.send(newArray);
}).catch(() =>{
  res.status(400).send();
});

});

//Edit an entry
app.patch('/api/entries/edit/:id', authenticate, (req,res)=> {
  const id = req.params.id;
  const body = req.body;
  Entry.findOneAndUpdate({ _id: id, author: req.user._id }, { $set : body }, { new: true}).then((updatedEntry) => {
    if (!updatedEntry) {
     return res.status(404).send();
   }
    res.send(updatedEntry);
  }).catch(() => {
    res.status(400).send();
  });
});

//Fetch user entries
app.get('/api/entries/user/:id', (req,res) => {
  const id = req.params.id;
   Entry.find({
     author: req.params.id
   }).then((entry) => {
     entry.sort((a,b) => {
       return b.creationdate - a.creationdate;
     });
     res.send(entry);
   }).catch(() => {
     res.status(400).send();
   });
});

//Fecth user tweets and hide hidden ones if user isnt the author
app.get('/api/entries/user/tweets/:id', (req,res) => {
    const token = req.header('x-auth');
    const userid = req.params.id;
    let tweetsAuthor;

    User.findOne({
      _id: userid
    }).then((user) => {
      tweetsAuthor = user;
      return getUserTimeline(user.twitterusername);
    }).then((data) => {
      const responseArr = data.map((value) => {
        const responseObject = {
          text: value.text,
          id: value.id,
          user: value.user.screen_name,
          image: value.user.profile_image_url,
          creationdate: value.created_at
        };
        return responseObject;
      });
      if(!token){
        const filtered =_.filter(responseArr, (item) => {
            return !(tweetsAuthor.hiddentweets.indexOf(item.id) > -1);
        });
        console.log(filtered);
        res.send(filtered);
      } else {
        User.findByToken(token).then((userData) => {
          if(userData._id.toString() === tweetsAuthor._id.toString()){
             res.send(responseArr);
          } else {
            const filtered =_.filter(responseArr, (item) => {
                return !(tweetsAuthor.hiddentweets.indexOf(item.id) > -1);
            });
            res.send(filtered);
          }
        }).catch(() => {
          res.status(401).send();
        });
      }
    }).catch(() => {
      res.status(400).send();
    });
})
//hide tweets from user
app.post('/api/entries/tweets/hide/:id', authenticate, (req,res) => {
    req.user.addHiddenTweet(req.params.id)
    .then((user) => {
      res.send(user);
    }).catch(() => {
      res.status(400).send();
    });
});
//Send public/index.htl to client
app.get('*/',(req,res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

//Listen for connections on port 3000
app.listen(3000,() => console.log("Server running on port 3000"));
