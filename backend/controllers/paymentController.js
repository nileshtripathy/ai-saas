const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create subscription
exports.createSubscription = async (req, res) => {
    try {
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12
        });

        res.json({
            id: subscription.id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Verify payment (IMPORTANT)
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
            userId
        } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_payment_id + "|" + razorpay_subscription_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({
                message: "Invalid payment signature"
            });
        }

        // Mark user as subscribed
        await User.findByIdAndUpdate(userId, {
            isSubscribed: true
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};