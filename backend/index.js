const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express(); 
const _dirname = path.resolve();

// Define CORS options

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://helpngrow.onrender.com',
];

console.log(allowedOrigins,"4654645");
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));


app.use(express.json());

const Port = process.env.PORT || 5000; // Use const for Port

const dbConnection = require('./config/database');
dbConnection();

// Import routes and mount them
const newClient = require("./routes/client");
app.use('/api/v1', newClient);

// app.use(express.static(path.join(_dirname, 'frontend', 'dist')));  // Fixed path for static files

// app.get('*', (_, res) => {
//     res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
// });
app.use(express.static('frontend/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});


// Listen on server
app.listen(Port, () => {
    console.log(`Server is listening at Port number ${Port}`);
});

// Default router
app.get('/', (req, res) => {
    res.send("Default Router for home screen");
});

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");

// const app = express();
// const _dirname = path.resolve();

// // Define CORS options
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   'https://helpngrow.onrender.com',
// ];

// console.log("Allowed Origins: ", allowedOrigins); // Debugging CORS origins

// // Use CORS middleware with custom configuration
// app.use(cors({
//   origin: (origin, callback) => {
//     // For local testing, allow requests without origin (i.e. when using Postman or direct API requests)
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       console.log('CORS error - Origin not allowed:', origin); // Log for debugging
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the needed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
//   credentials: true, // Support credentials (cookies, Authorization headers)
// }));

// app.use(express.json());

// // Define the Port
// const Port = process.env.PORT || 5000;

// // Database Connection
// const dbConnection = require("./config/database");
// dbConnection();

// // Import routes and use them
// const newClient = require("./routes/client");
// app.use('/api/v1', newClient);

// // Serve static files for frontend (if you have a front-end build)
// app.use(express.static(path.join(_dirname, 'frontend', 'dist')));

// // Handle all other routes by serving the index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
// });

// // Default home route for testing
// app.get("/", (req, res) => {
//   res.send("Default Router for home screen");
// });

// // Start the server
// app.listen(Port, () => {
//   console.log(`Server is listening at Port number ${Port}`);
// });
