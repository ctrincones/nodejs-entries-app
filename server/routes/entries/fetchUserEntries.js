import Entry from './../../models/entries';

export default (req,res) => {
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
}
