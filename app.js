// DEPENDANCES
const express = require('express');
const helmet = require("helmet");  
const app = express();
const mysql = require('mysql');
const util = require('util');
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const connectFlash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const port = 2050;
const methodOverride = require('method-override');
const rateLimit = require("express-rate-limit");
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const robots = require('express-robots-txt');

// ROBOTS TXT
app.use(robots({ UserAgent: '*', Disallow: '/admin' }))

// SWAGGER
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Mon API pour mon portfolio",
        version: '1.0.0',
      },
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// EXPRESS RATE LIMIT
const lienAccueil = "https://emilien-portfolio.fr"
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 6, // Limite pour chaque IP 6 rechargements de page
    message: `<h1>Oupss.. vous avez forcé</h1>
    <p>Vous avez fais trop de requêtes, veuillez réessayer plus tard... ou revenir à la page d'<a href="${lienAccueil}">accueil </a></p>`
  });


// HELMET
app.use(helmet());


// .env
require('dotenv').config()


// Middleware - Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// MESSAGE AVEC CONNECT-FLASH
app.use(connectFlash())


// MYSQL
const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
database.connect((err) => {
    if(err) { throw err;}
    console.log('Connecté au serveur MySQL.');
});


// DECLARE LA VARIABLE GLOBALE QUERY SQL
global.querysql = util.promisify(database.query).bind(database)


// METHODE OVERRIDE
app.use(methodOverride('_method'))


// MySQL Express Session
var sessionStore = new MySQLStore({}, database)


// EXPRESS-SESSION
app.use(session({
    name: process.env.BISCU,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 //LE COOKIE DURERAS 24 HEURES
     }
}))


// EXPRESS-FILEUPLOAD
app.use(fileUpload());


// MIDDLEWARE
const verifyAuth = require('./middleware/verifyAuth')


// ROUTER 
const indexRoute = require('./routes/indexRoute');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute');


// URL ROUTE
app.use('/', indexRoute);
app.use('/auth', limiter, authRoute);
app.use('/admin', verifyAuth.getVerifyAuth, adminRoute);


// 404
app.get('*', function(req,res,next) {
    res.status(404);
    res.render('404.ejs');
});


// LISTEN
app.listen(port, () => {
    console.log(`Tourne sur le port : ${port}`);
});