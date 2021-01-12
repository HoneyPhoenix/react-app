import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavBar, InputItem, TextareaItem,Button,WhiteSpace,WingBlank } from 'antd-mobile';
import {Redirect} from 'react-router-dom'


import {updateuser} from '../../redux/actions'
import HeaderSelector from '../../components/header-selector/header-selector'

class UserInfo extends Component{

    state = {
        header:'',
        company:'',
        info:'',
    }
    setHeader = (header)=>{
        this.setState({
            header
        })
    }

    save = ()=>{
       
        this.props.updateuser(this.state)
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }
    render(){
        
        const {msg,header,type} = this.props.user
        if(header){
            const path = type==='yh'?'/usermain':'/managermain'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div >
                <NavBar>用户信息</NavBar>
                <WingBlank>
                    {msg ?<div className='error-msg'>{msg}<WhiteSpace></WhiteSpace></div>:null}
                        
                        <HeaderSelector setHeader = {this.setHeader}></HeaderSelector>
                        <InputItem placeholder='请输入公司' onChange={val =>this.handleChange('company',val)}>请输入公司</InputItem>
                        <TextareaItem  title="描述" rows={3}  onChange={val =>this.handleChange('info',val)}/>
                        <Button type='primary'  onClick = {this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                   
                </WingBlank>
            </div> 
        )
    }
} 

export default  connect(
    state=>({user:state.user}),
    {updateuser}
)(UserInfo)