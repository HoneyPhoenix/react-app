import ajax from './ajax'
//注册
export const reqRegister = (user)=>ajax('/register',user,'POST')
//登陆
export const reqLogin = ({username,password})=>ajax('/login',{username,password},'POST')
//更新用户
export const reqUpdateUser = (user)=>ajax('/updateuser',user,'POST')
//删除用户

export const reqFlushUser = ()=>ajax('/flushUser') 

//获取用户列表
export const reqGetUserListByUserType =(type)=>ajax('/getUserListByUserType',{type})

//获取消息列表
export const reqGetMsgList = ()=>ajax('/getMsgList') 

//更新消息为只读
export const reqSetRead = (from)=>ajax('/readMsg',{from},'POST')