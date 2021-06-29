const express = require("express");
const connectDb = require("./config/dbConnect");
require("dotenv").config();
const next = require("next");
const authRoutes = require("./routes/authRoutes");
const globalErrorHandler = require("./helpers/dbErrorHandler");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
connectDb();

app.prepare().then(() => {
  const server = express();
  server.use("/", authRoutes);
  server.all("*", (req, res) => handle(req, res));
  server.use(globalErrorHandler);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
