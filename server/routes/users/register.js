import User from './../../models/user';
import getUserTimeline from './../../twitter/timeline';

export default (req, res) => {
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
}
