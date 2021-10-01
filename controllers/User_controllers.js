const { User } = require('../models');

const userController = {

// GET ALL USERS
getAllUsers(req, res){
    User.find({})
    .select('-__v')
    .then(dbData => res.json(dbData))
    .catch(err => res.status(400).json(err))
},

// GET A SINGLE USER
getOneUser({params}, res){
    User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbData => res.json(dbData))
},

// POST (CREATE) A NEW USER
createNewUser({body}, res){
    User.create(body).then(dbData => {
        res.json(dbData)
        .catch(err => res.status(400).json(err))
    })
},
 
// UPDATE A USER
updateUser({params, body}, res){
    User.findOneAndUpdate({_id: params.id}, body, {new: true})
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: 'No such user found'})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

// DELETE A USER
deleteUser({params}, res){
    User.findOneAndDelete({_id: params.id})
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: 'No such user found'})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},


// POST (ADD) NEW FRIEND TO USER
addFriend({params}, res){
    console.log(params.userId);
    User.findOneAndUpdate(
        {_id: params.userId},
        {$addToSet: {
            friends: params.friendId,
        }
    },
    {new: true, runValidators: true}
    ).then(dbData => {
        if (!dbData){
            res.status(404).json({message: "One or both of these people do not exist"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},


// DELETE A FRIEND FROM SPECIFIC USER
deleteFriend({params}, res){
    User.findOneAndUpdate(
        {_id: params.userId},
        { $pull: {friends: params.friendId}},
        {new: true, runValidators: true}
        )
    .then(dbData => {
        if (!dbData){
            res.status(404).json({message: "No such user found"})
        }
        res.json(dbData)
    }).catch(err => res.status(400).json(err))
},

}

module.exports = userController; 