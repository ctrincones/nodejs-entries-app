import User from './../../models/user';

export default (req,res) => {
  req.user.removeToken(req.token).then(() => {
     res.status(200).send();
  }).catch(() => {
     res.status(400).send();
  });
}
