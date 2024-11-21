// /controllers/requestController.js

const mongoose = require('mongoose')
const RequestModel = require('../models/requestModel');
const Client = require('../models/clientModel');  // Assuming your Client model is in this path


// Helper function to get the required number of links based on the user's level
function getRequiredLinksForLevel(level) {
    switch (level) {
        case 0: return 2;
        case 1: return 6;
        case 2: return 14;
        case 3: return 24;
        case 4: return 34;
        case 5: return 44;
        case 6: return 54;
        case 7: return 64;
        case 8: return 64;
        case 9: return 74;
        default: return level * 10 + 2;
    }
}
 

exports.sendRequest = async (req, res) => {
    const { receiverId } = req.body ;

    const senderId = req.user.id;

    if (!receiverId) {
        return res.status(400).json({ msg: "Receiver ID is required." });
    }

    if(senderId === receiverId)
        {
            return res.status(400).json({
                msg:"receiverId should be different from senderId"
            })
        }

    try {
        // Fetch the sender and receiver users
        const sender = await Client.findById(senderId);
        const receiver = await Client.findById(receiverId);
        
         // Ensure sender is activated
         if (!sender.activate) {
            return res.status(400).json({ msg: "You need to activate your account to send requests." });
        }
        // Ensure receiver is activated
        if (!receiver.activate) {
            return res.status(400).json({ msg: "The receiver must activate their account to receive requests." });
        }


        if (!sender || !receiver) {
            return res.status(404).json({ msg: "Sender or Receiver not found." });
        }

        // Ensure sender and receiver are at the same level
        
        if (sender.level !== receiver.level) {
            return res.status(400).json({ msg: "You can only send requests to users at the same level." });
        }


        // Check if the request already exists
        const existingRequest = await RequestModel.findOne({ senderId, receiverId });
        if (existingRequest) {
            return res.status(400).json({ msg: "Request already sent." });
        }

        // Create a new request
        const newRequest = new RequestModel({ senderId, receiverId });

        const savedRequest = await newRequest.save();
        return res.status(201).json({ msg: "Request sent successfully.", data: savedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};




exports.acceptRequest = async (req, res) => {
    const requestId = req.params.requestId || req.params.epin;

    const userId = req.user.id;

    try {
        const request = await RequestModel.findById(requestId);

        if (!request || request.receiverId.toString() !== userId) {
            return res.status(403).json({ msg: "Invalid request." });
        }

        const sender = await Client.findById(request.senderId);

        // Ensure the sender and receiver are at the same level
        const receiver = await Client.findById(userId);

        // Ensure sender is activated
        if (!sender.activate) {
            return res.status(400).json({ msg: "You need to activate your account to send requests." });
        }
        // Ensure receiver is activated
        if (!receiver.activate) {
            return res.status(400).json({ msg: "The receiver must activate their account to receive requests." });
        }



        if (sender.level !== receiver.level) {
            return res.status(400).json({ msg: "You can only accept requests from users at the same level." });

        }

        request.status = 'accepted';
        request.updatedAt = Date.now();

        await request.save();

        receiver.newLinksReceived = receiver.newLinksReceived + 1;
        // Check if the user has reached the threshold for level-up
        if (receiver.newLinksReceived >= getRequiredLinksForLevel(receiver.level)) {
            // Automatically level up the user if they have enough links
            receiver.level += 1;
            receiver.levelUpdateAt = Date.now()
            receiver.newLinksReceived = 0;  // Reset the new links count for the next level
            receiver.levelUpRequestStatus = false;  // Reset level-up request status

            // Save the updated user details
            await receiver.save();

            return res.status(200).json({
                msg: `Congratulations! You've reached level ${receiver.level}.`,
                data: receiver
            });
        }

        await receiver.save();

        return res.status(200).json({
            msg: "Request accepted successfully.",
            data: request
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};
// Reject a request
exports.rejectRequest = async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    try {

         // Ensure sender is activated
         if (!userId.activate) {
            return res.status(400).json({ msg: "You need to activate your account to delete requests." });
        }
        

        const request = await RequestModel.findById(requestId);
        if (!request) {
            return res.status(404).json({ msg: "Request not found." });
        }

        if (request.receiverId.toString() !== userId) {
            return res.status(403).json({ msg: "You can only reject requests sent to you." });
        }

        request.status = 'rejected';
        request.updatedAt = Date.now();
        const updatedRequest = await request.save();

        return res.status(200).json({ msg: "Request rejected.", data: updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};

// Get all requests for a user (sent or received)

exports.mygetRequests = async (req, res) => {

    const userId = req.user.id;

    try {
        const requests = await RequestModel.find({
            $or: [
                // { senderId: userId },
                 { receiverId: userId }]

        }).populate('senderId receiverId', 'name epin email'); // Populate sender and receiver details


        return res.status(200).json({ data: requests });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};

exports.getRequests = async (req, res) => {
    const userId = req.user.id;

    try {
        // Fetch the user data to check their current level and the number of accepted requests
        const user = await Client.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Check how many accepted requests the user has at their current level
        const acceptedRequestsCount = await RequestModel.countDocuments({
            receiverId: userId,
            status: 'accepted',
            level: user.level
        });

        // Check how many requests the user has already received (accepted requests)
        const receivedRequestsCount = await RequestModel.countDocuments({
            receiverId: userId,
            status: 'accepted',
            level: user.level
        });

        // If the user has already received two requests, they can't receive more until they send a request and it is accepted
        if (receivedRequestsCount >= 2) {
            // Update the `receivedRequestsAt` timestamp if not already set
            if (!user.receivedRequestsAt) {
                user.receivedRequestsAt = Date.now();
                await user.save();
            }

            // Set `halt` to true after receiving two requests
            user.halt = true;
            await user.save();

            // Check if the user has sent a request and whether that request is accepted
            const sentRequest = await RequestModel.findOne({
                senderId: userId,
                status: 'accepted',
                level: user.level
            });

            // If no request has been accepted, the user can't receive more requests
            if (!sentRequest) {
                return res.status(400).json({
                    msg: "You need to send a request and have it accepted before you can receive more requests."
                });
            }
        } else {
            // If the user hasn't yet received two requests, ensure `halt` is false
            user.halt = false;
            await user.save();
        }

        // Fetch all pending requests for the user to receive, only those at the same level
        const pendingRequests = await RequestModel.find({
            receiverId: userId,
            status: 'pending',
            level: user.level
        }).populate('senderId', 'name epin email');

        return res.status(200).json({
            msg: "You can now view pending requests.",
            pendingRequests: pendingRequests
        });

    } catch (error) {
        console.error("Error fetching requests:", error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};


exports.sendRequestToLeveledUpUser = async (req, res) => {
    const { receiverId } = req.body;  // receiverId will be passed in the request body
    const senderId = req.user.id;     // senderId comes from JWT token (authenticated user) 

    if (!receiverId) {
        return res.status(400).json({ msg: "Receiver ID is required." });
    }

    try {
        // Fetch the sender and receiver users from the database
        const sender = await Client.findById(senderId);
        const receiver = await Client.findById(receiverId);

        // Check if sender and receiver exist
        if (!sender || !receiver) {
            return res.status(404).json({ msg: "Sender or Receiver not found." });
        }

        // Ensure the sender is activated
        if (!sender.activate) {
            return res.status(400).json({ msg: "You need to activate your account to send requests." });
        }

        // Ensure the receiver is activated
        if (!receiver.activate) {
            return res.status(400).json({ msg: "Receiver needs to activate their account to receive requests." });
        }

        // Check if sender and receiver are at the same level

        // Check if a request already exists between sender and receiver
        const existingRequest = await RequestModel.findOne({ senderId, receiverId });
        if (existingRequest) {
            return res.status(400).json({ msg: "Request already sent." });
        }

        // Create a new request
        const newRequest = new RequestModel({
            senderId,
            receiverId,
            status: 'pending',  // Status will be 'pending' initially
        });

        // Save the request
        const savedRequest = await newRequest.save();

        return res.status(201).json({ msg: "Request sent successfully.", data: savedRequest });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};

