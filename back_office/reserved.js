//const { getClients } = require("../db.js");
import { getClients } from './db.js';
console.log(
  `${getClients({ name: "Maria", client_id: "123bbn4" })} .`
);