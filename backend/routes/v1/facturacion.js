const express = require('express');
const router = express.Router();
const facturacionController = require('../../controllers/facturacionController')
const { verificarToken } = require('../../middlewares/verificarToken'); 

router.get('/listar', verificarToken, facturacionController.facturas)
router.post('/crear', verificarToken, facturacionController.crearFacturacion)
router.post('/eliminar', verificarToken, facturacionController.eliminarFactura)
router.post('/actualizarEstado', verificarToken, facturacionController.actualizarEstado)
module.exports = router