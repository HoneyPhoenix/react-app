
const {ChatModel} =  require('../db/mongodb')

module.exports = function(server){
    const io = require('socket.io')(server)
    console.log('消息监听已启动')
    io.on('connection',function(socket){
        console.log('有一个客户端已连接')
        socket.on('sendMsg',function({from,to,content}){
           
            const chat_id =[from,to].sort().join('-')
            const create_time=Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save((err,chatMsgs)=>{
                io.emit('receiveMsg',chatMsgs)//向所有连接的客户端发送消息
            })
            
        })
    })
    
}