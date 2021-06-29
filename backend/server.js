const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
require("dotenv").config();
const connectDb = require("./config/dbConnect");

connectDb();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(compression());
  server.use(helmet());
  server.use(cors());

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
