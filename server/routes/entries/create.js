import Entry from './../../models/entries';

export default (req, res) => {
   const body = req.body;
   body.author = req.user._id;
   body.authorusername = req.user.username;
   body.creationdate = new Date().getTime();
   const entry = new Entry(body);
   entry.save().then((newEntry) => {
     res.send(newEntry);
   }).catch(()=> {
     res.status(400).send();
   });
}
