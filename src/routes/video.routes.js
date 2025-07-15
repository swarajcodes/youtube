import { Router } from "express";
import {
  uploadVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
} from "../controllers/video.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const videoRouter = Router();

videoRouter.post("/upload", checkAuth, uploadVideo);
videoRouter.put("/update/:id", checkAuth, updateVideo);
videoRouter.delete("/delete/:id", checkAuth, deleteVideo);

videoRouter.get("/all", getAllVideos);

export default videoRouter;
