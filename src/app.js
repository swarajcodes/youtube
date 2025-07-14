import express from "express";

import { PORT } from "./config/env.js";
import { connectToDatabase } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import videoRouter from "./routes/video.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Youtube Application backend");
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  await connectToDatabase();
});
