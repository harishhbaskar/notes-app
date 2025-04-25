import mongoose from 'mongoose';
import { DB_URI,NODE_ENV } from "../config/env.js";


if (!DB_URI){
    throw new Error("define mango db uri in env.poduction/development.local")
}
console.log(DB_URI)
const connectToDatabase = async ()=> {
    try{
        await mongoose.connect(DB_URI)

        console.log(`successfully connected to database in ${NODE_ENV} mode`)
    }catch(error){
        console.error('error connnecting to database',error.message)

        process.exit(1)
    }
}

export default connectToDatabase