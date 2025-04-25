import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';

// Load .env file to use process.env.*
dotenv.config();

// Start express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    "http://localhost:5173/",
    "http://localhost:5174/",
    "https://akisroom.com",
    "https://www.akisroom.com/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
}));

// middleware here
app.use(express.json());

app.get('/', (req, res) => {
  // res.json({ message: 'Hello from Akis room backend server' });
  res.status(234).send("Successful connection!");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// connection to DB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables. Ask aki uri to store in your .env file");
}
mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("connected with DB successfully!");
  })
  .catch((error) => {
    console.log(error);
  });