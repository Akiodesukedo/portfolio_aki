import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    "http://localhost:5173/",
    "http://localhost:5174/",
    "https://akisroom.ca"
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