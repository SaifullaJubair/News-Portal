import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./server";
import httpStatus from "http-status";
import routes from "./routes/routes";
import globalErrorHandler from "./middlewares/global.error.handler";

const app: Application = express();

app.use(express.json());
// CORS configuration
const corsOptions = {
  origin: [
    "https://dailyourbangladesh.com",
    "https://www.dailyourbangladesh.com",
    "https://facebook.com",
    "https://www.facebook.com",
    "https://linkedin.com",
    "https://www.linkedin.com",
    "https://whatsapp.com",
    "https://www.whatsapp.com",
    "https://twitter.com",
    "https://www.twitter.com",
    "https://messenger.com",
    "https://www.messenger.com",
    "http://localhost:3000"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("News Portal App is working! YaY!");
});

// Import All Api
app.use("/api/v1", routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

//connect to db
connectDB();

const port: number | string | any = process.env.PORT || 8080;
const time = new Date().toLocaleTimeString();
const date = new Date().toLocaleString("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "[FC]",
    time,
    ":",
    date,
    `: News Portal app listening on port ${port}`
  );
});
