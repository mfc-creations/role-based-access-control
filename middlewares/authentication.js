const db=require('../db/models/index')
const HttpException=require('../httpException')
const jwt=require('jsonwebtoken')
async function authenticate(req,res,next) {
    const token=req.headers['authorization'];

    if(token){
        try{
        const verify=jwt.verify(token,"secret")

        const user = await db.User.findByPk(verify.id, { raw: true });
        if(user){
            req.user=verify
            next()
        }else{
						next( res.status(403).json("You do not have permission to do this"))

        }
        }catch(err){
					next( res.status(403).json("You do not have permission to do this"))

        }
    }else {
		next(res.status(403).json("Authentication token is missing"));
	}
}
module.exports = authenticate;
