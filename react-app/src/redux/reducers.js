import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
}from './action-types'

import {getRedirector} from '../utils'
import { func } from 'prop-types'

const initUser= {
    username:'',
    type:'',//用户类型
    msg:'',//提示信息
    // header:'',
    // compony:'',
    // info:'',
    redirectTo:''
}

//产生user状态的reducer
function user(state=initUser,action){
    
    switch (action.type){
        case AUTH_SUCCESS:
            const {type,header}  = action.data
            return {...action.data,redirectTo:getRedirector(type,header)}
        case ERR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}
        default :
        return state
        
    }
}



//产生userlist状态的reducer
const initUserList=[]
function userList(state=initUserList,action){
    
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default :
        return state
        
    }
}

//产生chat 聊天状态的reducer
const initChat={
    users:{},
    chatMsgs:[],
    unReadCount:0 //总未读数量
}
function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce(((preTotles,msg)=>preTotles+(!msg.read&&msg.to===userid?1:0)),0)
            }
        case RECEIVE_MSG:
            
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,action.data],
                unReadCount:state.unReadCount + (!action.data.read&&action.data.to===action.userid?1:0)
            }
        case MSG_READ:
            const {from,to,count} = action.data
            return {
               users:state.users,
               chatMsgs:state.chatMsgs.map(msg=>{
                   if(msg.from ===from &&msg.to===to&&!msg.read){
                       return {...msg,read:true}
                   }else{
                       return msg
                   }

               }),
               unReadCount:state.unReadCount-count
            }
        default:
        return    state
    }
   
}

export default combineReducers({
    user,
    userList,
    chat
})