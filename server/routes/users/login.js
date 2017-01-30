import User from './../../models/user';

export default (req,res) => {
  const body = req.body;
  User.findByCredentials(body.username,body.password).then((user) => {
     return user.generateAuthToken().then((token) => {
       res.header('x-auth',token).send(user);
     });
  }).catch(() => {
     res.status(400).send();
  });
}
