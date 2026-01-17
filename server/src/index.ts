import express, { Request, type Express, Response } from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';
import workRoute from './routes/WorkRoute'

// Load .env file to use process.env.*
dotenv.config();

const requireEnv = (name: string) => {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is missing in your .env file`);
  return value
}

const startServer = async () => {
  const app: Express = express()
  const port = Number(process.env.PORT) || 3001
  const mongoURI = requireEnv("MONGO_URI")

  app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://akisroom.com",
      "https://www.akisroom.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }));
  app.use(express.json({ limit: "2mb" }))

  app.get("/", (_req:Request, res:Response) => {
    res.status(200).send("OK: Express + Apollo + MongoDB")
  })

  await mongoose.connect(mongoURI)
  console.log("✅ Successfully connected to MongoDB")

  app.use("/works", workRoute);

  const httpServer = app.listen(port, () => {
    console.log(`🏃 Server running on port ${port}`)
  })

  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down...`)
    httpServer.close(async () => {
      try {
        await mongoose.connection.close()
        console.log("✅ Shutdown complete")
        process.exit(0)
      } catch (err) {
        console.error("❌ Shutdown error:", err)
        process.exit(1)
      }
     })
  }

  process.on("SIGINT", () => void shutdown("SIGINT"))
  process.on("SIGTERM", () => void shutdown("SIGTERM"))
}

startServer().catch((err) => {
  console.error("❌Oops. Server failed to start:", err)
  process.exit(1)
})
