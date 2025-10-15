import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatebase from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests from this IP address. Try again later",
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} enviroment.`);
  await connectToDatebase();
});
