import _ from 'lodash';

import User from './../../models/user';
import getUserTimeline from './../../twitter/timeline';

export default (req,res) => {
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
}
