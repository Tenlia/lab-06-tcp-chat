'use strict';

const uuid = require('node-uuid');

module.exports = function(socket){
  this.socket = socket;
  this.username = `guest${Math.random()}`;
  this.id = uuid.v4();
};
