const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         return res.status(401).json({ msg: "Access denied" });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified; // Store the verified user information in the request object
//         next();
//     } catch (error) {
//         return res.status(400).json({ msg: "Invalid token" });
//     }
// };


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        req.user = decoded; // Attach decoded token data to request
        next();
    });
};

module.exports = authMiddleware;

