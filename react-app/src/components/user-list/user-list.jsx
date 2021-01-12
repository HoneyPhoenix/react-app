import React, {Component} from 'react'
 
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Card,WhiteSpace,WingBlank } from 'antd-mobile';
 



 class UserList extends Component{
    static propTypes = {
        userList : PropTypes.array.isRequired
    }

    render(){
     
        const Header = Card.Header
        const Body = Card.Body
        const  userList = this.props.userList
      
        return (

             
            <WingBlank className='content-top content-bottom'>
                {
                     userList.map(user=>(
                     <div key={user._id}>
                          <WhiteSpace/>
                        <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                            <Header
                                thumb={require(`../../assets/photos/person.png`).default}
                                extra={user.username}
                            />
                            <Body>
                                {user.company?<div>公司：{user.company}</div>:null}
                                {user.info?<div>相关介绍：{user.info}</div>:null}
                                
                                
                            </Body>
                        </Card>
                     </div>))
                }
            </WingBlank>   
        )
    }
}
export default withRouter(UserList)