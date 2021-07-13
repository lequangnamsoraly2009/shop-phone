const Users = require('../models/user.model');

const authAdmin = async(req,res,next) =>{
    try {
        // Get user information by id
        const user = await Users.findOne({_id: req.user.id})
        if(user.role === 0){
            return res.status(400).json({status: false, message: "Admin access denied !"});
        }
        next();
    } catch (error) {
        return res.status(500).json({status: false, message: error.message})
    }
}

module.exports = authAdmin;