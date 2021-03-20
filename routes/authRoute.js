// EXPRESS
const router = require('express').Router();

// AUTH CONTROLLER
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA PAGE LOGIN
router.get('/login', authController.getLogin)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// SE CONNECTER
router.post('/login', authController.postLogin)

/**
 * @swagger
 * /auth/register:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA PAGE REGISTER
router.get('/register', authController.getRegister)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// INSCRIPTION DANS REGISTER
router.post('/register', authController.postRegister)

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// LOGOUT
router.get('/logout', authController.getLogout)

// EXPORTER LE ROUTER
module.exports = router