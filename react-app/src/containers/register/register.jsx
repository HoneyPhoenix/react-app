import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {NavBar,
    WingBlank,
List,
InputItem,
WhiteSpace,
Radio,
Button} from 'antd-mobile'
import {connect} from 'react-redux'


import {register} from '../../redux/actions'

import Logo from '../../components/logo/logo'
import '../../assets/css/index.less'

const ListItem = List.Item


class Register extends Component{

    state ={
        username:'',
        password:'',
        password2:'',
        type:'yh'  //yh  用户  gl  管理
    }
    register = ()=>{
        
        this.props.register(this.state)
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }
    tologin = ()=>{
       this.props.history.replace('/login')
    }

    render(){
        const {type} = this.state
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }
        return (
            <div >
                <NavBar>铁&nbsp;塔&nbsp;报&nbsp;账</NavBar>
                <Logo/>
                <WingBlank >
                    <List>
                        {msg ?<div className='error-msg'>{msg} <WhiteSpace></WhiteSpace></div>:null}
                       
                        <InputItem  placeholder='请输入用户名' onChange={val =>this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem placeholder='请输入密码'  onChange={val =>this.handleChange('password',val)} type='password'>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem placeholder='请输入确认密码'  onChange={val =>this.handleChange('password2',val)} type='password'>确认密码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <ListItem>
                            <span>用户类型</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>this.handleChange('type','yh')} checked={type=="yh"}>用户</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio  onChange={()=>this.handleChange('type','gl')}  checked={type=="gl"}>管理员</Radio>
                        </ListItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type='primary' onClick ={this.register}>注册</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick = {this.tologin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)