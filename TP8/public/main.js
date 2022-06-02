const sockets = io.connect()

//--------PRODUCTOS------------------------------------------------------------------------

function addProducto(a) {

    const producto = {
        name: document.getElementById ("name").value,
        description: document.getElementById ("description").value,
        code: document.getElementById ("code").value,
        price: document.getElementById ("price").value,
        thumbnail: document.getElementById ("thumbnail").value,
    }

    sockets.emit ('new-producto', producto)

    return false
}

function render (data) {
    
    const html = data.map ((elem, index) => {

        return (`<tr>
        <td>${elem.name}</td>
        <td>${elem.description}</td>
        <td>${elem.code}</td>
        <td>${elem.price}</td>
        <td> <img src="${elem.thumbnail}" height="50px"> </img> </td>
        <td>${elem.id}</td> </tr>`)

    }).join(' ')

    document.getElementById("productos").innerHTML = html
}

sockets.on('productos', function(data) {render(data)})


//--------CHAT------------------------------------------------------------------------------

function addMessage(o) {

    let date = new Date();

    const message = {

        author: document.getElementById("username").value,
        message: document.getElementById("text").value,
        fecha: date.toLocaleDateString(),
        hora: date.toLocaleTimeString(),
    }

    sockets.emit("new-message", message);

    return false
}

function renders(dato) {

    const html1 = dato.map((element, index) => {  

        return(`
        <div>
            <div class="Cont_todo">
                <strong>${element.author}</strong>
                <em class="Usuario_fyh">[${element.fecha} - ${element.hora}]</em>
                <em class="Usuario_mensj">${element.message}</em>
            </div>
        </div>`)

    }).join(' ')

    document.getElementById("messages").innerHTML = html1
}

sockets.on('messages', function(dato) {renders(dato)})


























