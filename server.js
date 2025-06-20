const app = require('./app/app');
const config = require('./app/config/configuracion');

app.listen(config.PORT, () => {
    console.log(`Aplicación corriendo en ${config.PORT}`);
}); 