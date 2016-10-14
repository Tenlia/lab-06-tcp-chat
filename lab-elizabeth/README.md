Elizabeth Kleinschmidt

##About

This is my Chat server!

With the files in this repo, you should be able to host a very simple chat server that allows you to connect with friends in the terminal like it were a small chat room. You can message everyone or just one person at a time. You can even summon a list of people who are in the chat room to see who you'd like to talk to.

##Getting Started

Before you can run these files, you will need to make sure that you have Node installed.

You can go to https://nodejs.org/ download from there, extract the file and install.

Then, you need to go to the directory containing the server.js file and open it using node with the command `PORT=<your-port-number> node server.js` this will automatically start your server in the port you choose, you can also choose to enter just `node server.js` and it will automatically open the server on port 3000 for you.

to exit the server, you simply need to hold ctrl and press C.

##Joining a server

If you wish to join a server using this documentation, you will need to type `telnet localhost <port-number>` you will need the port number from your server host in order to connect.

to exit the server, you need to hold ctrl and press ']', then type 'quit' when the telnet prompt appears.

##Commands

`\nick <name>` allows you to set your username (or nickname)

`\dm <person> <message>` allows you to privately message people

`\all <message>` messages everyone on the server at the same time

`\who` will give you a list of currently active users
