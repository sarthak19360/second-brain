import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user: { userId: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "No token, not authorized" });

  try {
    const decoded = verifyToken(token);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
