import React, {Component} from 'react'
import { TabBar} from 'antd-mobile';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'



import './foot-nav.less'

const Item = TabBar.Item


  class FootNav extends Component{


    static propType = {
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    
    
    render(){
        let {navList,unReadCount} = this.props
        console.log(unReadCount)
        navList =  navList.filter(nav=>!nav.hide)
       const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map((nav)=>(
                        <Item key={nav.path}
                        title={nav.text}
                        badge={nav.path==='/message'? unReadCount:0}
                        icon = {{uri:require(`./imgs/${nav.icon}.png`).default}}
                        selectedIcon = {{uri:require(`./imgs/${nav.icon}-selected.png`).default}}
                        selected={path===nav.path}
                        onPress={()=> this.props.history.replace(nav.path)}
                         ></Item>
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(FootNav)