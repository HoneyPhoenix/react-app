import React,{Component} from 'react'

import logo  from './logo512.png'
import './logo.less'


export default function Logo() {
    return (
        <div className='logo-container'>
            <img src={logo} alt='logo' className='logo-img'></img>
        </div>
    )
}