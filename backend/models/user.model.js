import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'user name is required'],
        trim : true,
        minLength : 2,
        maxLength : 60,
    },
    email:{
        type:String,
        required : [true,'email is required'],
        trim : true,
        unique : true,
        lowercase : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address'],
    },
    password:{
        type:String,
        required : true,
        minLength : 6
    }
},{timestamps:true})

const User = mongoose.model('user' , userSchema)

export default User