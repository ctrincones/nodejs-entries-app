import User from './../../models/user';

export default (req,res) => {
    req.user.showHiddenTweet(req.params.id)
    .then((user) => {
      res.send(user);
    }).catch(() => {
      res.status(400).send();
    });
}
