const express = require("express");
const authMiddleware = require("../middleWares/auth"); // Import the auth middleware

const router = express.Router();

// Import controllers

const { createUserChain, getDownlines, getAllChildrenAndGrandchildren, getAllDownlineCount, getDownlinesCount, userUpdate, getUsersAtSameLevel } = require("../controllers/chainController");
const { loginUser } = require("../controllers/loginController");
const { generateEpins, getAllEpins } = require("../controllers/epinController");
const { sendRequest, acceptRequest, rejectRequest, getRequests, mygetRequests, sendRequestToLeveledUpUser } = require("../controllers/requestController");
const {  getUsersByLevel, getUsersWhoLeveledUpByOne    } = require("../controllers/levelController");


// Route mappings
router.post("/create-chain", createUserChain);
router.post("/user-login", loginUser); 
router.post("/generateEpins", generateEpins)    
router.post('/send-request', authMiddleware, sendRequest)
router.post('/send-request-for-levelup',authMiddleware,sendRequestToLeveledUpUser ) 
router.get("/all-downline", authMiddleware, getDownlines);
router.get("/count-all-direct-downline", authMiddleware, getDownlinesCount);
router.get("/get-grand-nodes", authMiddleware, getAllChildrenAndGrandchildren);
router.get("/count-all-downline", authMiddleware, getAllDownlineCount);
router.get("/getEpins", getAllEpins);
router.get('/my-requests', authMiddleware, mygetRequests);
router.get('/get-requests', authMiddleware, getRequests);
router.get('/get-user-for-request',authMiddleware,getUsersAtSameLevel)
router.get('/get-users-by-level', authMiddleware,getUsersByLevel)
router.get('/get-first-levelledUp',authMiddleware,getUsersWhoLeveledUpByOne)
router.put('/accept/:requestId', authMiddleware, acceptRequest);
router.put('/reject/:requestId', authMiddleware, rejectRequest);
router.put("/update-user", authMiddleware, userUpdate);

module.exports = router;
