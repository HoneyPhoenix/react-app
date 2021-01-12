import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,List,WhiteSpace, InputItem,Grid, Icon  } from 'antd-mobile';
import {sendMsg,readMsg} from '../../redux/actions' 
 
import './chat.less'

const Item = List.Item
const Brief = Item.Brief
class Chat extends Component{
    state ={
        content:'',
        isShow:false//是否显示表情列表
    }

   componentWillMount(){
       const emojies =['😂','😭','🥺','❤️','🤣','✨','😍','🙏','🥰','😊','😝'
       ,'🤔','🤗','😜','😛','😋','😚','🤩','😌','😔','😪','🤤','🤫'
       ,'😗','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭'
       ,'🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','💕'
           ,'🔥','👍','🥱','🤏','🦦','🛒','🦠','🐳','🤍','🧍','🤎'
           ,'👁️','👈','👄','🤡','😷','✊🏾','🍫','👐','✈️','🔵','⚽'
           ,'⚫','📷','🔝','⚾','🏀','👶','👼','🎅','🧑‍🎄','👪'
           ,'🦌','🍪','🥛','🍷','🍴','⛪','🎁','🔔','🎶','🏹']
       this.emojies = emojies.map(emoje=>({text:emoje}))
        
   }
   componentDidMount(){
       
       window.scrollTo(0,document.body.scrollHeight)
       const from = this.props.match.params.userid
       const to = this.props.user._id
       this.props.readMsg(from,to)
   }
   componentWillUnmount(){
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from,to)
   }
   componentDidUpdate(){
       window.scrollTo(0,document.body.scrollHeight)
   }
    send = ()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content
        if(content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:''})
    }
    render(){
         const {user} = this.props
         const {users,chatMsgs} = this.props.chat
        
        const me_id = user._id
        if(!users[me_id]){
            return null
        }
        const target_id = this.props.match.params.userid
        const chat_id = [me_id,target_id].sort().join('-')
        const msgs =  chatMsgs.filter(msg=>msg.chat_id===chat_id)
        const targetHeader = users[target_id].header
        const targetName = users[target_id].username
        let targetIcon = targetHeader?require('../../assets/photos/person.png'):null
        if(!targetIcon){
            targetIcon =require('../../assets/photos/person.png')
        }
       return (<div id='chat-page'>
           <NavBar  className ='fixed-header'
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}>{targetName}</NavBar>
           <WhiteSpace/>
           <List className="my-list content-top content-bottom">
                {
                    msgs.map(msg=>{
                        if(me_id===msg.from){
                            return (
                                <div key={msg._id}>
                                    <Item className='chat-me' 
                                        extra={<img src={targetIcon.default}/>} >
                                    
                                    <Brief>
                                            {msg.content}
                                        </Brief>
                                    </Item>
                                </div>
                            )
                        }else{
                            return (
                                <div key={msg._id}>
                                <Item  
                                    thumb={<img src={targetIcon.default}/>} >
                                
                                <Brief>
                                        {msg.content}
                                    </Brief>
                                </Item>
                            </div>
                            )
                        }
                    })
                }

               
            </List>
            <div className='am-tab-bar'>&nbsp;&nbsp;
                <InputItem placeholder='请输入' onChange={val=>this.setState({content:val})}
                    value={this.state.content}
                    extra={
                        <span>
                            <span onClick={()=>this.setState({isShow :!this.state.isShow})}>😊</span>&nbsp;&nbsp;
                            <span onClick={this.send}>发送</span>
                        </span>
                        
                    }
                >

                </InputItem>
                {this.state.isShow?(
                     <Grid 
                     data={this.emojies}
                     columnNum={8}
                     carouselMaxRow={4}
                     isCarousel={true}
                     onClick={(item)=>{
                          
                         this.setState({content:this.state.content+item.text})
                     }}/>
                ):null}
               
            </div>
       </div>)
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)