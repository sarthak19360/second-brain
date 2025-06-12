import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import prisma from "../lib/prisma";
import {
  signupSchema,
  loginSchema,
  contentSchema,
  shareLinkSchema,
} from "../zodTypes/type";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = signupSchema.parse(req.body);
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userExists) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashed,
      },
    });

    const token = generateToken(newUser.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User registered successfully",
      user: username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/content", async (req: Request, res: Response) => {
  try {
    const { link, type, title, tags } = contentSchema.parse(req.body);
    if (!req.cookies.token) {
      res.status(401).json({ message: "No token, not authorized" });
      return;
    }
    const user = verifyToken(req.cookies.token);

    await prisma.tag.createMany({
      data: tags.map((tag) => ({ title: tag })),
      skipDuplicates: true,
    });

    const existingTags = await prisma.tag.findMany({
      where: {
        title: { in: tags },
      },
    });

    const newContent = await prisma.content.create({
      data: {
        link,
        type,
        title,
        user: {
          connect: { id: user.userId },
        },
        tags: {
          connect: existingTags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
      },
    });
    res
      .status(201)
      .json({ message: "Content created successfully", newContent });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/content", async (req: Request, res: Response) => {
  try {
    if (!req.cookies.token) {
      res.status(401).json({ message: "No token, not authorized" });
      return;
    }
    const user = verifyToken(req.cookies.token);
    const userId = user.userId;
    const allContent = await prisma.content.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({
      allContent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.delete("/content/:id", async (req: Request, res: Response) => {
  try {
    if (!req.cookies.token) {
      res.status(401).json({ message: "No token, not authorized" });
      return;
    }
    const user = verifyToken(req.cookies.token);
    const userId = user.userId;

    const contentId = req.params.id;

    const deletedContent = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (deletedContent?.userId !== userId) {
      res.status(403).json({
        message: "Cannot delete other user's posts!!",
      });
      return;
    }

    await prisma.content.delete({
      where: {
        id: contentId,
      },
    });

    res.status(200).json({
      deleted: deletedContent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/brain/share", async (req: Request, res: Response) => {
  try {
    if (!req.cookies.token) {
      res.status(401).json({ message: "No token, not authorized" });
      return;
    }
    const user = verifyToken(req.cookies.token);

    const share: boolean = req.body.share;
    if (share) {
      const existingLink = await prisma.link.findFirst({
        where: {
          userId: user.userId,
        },
      });

      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
        return;
      }

      const hash = (Math.random() + 1).toString(36).substring(4);
      await prisma.link.create({
        data: {
          userId: user.userId,
          hash,
        },
      });
      res.status(200).json({
        hash,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/brain/:shareLink", async (req: Request, res: Response) => {
  try {
    const shareLink = req.params.shareLink;
    const link = await prisma.link.findFirst({
      where: {
        hash: shareLink,
      },
    });

    if (!link) {
      res.status(404).json({
        message: "Share Link is invalid",
      });
      return;
    }

    const contents = await prisma.content.findMany({
      where: {
        userId: link?.userId,
      },
    });
    const username = await prisma.user.findUnique({
      where: {
        id: link?.userId,
      },
    });
    res.status(200).json({
      username,
      contents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

export default router;
