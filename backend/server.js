const express = require("express");
const connectDb = require("./config/dbConnect");
require("dotenv").config();
const next = require("next");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const globalErrorHandler = require("./helpers/dbErrorHandler");
const { protect } = require("./controllers/authController");
const authRoutes = require("./routes/authRoutes");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
connectDb();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(compression());
  server.all("*", (req, res) => handle(req, res));
  server.use("/", authRoutes);
  server.use(globalErrorHandler);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
