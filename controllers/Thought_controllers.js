const { Thought } = require('../models');



const thoughtController = {
  //get all thoughts complete :) 
  getAllThoughts(req, res) {
      Thought.find({})
      .populate({
          path: "reactions",
          select: "-__v",
      })    
    //   .populate({
    //       path: 'thoughts',
    //       select: "-__v",
    //   })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
    
},


  // get one Thought by id complete :)
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },
  
  
   // add thought complete :)
  addThought({ body }, res) {
    // console.log(body);
    Thought.create(body)
    .then(dbThoughtData => {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        )
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err))

      
},

    // update Thought by id complete :) 
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true} )
    //    .poulate({
    //        path: "reactions", 
    //        select: "-__v"
    //    })

          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No Thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },


  // remove thought complete :) 
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
           
        }
        return User.findOneAndUpdate(
            { _id: params.username },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          
        );
       
       })
        .then(dbUserData => {
            res.json(dbUserData);
            // if (!dbUserData) {
            //     res.status(404).json({ message: "No User found with this id!"});
            //     return;
            // }
            
        })
        .catch(err => res.json(err));   

     
  },

  //add reaction  complete 
  addReaction({ params, body }, res) {
     Thought.findOneAndUpdate({ _id: params.thoughtId}, {$push: {reactions: body} }, {new: true})
    //  .populate({
    //      path: "reactions",
    //      select: "-__v"
    //  })
     .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  }, 

  // remove reaction  complete 
  removeReaction({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: {reactionId: body.reactionId} } }, { new: true, runValidators: true})
           .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json({ message: "Reaction deleted successfully"});
      })
      .catch((err) => res.status(400).json(err));
  }


};

module.exports = thoughtController;