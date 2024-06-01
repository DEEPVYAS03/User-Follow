const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, fetchFollowers, fetchFollowing, removeFollower } = require('../controllers/followController');
const auth  = require('../middlewares/auth');

// Follow a user
router.post('/follow/:id', auth, followUser);

// Unfollow a user
router.delete('/unfollow/:id', auth, unfollowUser);

// Get followers of a user
router.get('/followers/:id', auth, fetchFollowers);

// Get users followed by a user
router.get('/following/:id', auth, fetchFollowing);

// Remove a follower
router.delete('/remove-follower/:id', auth, removeFollower);

module.exports = router;
