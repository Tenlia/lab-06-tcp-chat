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
  var oldUserName = client.username;
  client.username = string.trim();
  client.socket.write(`username changed to ${client.username}.` + '\n');
  console.info(`${oldUserName} has changed username to ${client.username}.` + '\n');
});

ee.on('\\all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.username}: ` + string + '\n');
  });
});

ee.on('\\dm', function(client, string){
  pool.forEach(target => {
    if(target.username == string.split(' ').shift().trim()){
      client.socket.write(`${client.username}: ` + string.split(' ').slice(1).join(' '));
      target.socket.write(`${client.username}: ` + string.split(' ').slice(1).join(' '));
    }
  });
});

ee.on('\\who', function(client){
  pool.forEach(currentPoolClient => {
    client.socket.write(`${currentPoolClient.username}` + '\n');
  });
});

ee.on('default', function(client){
  client.socket.write('that is not a command' + '\n');
});

// module logic
server.on('connection', function(socket){
  var client = new Client(socket);

  pool.forEach(currentPoolClient => {
    if(currentPoolClient.username === client.username){
      client.username = `guest${Math.random()}`;
    }
  });
  pool.push(client);
  console.info(`${client.username} has joined the server.`);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();
    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });

  socket.on('close', function(){
    pool.forEach(function(currentPoolClient){
      var tempUsername = client.username;
      if(currentPoolClient.id === client.id){
        let clientIndex = pool.indexOf(currentPoolClient);
        pool.splice(clientIndex, clientIndex + 1);
      }
      console.info(`${tempUsername} has left the server`);
    });
  });

  socket.on('error', function(){
    pool.forEach(function(currentPoolClient){
      var tempUsername = client.username;
      if(currentPoolClient.id === client.id){
        let clientIndex = pool.indexOf(currentPoolClient);
        pool.splice(clientIndex, clientIndex + 1);
      }
      console.info(`${tempUsername} has had an error`);
      console.info(`${tempUsername} has left the server`);
    });
  });

});

server.listen(PORT, function(){
  console.info('server running on port', PORT);
});
