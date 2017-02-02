import User from './../../models/user';

export default (req,res) => {
  const id = req.params.id;
  User.findOne({
    _id: id
  }).then((user) => {
    res.send(user);
  }).catch(() => {
    res.status(400).send;
  });
}
