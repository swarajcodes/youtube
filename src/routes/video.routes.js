import { Router } from "express";
import { uploadVideo,updateVideo } from "../controllers/video.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const videoRouter = Router();

videoRouter.post("/upload", checkAuth, uploadVideo);
videoRouter.put("/update/:id", checkAuth, updateVideo);

export default videoRouter;
