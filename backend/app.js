const { PORT } = require('./config/config.js');
const express = require('express');
const cors = require('cors');

const app = express();
const port = PORT;

app.use(express.json());
app.use(cors());

const v1 = express.Router();
v1.use('/login/', require('./routes/v1/login'))
v1.use('/clientes', require('./routes/v1/clientes'))
v1.use('/facturacion', require('./routes/v1/facturacion'))
v1.use('/usuarios', require('./routes/v1/usuarios'))

app.use('/v1', v1);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto: ${port}`);
});