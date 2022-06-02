const knex = require ('knex')

class ClienteSQLlite3 {
    constructor(options) {
        this.knex = knex(options)
    }

    crearTablaChat() {
        return this.knex.schema.dropTableIfExists('chat')
            .finally(() => {
                return this.knex.schema.createTable('chat', table => {
                    table.increments('id').primary()
                    table.string('author', 50).notNullable()
                    table.string('message', 2000).notNullable()
                    table.varchar('fecha', 10).notNullable()
                    table.varchar('hora', 20).notNullable()
                })
            })
    }

    insertarMensaje(mensaje) {
        return this.knex('chat').insert(mensaje)
    }

    listarMensajes() {
        return this.knex('chat').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ClienteSQLlite3