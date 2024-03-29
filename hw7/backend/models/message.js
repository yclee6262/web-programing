import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
    from: {
        type: String,
        required: [true, 'From field is required.']
    },
    to: {
        type: String,
        required: [true, 'To field is required']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
})
// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)
// Exporting table for querying and mutating
export default Message;