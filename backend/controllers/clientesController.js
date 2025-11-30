const clientesModel = require('../models/clientesModel')

const clientesController = {}

clientesController.clientes = async function (req, res) {
    try {
        const datos_clientes = await clientesModel.getClientes()
        res.status(200).json({
            clientes: datos_clientes
        })

    } catch (error) {
        console.error('Error al obtener el listado de clientes:', error)
        res.status(500).json({error: 'Error al obtener los datos'})
    }
}

clientesController.crearCliente = async function (req, res) {
    const data = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    }

    try {
        const results = await clientesModel.crearCliente(data)
        res.status(200).json({
            message: 'Cliente creado exitosamente',
            results: results
        })
    } catch (error) {
        console.error('Error al crear el Cliente', error)
        res.status(500).json({
            message: 'Error al crear el Cliente',
            error: error
        })
    }
}

clientesController.consultarCliente = async function (req, res) {
    const id = req.params.id;

    try {
        const results = await clientesModel.consultarCliente(id)
        res.status(200).json({
            message: 'Cliente consultado',
            detallesCliente: results
        })
    } catch (error) {
        console.error('Error al consultar Cliente:', error)
        res.status(500).json({
            message: 'Error al consultar Cliente',
            error: error
        })
    }
}

clientesController.editarCliente = async function (req, res) {
    const data = {
        id: req.body.id,
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    }

    try {
        const results = await clientesModel.editarCliente(data)
        res.status(200).json({
            message: 'Cliente editado correctamente',
            results: results
        })
    } catch (error) {
        console.error('Error al editar el Cliente', error);
        res.status(500).json({
            message: 'Error al editar el Cliente',
            error: error
        })
    }
}

clientesController.eliminarCliente = async function (req, res) {
    const data = {
        id: req.body.id,
        estado: req.body.estado
    };

    try {
        const results = await clientesModel.desactivarCliente(data)
        res.status(200).json({
            message: 'Estado cambiado correctamente',
            results: results
        });
    } catch (error) {
        console.error('Error al editar estado')
        res.status(500).json({
            message: 'Error al editar el estado',
            error: error
        })
    }
}

module.exports = clientesController