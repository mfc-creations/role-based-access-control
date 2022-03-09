const AccessControl=require('accesscontrol');
const USER_TYPES=require('./userRoles');

const ac=new AccessControl();

exports.roles=(function(){
    ac.grant(USER_TYPES.PUBLIC).readAny('project',['title'])

    ac.grant(USER_TYPES.USER).extend(USER_TYPES.PUBLIC).create('project').updateOwn('project')

    ac.grant(USER_TYPES.ADMIN).extend(USER_TYPES.PUBLIC).deleteAny('project').deleteAny('profile')

    return ac;
})()