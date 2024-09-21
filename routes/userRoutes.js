const express = require('express');
const User = require('../model/userModel');
const router = express.Router();

router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/claim/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const pointsAwarded = Math.floor(Math.random() * 10) + 1;
        user.points += pointsAwarded;
        await user.save();

        res.status(200).json({ pointsAwarded });
    } catch (error) {
        console.error('Error claiming points:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
