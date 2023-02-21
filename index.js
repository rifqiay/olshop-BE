require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mainRoutes = require("./src/routes/index.routes");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
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

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
