
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller.js');
const authenticate=require('../middlewares/authentication')
const grantAccess=require('../middlewares/grantAccess')


router.post('/',authenticate,grantAccess('create','project'), projectController.createProject);

router.get('/:projectId',grantAccess('readAny','project'), projectController.getProject);
 
router.get('/',grantAccess('readAny','project'), projectController.getProjects);
 
router.put('/:projectId',authenticate,grantAccess('updateOwn','project'), projectController.updateProject);

router.delete('/:projectId',authenticate,grantAccess('deleteAny','project'),projectController.deleteProject);
 
module.exports = router;