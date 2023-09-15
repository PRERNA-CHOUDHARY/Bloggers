// Import required modules
import express from "express";          // Import the Express.js framework
import bodyParser from "body-parser";   // Middleware to parse request bodies
import mongoose from "mongoose";        // MongoDB object modeling library
import cors from "cors";                // Cross-Origin Resource Sharing middleware
import dotenv from "dotenv";            // Load environment variables
import helmet from "helmet";            // Security middleware
import morgan from "morgan";            // Request logger middleware
import path from "path";                // Built-in Node.js module for working with file paths
import { fileURLToPath } from "url";     // Convert file URL to file path
import multer from "multer";
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import {authRoutes} from "./routes/auth.js";
/* CONFIGURATION */

// Get the current file's path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current file's path
const __dirname = path.dirname(__filename);

// Load environment variables from a .env file
dotenv.config();

/*Create an instance of the Express application.*/
const app = express();

// Parse JSON request bodies with extended options and a size limit of 30MB
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Parse URL-encoded request bodies with extended options and a size limit of 30MB
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Enable Cross-Origin Resource Sharing (CORS) for handling cross-origin requests
app.use(cors());

// Enhance security with HTTP headers using Helmet
app.use(helmet());

// Set Cross-Origin Resource Policy using Helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Log HTTP requests to the console in a common format
app.use(morgan("common"));

// Serve static assets from the "public/assets" directory under "/assets" route
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));



/*FILE STORAGE  : to save uploaded file*/  

// Define storage settings for the multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets"); // Define the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Define the filename for uploaded files
    }
});
// Create an instance of multer with the specified storage settings
const upload = multer({ storage });


/* ROUTES WITH FILES */

// Define a POST route for user registration at "/auth/register".
// It uses the multer middleware to handle file uploads for the "picture" field and passes the uploaded file to the "register" handler.
app.post("/auth/register",upload.signal("picture"),register);



app.use('/auth',authRoutes);



app.use('/user',userRoutes);

// Define the port number for the server, using the provided PORT environment variable or defaulting to 6001
const PORT = process.env.PORT || 6001;

// Connect to the MongoDB database using the MONGO_URL environment variable
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the Express server once the database connection is established
    app.listen(PORT, 
        () => console.log(`Connected to MongoDB via port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`Can't connect to MongoDB: ${error}`);
  });

