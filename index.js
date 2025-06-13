import express from 'express';
import Hello from "./Hello.js";
import Lab5 from './Lab5/index.js';
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import "dotenv/config";
import session from "express-session";

const app = express();
// make sure cors is used right after creating the app express instance
app.use(cors({
   credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:5173",
 }
));
// configure server sessions after cors
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());  // make sure this statement occurs AFTER setting up CORS but BEFORE all the routes
Hello(app);
Lab5(app);
UserRoutes(app);

// Use the PORT environment variable if it's set (e.g., in production),
// otherwise, default to a local port (e.g., 4000) for development.
app.listen(process.env.PORT || 4000);