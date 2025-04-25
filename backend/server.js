import express from 'express'
import {PORT} from "./config/env.js"
import connectToDatabase from './database/monogdb.js'
import authRouter from './routers/auth.routes.js'
import userRouter from './routers/user.routes.js'

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)

app.listen(PORT, async ()=>{
    console.log(`running on http://localhost:${PORT}`)

    await connectToDatabase()
})