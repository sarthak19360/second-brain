import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (username: string) => {
  return jwt.sign({ name: username }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): { username: string } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { username: string };
};
