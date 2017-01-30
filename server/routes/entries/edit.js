import Entry from './../../models/entries';

export default (req,res)=> {
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
}
