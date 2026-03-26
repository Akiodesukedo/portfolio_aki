import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// I'll use this type on the other middleware. So export
export type RequestWithUser = Request & {
  user?: {
    email: string,
    name?: string
  }
}

export const verfiyAuth = async(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({message: "Missing or invalid authorization header"})
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token not found" });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req.user = {
      email: payload.email,
      name: payload.name
    };

    next()

  } catch (err) {
    console.error("verifyAuth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
}