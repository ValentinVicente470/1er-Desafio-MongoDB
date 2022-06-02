const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const optionsSQL = require('./connections/SQLconn');
const optionsSQLITE = require('./connections/sqlite3conn');

const ClienteSQL = require('./contenedorProductos');
const ProdSQL = new ClienteSQL(optionsSQL);

const ClienteSQLlite3 = require('./contenedorMensajes');
const Chatsqlite3 = new ClienteSQLlite3(optionsSQLITE);

const app = express();

const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

app.set ('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname});
})

io.on('connection', async (sockets) => {

    sockets.emit('productos', await ProdSQL.listarProductos())

    console.log('Un cliente se ha conectado!: ' + sockets.id)

    sockets.emit('messages', await Chatsqlite3.listarMensajes())

    sockets.on('new-producto', async data => {

        await ProdSQL.insertarProductos(data)

        console.log(data)

        io.sockets.emit('productos', await ProdSQL.listarProductos())
    })

    sockets.on('new-message', async dato => {

        await Chatsqlite3.insertarMensaje(dato)

        console.log(dato)

        io.sockets.emit('messages', await Chatsqlite3.listarMensajes())
    })
})

//-----------------------------------------------------------------------------------------------------------

const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))