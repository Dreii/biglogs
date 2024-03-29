let serv = require('http').createServer()
let io = require('socket.io')(serv)

//A class of socket helpers
class SocketController{
  constructor(){
    this.PORT = 3231
    this.connectedUsers = []

    this.connect = () => {
      io.on('connection', (socket)=>{

        socket.on('USER_CONNECTED', ()=>{
          if(!this.connectedUsers.includes(socket.id)){
            this.connectedUsers.push(socket.id)
          }

          console.log("connect", this.connectedUsers);
        })

        socket.on('disconnect', () => {
          //find the object by searching for socket
          let index = this.connectedUsers.findIndex(obj =>{
            return obj === socket.id
          })

          this.connectedUsers.splice(index, 1)

          console.log("disconnect", this.connectedUsers);
        })
      })

      serv.listen(this.PORT, ()=>{
        console.log("CONNECTED to port: "+this.PORT);
      })
    }

    this.updateBusinesses = (updates) => {
      this.connectedUsers.forEach((socket)=>{
        console.log(updates);
        io.emit("BUSINESS_UPDATE", updates)
      })
    }

    // this.updateMatch = (matchData, sender) => {
    //   console.log("should update here");
    //   let reciever
    //
    //   reciever = sender === 1 ? matchData.playerTwo : matchData.playerOne
    //   reciever = reciever !== undefined ? reciever.id.toString() : ''
    //
    //   let playerSocketObject = this.connectedUsers.find((connection)=>{
    //     console.log(connection, reciever);
    //     return connection.user.toString() === reciever
    //   })
    //
    //   if(playerSocketObject){
    //     console.log(playerSocketObject.socket);
    //     if(io.sockets.connected[playerSocketObject.socket])
    //       io.sockets.connected[playerSocketObject.socket].emit('MATCH_UPDATED', matchData)
    //   }else{
    //     console.log("no connected user");
    //   }
    // }
  }
}

SocketController.io = io

module.exports = new SocketController();
