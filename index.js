require("dotenv").config();
const express = require("express");
const app = express();
const mainRoutes = require("./src/routes/index.routes");
app.use(express.json());

app.use("/api/v1", mainRoutes);

app.use((err, req, res, next) => {
  const message = err.message || "internal server error";
  const statusCode = err.status || 500;
  res.status(statusCode).send({
    message,
    statusCode,
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
