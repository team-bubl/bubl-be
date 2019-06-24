// Load .env file and add environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// Middleware & Helpers
const { checkToken } =  require('./middlewares/authorization');

// Models
const authRoutes = require('./controllers/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routers:
app.use('/api/auth', authRoutes);

// Server Up
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});

if (require.main == module) {
  app.listen(process.env.PORT, () => {
    console.log(`Dev server is up @ http://localhost:${process.env.PORT}/`);
  });
} else {
  module.exports = app;
}