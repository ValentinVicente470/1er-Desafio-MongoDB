const optionsSQL = require('./SQLconn');
const ClienteSQL = require('../contenedorProductos');
const ProdSQL = new ClienteSQL(optionsSQL);

const optionsSQLITE3 = require('./sqlite3conn');
const Clientesqlite3 = require('../contenedorMensajes');
const Chatsqlite3 = new Clientesqlite3(optionsSQLITE3);

ProdSQL.crearTabla();
Chatsqlite3.crearTablaChat();