const knex = require ('knex')

class ClienteSQL {
    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.increments('id').primary()
                    table.string('name', 50).notNullable()
                    table.varchar('description', 150).notNullable()
                    table.varchar('code', 10).notNullable()
                    table.float('price')
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }

    insertarProductos(producto) {
        return this.knex('productos').insert(producto)
    }

    listarProductos() {
        return this.knex('productos').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ClienteSQL