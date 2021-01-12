var express = require('express');
var {UserModel,ChatModel} =  require('../db/mongodb');
var router = express.Router();
const md5 = require("blueimp-md5")
const filter = {password:0,__v:0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册路由  登陆
/*
path  /register
参数 username  和 password
成功返回{code:0 ,data:{_id:'',username:'',password:''}}
失败返回{code:1 ,msg:'失败原因'}

*/

router.post('/register', function(req, res, next) {
  const {username,password,type} = req.body
  UserModel.findOne({username},function(err,user){
    if(user){
      res.send({code:1,msg:'此用户已存在！'})
    }
    else {
      new UserModel({username,type,password: md5(password)}).save((err,user)=>{
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data = {username,type,_id:user._id}
        res.send({code:0,data:data})
      })

    }
  })
});

router.post('/login', function(req, res, next) {
  const {username,password} = req.body

  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    if(!user){
      res.send({code:1,msg:'此用户或密码不正确！'})
    }
    else {
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
     
      res.send({code:0,data:user})

    }
  })

 
});

router.post('/updateuser', function(req, res, next) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'用户已过期，请先登录'})
  }
  
  const user = req.body
 
  UserModel.findByIdAndUpdate({_id:userid}, user,function(err,oldUser){
    if(!oldUser){
      res.clearCookie('userid')
      res.send({code:1,msg:'请重新登录'})
    }
    else {
    const {_id,username,type} = oldUser

    const  data = Object.assign(user,{_id,username,type})
     
      res.send({code:0,data:data})

    }
  })

 
});

router.get('/flushUser', function(req, res) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请重新登录'})
  }
  
  UserModel.findOne({_id:userid},filter,function(err,user){
    if(!user){
      res.send({code:1,msg:'此用户不存在！'})
    }
    else {
      res.send({code:0,data:user})
    }
  })

 
});

router.get('/getUserListByUserType', function(req, res) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请重新登录'})
  }
  const {type} = req.query
  UserModel.find({type},filter,function(err,users){
    if(!users){
      res.send({code:1,msg:'无信息'})
    }
    else {
      res.send({code:0,data:users})
    }
  })
});


//聊天相关方法
//获取聊天记录
router.get('/getMsgList', function(req, res) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请重新登录'})
  }

  UserModel.find(function(err,userDocs){
    const users={}
    userDocs.forEach(doc=>{
      users[doc.id] = {username:doc.username,header:doc.header}
    })

    //查询userID相关的所有聊天信息 
    //参数1 查询条件
    //参数2 过滤条件
    //参数3 回调函数
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function (err,chatMsgs) {
    
      res.send({code:0,data:{users,chatMsgs}})
    
    })
  })
});
//修改指定消息为已读
router.post('/readMsg', function(req, res) {
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请重新登录'})
  }
  const from = req.body.from
  const to = userid
   
   
  //查询userID相关的所有聊天信息 
  //参数1 查询条件
  //参数2 更新为指定的对象
  //参数3 是否一次更新多条，默认一条
  //参数3 回调函数
  ChatModel.updateMany({from,to,read:false},{read:true},function (err,doc) {
      res.send({code:0,data:doc.nModified})//更新的数量
    })
  
  })
 

module.exports = router;
