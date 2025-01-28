import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoutes.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})