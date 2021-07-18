const router = require('express').Router();
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/refresh_token', userController.refreshToken)
router.get('/infor',auth,userController.inforUser)
router.patch('/addcart', auth, userController.addCart)



module.exports = router;