import { Router } from "express";
import { uploadVideo } from "../controllers/video.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const videoRouter = Router();

videoRouter.post("/upload",checkAuth, uploadVideo);

export default videoRouter;
