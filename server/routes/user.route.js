const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/refresh_token', userController.refreshToken)
router.post('/login', userController.login)


module.exports = router;