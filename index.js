import express from 'express';
import Hello from "./Hello.js";
import Lab5 from './Lab5/index.js';
import cors from "cors";

const app = express();
app.use(cors());  // make sure cors is used right after creating the app express instance
app.use(express.json());  // make sure this statement occurs AFTER setting up CORS but BEFORE all the routes
Hello(app);
Lab5(app);

// Use the PORT environment variable if it's set (e.g., in production),
// otherwise, default to a local port (e.g., 4000) for development.
app.listen(process.env.PORT || 4000);