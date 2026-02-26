En el repositorio ahi un archivo llamado .env.example en el que debera crear una contraseña en JWT_SECRET.
Si no pone una contraseña el programa fallara con errores como: MONGO_URI undefined y JWT_SECRET undefined porque se usa el process.env
