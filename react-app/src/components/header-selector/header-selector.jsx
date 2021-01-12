import React,{Component} from 'react'
import { List,Grid } from 'antd-mobile';
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
   
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    state = {
        icon:null
    }
    constructor(props){
        super(props)
        this.headerList = Array.from(new Array(9)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: `name${i}`,
          }))

    }
    imgSelector = ({text,icon})=>{
        this.setState({icon})
       
        this.props.setHeader(text)
    }

    render(){
        const {icon} = this.state
        const listHeader = !icon ? '请选择图像' :(<div>已选择图像<img src={icon}></img></div>)
        
        return (
            <List renderHeader={() => listHeader} className="my-list">
              <Grid data={this.headerList} activeStyle={false}  columnNum={3} onClick={this.imgSelector} />
          </List>
        )
    }
}