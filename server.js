/* const & var */
const express = require('express');
const app = express();
const hbs = require('hbs');
var bodyParser = require('body-parser')
const { Pool } = require('pg')
const port = process.env.PORT || 3000;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'relacionaldatos',
    password: '1234',
    port: 5432,
})

/* Helpers */
require('./hbs/helpers');

/* Express static */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/* Actualizar tabla natalidad */
app.post('/actualizart', (req, res) => {
    const { anios, total } = req.body;
    pool.query(`UPDATE tasanatalidad SET total = $2 WHERE años = $1`, [anios, total], (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});

/* Actualizar tabla natalidad masculina */
app.post('/actualizarm', (req, res) => {
    const { anios, total } = req.body;
    pool.query(`UPDATE tasanatalidad SET masculina = $2 WHERE años = $1`, [anios, total], (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});

/* Actualizar tabla natalidad femenina */
app.post('/actualizarf', (req, res) => {
    const { anios, total } = req.body;
    pool.query(`UPDATE tasanatalidad SET femenina = $2 WHERE años = $1`, [anios, total], (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});

/* Borrar tabla natalidad */
app.post('/borrar', (req, res) => {
    const { anios } = req.body;
    pool.query(`DELETE FROM tasanatalidad WHERE años = $1`, [anios], (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});

/* Insertar tabla natalidad */
app.post('/insertar', (req, res) => {
    const { anios, total, masculina, femenina } = req.body;
    pool.query('INSERT INTO tasanatalidad (años, total, masculina, femenina) VALUES ($1, $2, $3, $4)', [anios, total, masculina, femenina], (error, results) => {
        if (error) {
            res.send("Error No se puede obtener Conexion Con base de datos")
        } else {
            res.send("Datos Enviados")
        }
    })
});

/* Consulta: todo tabla natalidad */
app.get('/default', function(request, response) {
    console.log('GET request received at /')
    pool.query('select * from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }
    });
});

/* Consulta: años masculino tabla natalidad */
app.get('/opcion1', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,masculina from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

/* Consulta: años femenino tabla natalidad */
app.get('/opcion2', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,femenina from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

/* Consulta: años total tabla natalidad */
app.get('/opcion3', function(request, response) {
    console.log('GET request received at /')
    pool.query('select años,total from tasanatalidad', function(err, result) { // consulta de base de datos a postgres
        if (err) {
            response.send("error")
        } else {
            response.send(result.rows) // se manda el JSON
        }

    });
});

/* handlebars hbs partials*/
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs'); //rendiriza la vista 

/* Dashboard */
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        titulo: "Dashboard",
        pgtitulo: "REPORTES",
        tipo: "Home"
    });
});

/* Pagina login */
app.get('/', (req, res) => {
    res.render('login', {
        titulo: "Login"
    });
});

/* Pagina acerca de */
app.get('/acerca', (req, res) => {
    res.render('acerca', {
        titulo: "Acerca",
        pgtitulo: "AUTORES",
        tipo: "Autores"
    });
});

/* Pagina mantenimiento */
app.get('/mantenimiento', (req, res) => {
    res.render('mantenimiento', {
        titulo: "Mantenimiento",
        pgtitulo: "MANTENIMIENTO",
        tipo: "Administrador"
    });
});

/* Pagina usuarios */
app.get('/users', (req, res) => {
    res.render('users', {
        titulo: "Users",
        pgtitulo: "USUARIOS",
        tipo: "Usuarios"
    });
});

/* Puerto servidor */
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});