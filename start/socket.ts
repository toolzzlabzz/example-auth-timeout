import OpenAIService from 'App/Services/OpenAI.service'
import Ws from 'App/Services/Ws'

Ws.start((cb) => console.log('SocketIO started'))

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('message', (data) => {
  })
})
