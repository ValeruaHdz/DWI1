const app = require('./app/app');
const config = require('./app/config/Configuracion');
const conexion = require('./app/config/conexion')

conexion.connect()

app.listen(config.PORT,()=>{
    console.log(`Aplicacion corriendo en puerto ${config.PORT}`);
})