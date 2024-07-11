
import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const roleRoute = express.Router();

roleRoute.get("/role", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
});

export default roleRoute;
