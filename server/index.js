import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoutes.js'
import quizRoute from './routes/quizRoutes.js'
import geminiRoute from './routes/GeminiRoutes.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)
app.use('/quiz', quizRoute)
app.use('/gemini', geminiRoute)

app.listen(process.env.PORT, () => {
    console.log("Server is running") 
})