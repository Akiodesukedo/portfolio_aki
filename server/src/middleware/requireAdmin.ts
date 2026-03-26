import { NextFunction, Response } from "express";
import { RequestWithUser } from "./verifyAuth";

export const requireAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const adminEmail = process.env.ADMIN_EMAIL

  if (!req.user?.email) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.user.email !== adminEmail) {
    res.status(403).json({ message: "Forbidden: admin access required" });
    return;
  }

  next();
}