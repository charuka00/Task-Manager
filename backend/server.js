import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/users", userRoutes);
app.use("/api", taskRoutes); // Mount task routes under /api

connectDB();

app.listen(PORT, () => {
    console.log(`Server is ready at port ${PORT}`);
});