//Servidor de Express
const express = require('express');
//Servidor de sockets
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {

   constructor(){

      this.app = express();
      this.port = process.env.PORT;

      //HTTP Server
      this.server = http.createServer( this.app );

      //Configuraciones de Sockets
      this.io = socketio( this.server, { /* configuraciones */ } );
   }

   middlewares(){
      //Desplegar el directorio público con este middleware
      this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

      //CORS
      this.app.use( cors() );
   }

   configurarSockets(){
      new Sockets( this.io );
   }

   //Método que inicializa la aplicación
   execute(){

      //Inicializar middlewares
      this.middlewares();

      //Inicializar Sockets


      //Inicializar Server
      this.server.listen( this.port, () => {
         console.log(`Server corriendo en el port: ${ this.port } `);
      }); 
   }
}

module.exports = Server;