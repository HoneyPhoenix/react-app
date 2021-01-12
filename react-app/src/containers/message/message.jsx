import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,
    WingBlank,
List,
InputItem,
WhiteSpace,
Radio,
Button,
Badge} from 'antd-mobile'


const Item = List.Item
const Brief = Item.Brief
function getLastMsgs(chatMsgs,userid){
    let lastMsgsObjs = {}
    chatMsgs.forEach(msg=>{
         
        if(msg.to===userid&&!msg.read){
            msg.unReadCount= 1
        }else{
            msg.unReadCount= 0
        }



        const chat_id = msg.chat_id
        let lastMsg = lastMsgsObjs[chat_id]
        if(!lastMsg){
            lastMsgsObjs[chat_id] = msg
        }else{
            const unReadCount = lastMsg.unReadCount+msg.unReadCount

            if(msg.create_time>lastMsg.create_time){
                lastMsgsObjs[chat_id] = msg
            }
            lastMsgsObjs[chat_id].unReadCount =unReadCount
        }
       

    })
   let lastMsgs =  Object.values(lastMsgsObjs)
  
   return lastMsgs.sort(function(m1,m2){
       return m2.create_time-m1.create_time
   })
   
}
class Message extends Component{
    render(){
       
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat
        const me_id = user._id
        if(!users[me_id]){
            return null
        }
        const lastMsgs = getLastMsgs(chatMsgs,user._id)
        return (
            <div  >
              <NavBar  className ='fixed-header'>消息列表</NavBar>  
              <WhiteSpace/>
              <WingBlank className='content-top content-bottom'>
                  <List>
                      {
                         
                          lastMsgs.map(msg=>{
                              
                            const targetUserId = msg.to===user._id?msg.from:msg.to
                            const targetUser = users[targetUserId]
                              return  (
                                <Item key={msg._id} 
                                    extra ={<Badge text={msg.unReadCount}/>}
                                    thumb ={targetUser.header?require('../../assets/photos/person.png').default:null}
                                    arrow='horizontal'
                                    onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
                                >{msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                        )
                          })
                      }
                   
                  </List>
              </WingBlank>
            </div>
        )
    }
}
export default  connect(
    state=>({user:state.user,chat:state.chat}),
    {}
)(Message)