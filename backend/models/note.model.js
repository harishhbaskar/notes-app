import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    title:{
         type:String,
         required: true,
         trim : true,
    },
    content:{
        type : String,
        required : true,
        trim : true,
    },
    tags : {type:[String] , default : []},
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user',
    }  
},{timestamps:true})


const Note = mongoose.model('note' , notesSchema)

export default Note;