![cf](https://i.imgur.com/7v5ASc8.png) lab-06-tcp-chat-server
======

## To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Include
* gitignore
* eslint
* package.json
* gulpfile
* readme
 * Write a paragraph about your project
 * Write docs on how to get the project running
 * Write docs on how to connect to the server

## Directions
* Create a TCP Server use using the net module
* Create a Client Constructor
* When sockets connect to the server a new `Client` instance should be made
* Clients should have a unique `id` from `node-uuid`
 * **e.g.** `2309-4802-3948-...`
* Clients should have a unique 'nickname'
 * **e.g.** `guest-43`
* When sockets are connected with the ClientPool they should be given event listeners for `data`, `error`, and `close` events
 * When a socket emits the `close` event the socket should be removed from the client pool!
 * When a socket emits the `error` event the error should be logged on the server
 * When a socket emits the `data` event the data should be logged on the server and the `\wack` commands below should be implemented

# Wack commands `'\'`
* `\all` should trigger a broadcast event
* `\nick` should allow a user change their nickname
* `\dm` should allow a user to send a message directly to another user by nick name
* when a user speaks their nickname should be printed
 * **i.e.** `teapot: Sup Hacker?`

## Bonus
* 2pts Write a test that
 * that tests `\nick` actually changes a clients nickname
