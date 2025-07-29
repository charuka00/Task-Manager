import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/",(req, res) => {
    res.send("Hello world")
});

app.use("/api/users", userRoutes)

connectDB();

app.listen(PORT, () => {
    console.log(`Server is ready at port ${PORT}`);
});