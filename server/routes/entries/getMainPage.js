import Entry from './../../models/entries';
import moment from 'moment';

export default (req,res) => {

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

}
