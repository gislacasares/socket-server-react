
class Sockets {

   constructor( io ){
      this.io = io;

      this.socketEventos();
   }

   socketEventos( ){
      //Acá estarán todos los eventos de la comunicación socket.

      //On connection
      this.io.on('connection', ( socket ) => { 
         /* aquí va la conexion de los clientes*/ 
         console.log("socket id: ", socket.id);

         //Escuchar evento: mensaje-to-server
         socket.on('mensaje-to-server', ( data ) => {
            console.log(data);
            //Una vez que el server recibe el mensaje del cliente, lo debe emitir a los otros clientes
            this.io.emit('mensaje-from-server', data );
         })
      });
   }
}

module.exports = Sockets;