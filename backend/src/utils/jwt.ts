import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
};
