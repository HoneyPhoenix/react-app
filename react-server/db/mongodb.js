const mongoose = require("mongoose") 
 

// mongoose.connect('mongodb://user:pass@ip:port/database');

mongoose.connect("mongodb://localhost:27017/reactDB")

const conn = mongoose.connection
conn.on('connected',() =>{
    console.log("db conn success")
})
//用户表
const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},//用户类型
    header:{type:String},//头像
    post:{type:String},//职位
    info:{type:String},//描述
    company:{type:String},//公司
})
const UserModel = mongoose.model('user',userSchema)

exports.UserModel = UserModel

//聊天表
const chatSchema = mongoose.Schema({
    from:{type:String,required:true},//发送用户id
    to:{type:String,required:true},//接收用户id
    chat_id:{type:String,required:true},//from to 组成的字符串
    content:{type:String,required:true},//内容
    read:{type:Boolean,default:false},//是否已读
    create_time:{type:Number},//创建时间
    
})
const ChatModel = mongoose.model('chat',chatSchema)

exports.ChatModel = ChatModel
