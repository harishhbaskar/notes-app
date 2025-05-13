import express from 'express'
import {PORT} from "./config/env.js"
import connectToDatabase from './database/monogdb.js'
import authRouter from './routers/auth.routes.js'
import userRouter from './routers/user.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import notesRouter from './routers/notes.routes.js'

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello this is a note taking app');
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/notes',notesRouter)

app.use(errorMiddleware);

app.listen(PORT, async ()=>{
    console.log(`running on http://localhost:${PORT}`)

    await connectToDatabase()
})