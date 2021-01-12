import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
 import {getuserlistbyusertype} from '../../redux/actions'


class UserMain extends Component{
    componentDidMount(){
    
        this.props.getuserlistbyusertype('gl')
    }
    render(){
        return (
              <UserList userList={this.props.userList}></UserList>
        )
    }
}
export default  connect(
    state=>({userList:state.userList}),
    {getuserlistbyusertype}
)(UserMain)