import express from 'express';
import Hello from "./Hello.js";
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();
// make sure cors (Cross-Origin Resource Sharing) is used right after creating the app express instance
app.use(cors({
   credentials: true,  // Allow credentials (cookies, etc.)
   origin: process.env.NETLIFY_URL || "http://localhost:5173",  // Specify allowed origin
 }
));
// configure server sessions after cors
// This sets up session management for your Express application. 
// Sessions are a way to maintain state between multiple HTTP requests 
// from the same client, despite HTTP being a stateless protocol. 
// It typically works by storing a session ID in a cookie on the client's browser, 
// and the server uses this ID to look up session data stored server-side.
const sessionOptions = {
  // This is a required secret key used to sign the session ID cookie. 
  // It protects the session ID from tampering.
  secret: process.env.SESSION_SECRET || "kambaz",  // Secret for signing session IDs
  resave: false,  // Don't save session if unmodified
  saveUninitialized: false,  // Don't save new sessions that have no data
};
if (process.env.NODE_ENV !== "development") {  // checks if the application is running in a production-like environment
  sessionOptions.proxy = true;  // Trust the first proxy
  sessionOptions.cookie = {
    sameSite: "none",  // Allow cross-site cookies
    secure: true,  // Only send cookie over HTTPS
    domain: process.env.NODE_SERVER_DOMAIN,  // Specify cookie domain for cross-origin
  };
}
app.use(session(sessionOptions));  // Use the session middleware

// make sure this statement occurs AFTER setting up CORS but BEFORE all the routes
app.use(express.json());  // Parses JSON bodies of incoming requests and makes it available on req.body

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

// Use the PORT environment variable if it's set (e.g., in production),
// otherwise, default to a local port (e.g., 4000) for development.
app.listen(process.env.PORT || 4000);