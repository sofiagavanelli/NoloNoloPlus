//const { getClients } = require("../db.js");
//import { getClients } from '../db.js';
/*const lib = require("./lib");
console.log(lib);
const { add, subtract, num } = require("./lib");*/
const getClients = require("../db");
console.log(
  `${getClients({ name: "Maria", client_id: "123bbn4" })} .`
);