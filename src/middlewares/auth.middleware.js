import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Login to access" });
    }

    const decodedUser = jwt.verify(token, JWT_SECRET);

    if (!decodedUser) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error in checking authentication",
      message: error.message,
    });
  }
};
