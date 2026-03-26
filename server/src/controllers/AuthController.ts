import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      res.status(400).json({ message: "Token is required" })
      return
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ message: "Invalid token" })
      return
    }

    const email = payload.email;
    const name = payload.name;

    if (!email) {
      res.status(401).json({ message: "Email not found" });
      return;
    }

    const isAdmin = email === process.env.ADMIN_EMAIL;

    res.status(200).json({
      user: {
        email,
        name
      },
      isAdmin
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Auth failed" });
  }
}