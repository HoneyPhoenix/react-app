
export  function getRedirector(type,header){
    let path=''
    if(type==='yh'){
        path='/usermain'
    }else{
        path='/managermain'
    }
    if(!header)
    {
        path = path.replace('main','info')
    }
     

    return path
}