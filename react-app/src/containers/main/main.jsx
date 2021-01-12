import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  //可操作cookie 
import {Redirect} from 'react-router-dom'
import {flushuser} from '../../redux/actions'
import { NavBar} from 'antd-mobile';



import {getRedirector} from '../../utils'
import ManagerInfo from '../manager-info/manager-info'
import UserInfo from '../user-info/user-info'
import ManagerMain from '../manager-main/manager-main'
import UserMain from '../user-main/user-main'
import Message from '../message/message'
import PersonCenter from '../person-center/person-center'
import NotFound from '../../components/not-found/not-found'
 import FootNav from '../../components/foot-navbar/foot-navbar'
 import Chat from '../chat/chat'
class Main extends Component{
    navList=[
        {
            path:'/managermain',
            component:ManagerMain,
            title:'功能列表',
            icon:'home',
            text:'首页'
        },
        {
            path:'/usermain',
            component:UserMain,
            title:'功能列表',
            icon:'home',
            text:'首页'
        }
        ,
        {
            path:'/message',
            component : Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        }
        ,
        {
            path:'/personcenter',
            component : PersonCenter,
            title:'个人中心',
            icon:'person',
            text:'个人'
        }
    ]


    componentDidMount(){
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid&&!_id){
            this.props.flushuser()
        }
    }

    render(){

        //读取cookie中的userid
        const userid = Cookies.get('userid')
        
        //如果userID没有自动重定向到登录页面
        if(!userid){
            return <Redirect to='/login'></Redirect>
        }
        //如果有读取redux中的user状态值 
        const {user,unReadCount} = this.props
        
        if(!user._id){
            //如果redux中没有 请求后台获取user信息更新redux
            return null
        }else{
            let path =this.props.location.pathname
            if(path==='/'){
                path = getRedirector(user.type,user.header)
                return <Redirect to={path}></Redirect>
            }

        }
        const {navList} =this
        const path = this.props.location.pathname

        const curNav = navList.find(nav=>nav.path===path)
        if(curNav){
            if(user.type==='yh'){
                navList[0].hide = true
            }else{
                navList[1].hide = true
            }
        }
        
        return (
            <div>
                {curNav?<NavBar className='fixed-header'>{curNav.title}</NavBar>:null}
                <Switch>
                    {navList.map(nvl=><Route key={nvl.path} path={nvl.path} component={nvl.component}/>)}
                    <Route path='/managerinfo' component={ManagerInfo}></Route>
                    <Route path='/userinfo' component={UserInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {curNav?<FootNav unReadCount = {unReadCount} navList={navList}>{curNav.title}</FootNav>:null}
            </div>
        )
    }
}
export default connect(
    state =>({user:state.user,unReadCount:state.chat.unReadCount}),
    {flushuser}
)(Main)