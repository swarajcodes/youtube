import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res) => {
  const { channelName, password, phone, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath
    );
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      channelName: channelName,
      email: email,
      phone: phone,
      logoUrl: uploadImage.secure_url,
      password: hashedPassword,
      logoId: uploadImage.public_id,
    });
    let user = await newUser.save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(`Error in Signup Controller: ${error.message}`);
    res.json({
      error: "something went wrong",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      _id: existingUser._id,
      channelName: existingUser.channelName,
      email: existingUser.email,
      phone: existingUser.phone,
      logoId: existingUser.logoId,
      logoUrl: existingUser.logoUrl,
      subscribers: existingUser.subscribers,
      subscribedChannels: existingUser.subscribedChannels,
      token: token,
    });
  } catch (error) {
    console.log(`Error in Login Controller: ${error.message}`);
    res.json({
      error: error.message,
    });
  }
};
