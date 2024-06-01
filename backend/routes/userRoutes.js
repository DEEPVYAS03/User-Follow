const express = require('express');
const router = express.Router();
const { registerUser, loginUser , fetchAllUsers ,searchUsers , getUserProfile } = require('../controllers/userController');

const auth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all',auth,fetchAllUsers);
router.post('/search',auth,searchUsers);
router.get('/profile', auth, getUserProfile);

module.exports = router;
