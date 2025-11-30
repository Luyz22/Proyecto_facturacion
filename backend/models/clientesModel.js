const connection = require('../config/connection');

const clientesModel = {}

clientesModel.getClientes = function () {
    return new Promise((resolve, reject) => {
        const query = `SELECT c.id_cliente,
                              c.tipo_documento as tipo_documento,
                              c.numero_documento,
                              c.nombres,
                              c.apellidos,
                              c.email,
                              c.telefono,
                              c.direccion,
                              c.estado,
                              DATE_FORMAT(c.fecha_creacion,'%d-%m-%Y') as fecha_creacion
                    FROM clientes as c
                    WHERE estado = 1`;
        
        connection.query(query, (error, data) => {
            if (error) {
                console.error('Error al realizar la consulta getClientes:', error);
                return reject(error);
            }
            resolve(data);
        }) 
    })
}

clientesModel.crearCliente = function (data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO clientes 
                    (tipo_documento, numero_documento, nombres, apellidos, email, telefono, direccion, estado)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;
        connection.query(query, [data.tipo_documento, data.numero_documento, data.nombres, data.apellidos, data.email, data.telefono, data.direccion], (error, results)=> {
            if (error) {
                console.error('Error al realizar la consulta crearCliente:', error);
                return reject(error);
            }
            resolve(results);
        })
    })
}

clientesModel.consultarCliente = function (id) {
    return new Promise((resolve, reject)=> {
        const query = `SELECT c.id_cliente,
                              c.tipo_documento as tipo_documento,
                              c.numero_documento,
                              c.nombres,
                              c.apellidos,
                              c.email,
                              c.telefono,
                              c.direccion,
                              c.estado,
                              DATE_FORMAT(c.fecha_creacion,'%d-%m-%Y') as fecha_creacion
                    FROM clientes as c
                    WHERE estado = 1`;
        connection.query(query, [id], (error, detalles) => {
            if (error) {
                console.error('Error al realizar la consulta consultarCliente:', error);
                return reject(error);
            }
            resolve(detalles[0]);
        })
    })
}

clientesModel.desactivarCliente = function (data) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE clientes SET estado = ? WHERE id_cliente = ?';
        connection.query(query, [data.estado, data.id], (error, results)=> {
            if (error) {
                console.error('Error al realizar la consulta desactivarCliente:', error);
                return reject(error);
            }
            resolve(results);
        })
    })
}

clientesModel.editarCliente = function (data_params) {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE clientes SET ';
        let data = [];
        let updateFields = [];

        if (data_params.tipo_documento) {
            updateFields.push("tipo_documento = ?");
            data.push(data_params.tipo_documento);
        }
        
        if (data_params.numero_documento) {
            updateFields.push("numero_documento = ?");
            data.push(data_params.numero_documento);
        }
    
        if (data_params.nombre) {
            updateFields.push("nombres = ?");
            data.push(data_params.nombre);
        }

        if (data_params.apellidos) {
            updateFields.push("apellidos = ?");
            data.push(data_params.apellidos);
        }

        if (data_params.email) {
            updateFields.push("email = ?");
            data.push(data_params.email);
        }

        if (data_params.telefono) {
            updateFields.push("telefono = ?");
            data.push(data_params.telefono);
        }

        if (data_params.direccion) {
            updateFields.push("direccion = ?");
            data.push(data_params.direccion);
        }

        if (updateFields.length > 0) {
            query += updateFields.join(", ");
            query += " WHERE id_cliente = ? ";
            data.push(data_params.id)

        connection.query(query, data, (error, results) => {
            if (error) {
                console.error('Error al realizar editarCliente', error);
                resolve([])
            } else {
                resolve(results);
            }
        })
        } else {
            resolve({ message: 'No hay campos para actualizar'})
        }
    })
}

module.exports = clientesModel;