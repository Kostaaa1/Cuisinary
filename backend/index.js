const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const jwtCheck = require("./jwtCheck");

// config
dotenv.config({ path: ".env" });
connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", require("./routes/recipes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/users"));
app.use("/api/articles", require("./routes/articles"));

// Errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ valid: false });
  } else {
    next(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Running on port ${PORT}`));
