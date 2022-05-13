import express from "express";
import apiRouter from "./api";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
