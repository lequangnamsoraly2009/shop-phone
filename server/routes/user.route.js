const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/refresh_token', userController.refreshToken)


module.exports = router;