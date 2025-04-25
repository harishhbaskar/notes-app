import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js';


export const signUp = async(req,res,next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const {name , email , password} = req.body

        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error('user already exists')
            error.statusCode = 400
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        
        const newUsers = await User.create([{name,email,password:hashedPassword}],{session})

        const token = jwt.sign( {userId: newUsers[0]._id},JWT_SECRET, {expiresIn : JWT_EXPIRES_IN})

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({
            success : true,
            message : 'User created successfully',
            data : {
                token,
                user : newUsers[0]
            }
        })

    }catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }


}

export const signIn = async(req,res,next) => {

     try{
        const {name,email,password} = req.body

        const user = await User.findOne({email})

        if (!user){
            const error = new Error('user not found')
            error.statusCode = 200
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            const error = new Error('password is not valid')
            error.statusCode = 200
            throw error
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        res.status(200).json({
            success : true,
            message : 'user signed in successfully',
            data : {
                token,
                user,
            }
        })
    }catch(error){
        next(error)
    }
}
