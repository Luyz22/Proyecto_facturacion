const express = require('express');
const router = express.Router();
const clientesController = require('../../controllers/clientesController')
const { verificarToken } = require('../../middlewares/verificarToken'); 

router.get('/getCliente', verificarToken, clientesController.clientes)
router.post('/crearCliente', verificarToken, clientesController.crearCliente)
router.get('/consultarCliente/:id', verificarToken, clientesController.consultarCliente)
router.post('/editarCliente', verificarToken, clientesController.editarCliente)
router.post('/desactivarCliente', verificarToken, clientesController.eliminarCliente)
module.exports = router