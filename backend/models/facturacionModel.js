const connection = require('../config/connection');

const facturacionModel = {}

facturacionModel.getlista = function () {
    return new Promise((resolve, reject) => {

        const estadisticasQuery = `
            SELECT
                (SELECT COUNT(*) FROM facturas WHERE estado_general = 1) AS total_facturas,
                (SELECT COUNT(*) FROM facturas WHERE estado = 'PAGADA' and estado_general = 1) AS facturas_pagadas,
                (SELECT COUNT(*) FROM facturas WHERE estado = 'PENDIENTE' and estado_general = 1) AS facturas_pendientes,
                (SELECT IFNULL(SUM(total), 0) FROM facturas WHERE estado_general = 1) AS monto_total
        `;

        const listadoQuery = `
            SELECT 
                f.id_factura,
                f.numero_factura,
                DATE_FORMAT(f.fecha,'%d-%m-%Y') as fecha,
                f.total,
                f.estado,
                CONCAT(c.nombres, ' ', c.apellidos) AS cliente
            FROM facturas f
            INNER JOIN clientes c ON c.id_cliente = f.id_cliente
            WHERE f.estado_general = 1
            ORDER BY f.id_factura DESC
        `;

        connection.query(estadisticasQuery, (errStats, stats) => {
            if (errStats) return reject(errStats);

            connection.query(listadoQuery, (errList, listado) => {
                if (errList) return reject(errList);

                resolve({
                    estadisticas: stats[0],
                    listado: listado
                });
            });
        });
    });
};

facturacionModel.crearFactura = function (data) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO facturas
                (id_cliente, numero_factura, fecha, subtotal, impuesto, total, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            query,
            [
                data.id_cliente,
                data.numero_factura,
                data.fecha,
                data.subtotal,
                data.impuesto,
                data.total,
                data.estado
            ],
            (error, results) => {
                if (error) {
                    console.error('Error en crearFactura:', error);
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

facturacionModel.actualizarEstado = function (data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE facturas SET estado = ? WHERE id_factura = ?`,
            [data.estado, data.id_factura],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

facturacionModel.actualizarFactura = function (id_factura, data) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE facturas SET
                id_cliente = ?,
                numero_factura = ?,
                fecha = ?,
                subtotal = ?,
                impuesto = ?,
                total = ?,
                metodo_pago = ?,
                estado = ?
            WHERE id_factura = ?
        `;

        connection.query(
            query,
            [
                data.id_cliente,
                data.numero_factura,
                data.fecha,
                data.subtotal,
                data.impuesto,
                data.total,
                data.metodo_pago,
                data.estado,
                id_factura
            ],
            (error, results) => {
                if (error) {
                    console.error('Error en actualizarFactura:', error);
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

facturacionModel.quitarFactura = function (data) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE facturas SET estado_general = 0 WHERE id_cliente = ?';
        connection.query(query, [data.id], (error, results)=> {
            if (error) {
                console.error('Error al realizar la consulta quitarFactura:', error);
                return reject(error);
            }
            resolve(results);
        })
    })
}

module.exports = facturacionModel;