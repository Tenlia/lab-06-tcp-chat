'use strict';

// node modules
const net = require('net');
const EE = require('events');

// npm modules
// app modules
const Client = require('./model/client.js');

// env vars
const PORT = process.env.PORT || 3000;

// module constants
const pool = [];
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', function(client, string){
  client.username = string.trim();
});

ee.on('\\all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.username}: ` + string);
  });
});

ee.on('\\dm', function(client, string){
  console.log(string);
  var target = '';
  if(pool.contains(target)){
    client.socket.write(`${client.username}: ` + string);
    target.socket.write(`${client.username}: ` + string);
  } else {
    client.socket.write('sorry, that user does not exist');
  }
});

ee.on('default', function(client, string){
  client.socket.write('that is not a command');
});

/// module logic
server.on('connection', function(socket){
  var client = new Client(socket);
  while(pool.contains(client.username)){
    client.username = `guest${Math.random()}`;
  }
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });

  socket.on('end', function(){
    pool.pop(client);
    pool.forEach( c => {
      c.socket.write(`${client.username} has left the server`);
    });
  });

});

server.listen(PORT, function(){
  console.log('server running on port', PORT);
});
