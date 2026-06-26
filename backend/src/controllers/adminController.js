// src/controllers/adminController.js

const verifySecret = (req, res) => {
    const { code } = req.body;

    if (code === process.env.ADMIN_SECRET) {
        return res.status(200).json({
            success: true,
            message: "Access granted"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid secret code"
    });
};

module.exports = { verifySecret };