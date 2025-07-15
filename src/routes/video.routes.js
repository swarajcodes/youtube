import { Router } from "express";
import {
  uploadVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
  getMyVideos,
  getVideoById,
  getVideobyCategory,
  getVideoByTag,
} from "../controllers/video.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const videoRouter = Router();

videoRouter.post("/upload", checkAuth, uploadVideo);
videoRouter.put("/update/:id", checkAuth, updateVideo);
videoRouter.delete("/delete/:id", checkAuth, deleteVideo);
videoRouter.get("/myVideos", checkAuth, getMyVideos);

videoRouter.get("/:id", checkAuth, getVideoById);

videoRouter.get("/tags/:tag", getVideoByTag);
videoRouter.get("/category/:category", getVideobyCategory);
videoRouter.get("/all", getAllVideos);

export default videoRouter;
