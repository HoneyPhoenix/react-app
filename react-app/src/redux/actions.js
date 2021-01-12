import io from 'socket.io-client'
import{
    AUTH_SUCCESS,
    ERR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
}from './action-types'

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqFlushUser,
    reqGetUserListByUserType,
    reqGetMsgList,
    reqSetRead
}from '../api/index'
 
 function initIO (dispatch,userid){
  if(!io.socket){
    io.socket = io('ws://localhost:4000', {transports: ['websocket']})
    io.socket.on('receiveMsg',function(chatMsg){
      
      if(userid===chatMsg.from||userid ===chatMsg.to){
        dispatch(receiveMsg(chatMsg,userid))
      }
    })
  }

   

}
async function getMsgList(dispatch,userid){
  const respose = await reqGetMsgList()
  
  const result = respose.data
  if(result.code ===0){
    initIO(dispatch,userid)
    const {users,chatMsgs} = result.data
    dispatch(receiveMsgList( {users,chatMsgs,userid}))
  }
}
//同步方法
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user})
const errMsg = (msg)=>({type:ERR_MSG,data:msg})

const receiveUser = (user)=>({type:RECEIVE_USER,data:user})

export const resetUser = (user)=>({type:RESET_USER,data:user})

const receiveUserList = (userList)=>({type:RECEIVE_USER_LIST,data:userList})
const receiveMsgList = ({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
const receiveMsg = (chatMsg,userid)=>({type:RECEIVE_MSG,data:chatMsg,userid})
const readmsg = ({count,from,to})=>({type:MSG_READ,data:{count,from,to}})

//注册异步函数,
export const   register = (user)=>{

    const {username,password,password2,type} = user
    if(!username){
     return errMsg('用户名不能为空')
    }else if(password!==password2){
      return errMsg('两次密码不一致')
    }

    return async dispatch=>{
      const res =   await reqRegister({username,password,type})
      const result = res.data
      if(result.code===0){//成功
        getMsgList(dispatch,result.data._id)
        dispatch(authSuccess(result.data))
       
      }else{
        dispatch(errMsg(result.msg))
      }
    }
}

//登陆异步函数
export const   login = (user)=>{
 
  const {username,password} = user
  if(!username){
    return errMsg('用户名不能为空')
  }else if(!password){
    return errMsg('密码不能为空')
  }
    return async dispatch=>{
      const res =   await reqLogin(user)
      const result = res.data
      
      if(result.code===0){//成功
        getMsgList(dispatch,result.data._id)
        
        dispatch(authSuccess(result.data))
       
      }else{
        dispatch(errMsg(result.msg))
      }
    }
}
//更新用户异步函数
export const updateuser = (user)=>{
  
  const {header} = user
  if(!header){
    return errMsg('头像不能为空')
  }
    return async dispatch=>{
      const res =   await reqUpdateUser(user)
      const result = res.data
     
      if(result.code===0){//成功
       
        dispatch(receiveUser(result.data))
       
      }else{
        dispatch(resetUser(result.msg))
      }
    }
}

//根据cookie 获取用户信息
export const flushuser = ()=>{
  
    return async dispatch=>{
      const res =   await reqFlushUser()
      const result = res.data
       
      if(result.code===0){//成功
        getMsgList(dispatch,result.data._id)
       
        dispatch(receiveUser(result.data))
       
      }else{
        dispatch(resetUser(result.msg))
      }
    }
}
//获取用户列表
export const getuserlistbyusertype=(type)=>{
  return async dispatch=>{
    const res =   await reqGetUserListByUserType(type)
   
    const result = res.data
   
    if(result.code===0){//成功
    
      dispatch(receiveUserList(result.data))
     
    } 
  }
}
//发送消息的异步action

export const sendMsg=({from,to,content})=>{
  return dispatch=>{
   
    io.socket.emit('sendMsg',{from,to,content})
  }
}

//更新消息为已读
 
export const readMsg= (from,to) =>{
  return async dispatch=>{
    const res =   await reqSetRead(from)
    const result = res.data
    if(result.code===0){//成功
     const count = result.data
      dispatch(readmsg({count,from,to}))
     
    } 
    
  }
}