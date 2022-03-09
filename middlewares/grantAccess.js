const USER_TYPES=require('../userRoles.js')
const {roles}=require('../role')

const grantAccess=(action,resource)=>{
	return async (req,res,next)=>{
		const role=req.user?req.user.role:USER_TYPES.PUBLIC;
		const permission=await roles.can(role)[action](resource)
		if(!permission.granted){
			next(res.status(403).json('You do not have permission to do this'))
		}
		req.attributes=permission.attributes
		next()
	}
}
module.exports=grantAccess;