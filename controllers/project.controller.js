const db=require('../db/models/index')

exports.createProject = async (req, res, next) => {
 try {
  const newProject = await db.Project.create({...req.body,UserId:req.user.id},{returning:true})
  res.json({
   data: newProject,
  })
 } catch (error) {
  next(error)
 }
}


exports.getProjects = async (req, res, next) => {
 const projects = await db.Project.findAll({attributes:req.attributes})
 res.status(200).json({
  data: projects
 });
}
 
exports.getProject = async (req, res, next) => {
 try {
  const projectId = req.params.projectId;
  const project = await db.Project.findOne({where:{id:projectId}});
  if (!project) throw 'project does not exist';
   res.status(200).json({
   data: project
  });
 } catch (error) {
  next(error)
 }
}
 

exports.updateProject = async (req, res, next) => {
 try {
  const update = req.body
  const projectId = req.params.projectId;
  const userProject=await db.Project.findOne({where:{id:projectId,UserId:req.user.id}})
  if(!userProject){
      throw "Invalid project id"
  }
  const project =await db.Project.update(update,{where:{id:projectId},returning:true});
  res.status(200).json({
   data: project,
   message: 'Project has been updated'
  });
 } catch (error) {
  next(error)
 }
}

exports.verifyProject = async (req, res, next) => {
 try {
  const projectId = req.params.projectId;
  const project =await db.Project.update({verified:true},{where:{id:projectId},returning:true});
  res.status(200).json({
   data: project,
   message: 'Project has been updated'
  });
 } catch (error) {
  next(error)
 }
}

exports.deleteProject = async (req, res, next) => {
 try {
  const projectId = req.params.projectId;
  await db.Project.destroy({where:{id:projectId}});
  res.status(200).json({
   data: null,
   message: 'Project has been deleted'
  });
 } catch (error) {
  next(error)
 }
}



 