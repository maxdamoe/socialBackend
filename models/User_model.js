const {Schema, model} = require ('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
});

userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

const User = model('User', userSchema)

module.exports = User