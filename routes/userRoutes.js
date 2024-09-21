const express = require('express');
const User = require('../model/userModel');
const router = express.Router();

const redis = require('redis');
const client = redis.createClient();

// Connect to Redis
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();



router.get('/leaderboard', async (req, res) => {
    try {
        const cachedLeaderboard = await client.get('leaderboard');

        if (cachedLeaderboard) {
          return res.status(200).json(JSON.parse(cachedLeaderboard));
        }

        const users = await User.find().sort({ points: -1 });
        await client.set('leaderboard', JSON.stringify(users), {
            EX: 30, // Cache expiration in 30 seconds
          });

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
      await client.del('leaderboard');
  
      res.status(200).json({ pointsAwarded });
    } catch (error) {
      console.error('Error claiming points:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  





router.post('/', async (req, res) => {
    try {
        const users = req.body;  // Expecting an array of users

        const createdUsers = await User.insertMany(users);  // Insert users in bulk
        res.status(201).json(createdUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





module.exports = router;
