// followController.js

const User = require('../models/User');
const Follow = require('../models/Follow');

const followUser = async (req, res) => {
  try {
    const existingFollow = await Follow.findOne({
      followerId: req.user._id,
      followingId: req.params.id
    });

    if (existingFollow) {
      return res.status(400).send('You are already following this user.');
    }

    const follow = new Follow({
      followerId: req.user._id,
      followingId: req.params.id
    });
    await follow.save();

    await User.findByIdAndUpdate(req.user._id, { $inc: { following: 1 } });
    await User.findByIdAndUpdate(req.params.id, { $inc: { followers: 1 } });

    res.status(200).send('Followed successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

const unfollowUser = async (req, res) => {
  try {
    const follow = await Follow.findOneAndDelete({
      followerId: req.user._id,
      followingId: req.params.id
    });

    if (!follow) {
      return res.status(400).send('You are not following this user.');
    }

    await User.findByIdAndUpdate(req.user._id, { $inc: { following: -1 } });
    await User.findByIdAndUpdate(req.params.id, { $inc: { followers: -1 } });

    res.status(200).send('Unfollowed successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ followingId: req.params.id }).populate('followerId', 'username email');
    res.status(200).json(followers.map(f => f.followerId));
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchFollowing = async (req, res) => {
  try {
    const following = await Follow.find({ followerId: req.params.id }).populate('followingId', 'username email');
    res.status(200).json(following.map(f => f.followingId));
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeFollower = async (req, res) => {
  try {
    const follow = await Follow.findOneAndDelete({
      followerId: req.params.id,
      followingId: req.user._id
    });

    if (!follow) {
      return res.status(400).send('User is not following you.');
    }

    await User.findByIdAndUpdate(req.user._id, { $inc: { followers: -1 } });
    await User.findByIdAndUpdate(req.params.id, { $inc: { following: -1 } });

    res.status(200).send('Removed follower successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { followUser, unfollowUser, fetchFollowers, fetchFollowing, removeFollower };
