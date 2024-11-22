const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express(); 
const _dirname = path.resolve();

// Define CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Allow frontend from a specific URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],              
    credentials: true,                                            // Allow cookies to be sent (if needed)
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

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
