import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    subject: {
        type: String
    },
    name: {
        type: String
    },
    score: {
        type: Number
    }
});
const User = mongoose.model('User', UserSchema);

export default User;