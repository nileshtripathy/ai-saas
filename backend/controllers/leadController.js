const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
    try {
        const { name, phone, interest } = req.body;

        const lead = await Lead.create({
            userId: req.userId,
            name,
            phone,
            interest
        });

        res.json({ success: true, data: lead });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.json({ success: true, data: leads });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};