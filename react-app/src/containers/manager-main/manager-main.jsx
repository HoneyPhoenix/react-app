import React, {Component} from 'react'
import {connect} from 'react-redux'


import UserList from '../../components/user-list/user-list'
 import {getuserlistbyusertype} from '../../redux/actions'




class ManagerMain extends Component{
    componentDidMount(){
      
        this.props.getuserlistbyusertype('yh')
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
)(ManagerMain)