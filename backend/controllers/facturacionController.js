const facturacionModel = require('../models/facturacionModel')

const facturacionController = {}

facturacionController.facturas = async function (req, res) {
    try {
        const data = await facturacionModel.getlista();

        res.status(200).json({
            message: "Información cargada correctamente",
            data
        });
    } catch (error) {
        console.error("Error en getDashboardFacturacion:", error);
        res.status(500).json({
            message: "Error al consultar la información",
            error
        });
    }
}

facturacionController.crearFacturacion = async function (req, res) {
    const data = {
        id_cliente: req.body.id_cliente,
        numero_factura: req.body.numero,
        fecha: req.body.fecha,
        subtotal: req.body.subtotal,
        impuesto: req.body.impuesto,
        total: req.body.total,
        estado: req.body.estado
    };

    try {
        const results = await facturacionModel.crearFactura(data);
        res.status(200).json({
            message: 'Factura creada exitosamente',
            results: results
        });
    } catch (error) {
        console.error('Error al crear la factura', error);
        res.status(500).json({
            message: 'Error al crear la factura',
            error: error
        });
    }
};

facturacionController.eliminarFactura = async function (req, res) {
    const data = {
        id: req.body.id
    };

    try {
        const results = await facturacionModel.quitarFactura(data)
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

facturacionController.actualizarEstado = async function (req, res) {
    const data = {
        id_factura: req.body.id_factura,
        estado: req.body.estado
    };

    try {
        const results = await facturacionModel.actualizarEstado(data);
        res.status(200).json({ message: 'Estado actualizado', results });
    } catch (error) {
        console.error('Error al actualizar estado', error);
        res.status(500).json({ message: 'Error al actualizar estado', error });
    }
};

module.exports = facturacionController