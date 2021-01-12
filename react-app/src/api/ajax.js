import axios from 'axios';

export default function ajax(url,data={},type='GET'){
    if(type==='GET'){
        let paraStr = ''
        Object.keys(data).forEach(key=>{
            paraStr +=key +'=' +data[key] +'&'
        })
        if(paraStr){
            paraStr = paraStr.substring(0,paraStr.length-1)
        }
        return axios.get(url+'?'+paraStr)
    }
    else{
        return axios.post(url,data)
    }

}