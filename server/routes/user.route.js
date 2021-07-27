const router = require('express').Router();
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth');

router.post('/register', userController.register)
router.get('/activate/:hash', userController.activateUser)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/refresh_token', userController.refreshToken)
router.get('/infor',auth,userController.inforUser)
router.patch("/password", auth, userController.changePassword)
router.patch("/infor", auth, userController.updateInforUser)
router.patch('/addcart', auth, userController.addCart)
router.get('/history', auth, userController.historyOrder)




module.exports = router;