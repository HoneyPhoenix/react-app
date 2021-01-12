import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result,List,Button,WhiteSpace,WingBlank,Modal } from 'antd-mobile';
 

import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

class PersonCenter extends Component{

    logout  = ()=>{
        Modal.alert('退出','确认退出吗？',[
            {text:'取消'},
            {text:'确定',onPress:()=>{
                Cookies.remove('userid')
                this.props.resetUser()
            }}
        ])
    }

    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const {username,company,info} = this.props.user
        return (
           
                <WingBlank  className='content-top content-bottom'>
                    <Result
                        img ={<img src={require(`../../assets/photos/person.png`).default  }  style={{width:50}} />}
                        title={username} message='财务'
                    />
                    <List renderHeader={()=>'相关信息'}>
                        <Item >
                                <Brief>公司：{company}</Brief>
                                <Brief>描述：{info}</Brief>
                        </Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Button type='warning' onClick={this.logout}>退出登录</Button>
                    </List>
                </WingBlank> 
        )
    }
}
export default  connect(
    state=>({user:state.user}),
    {resetUser}
)(PersonCenter)