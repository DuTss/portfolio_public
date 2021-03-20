// EXPRESS
const router = require('express').Router();

// PAGE D'ACCUEIL CONTROLLER
const indexController = require('../controllers/indexController');

/**
 * @swagger
 * /:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA PAGE D'ACCUEIL AVEC CHACUN DES PROJETS
router.get('/', indexController.getIndexPage);

/**
 * @swagger
 * /projet/:id:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE UN PROJET SEUL
router.get('/projet/:id', indexController.getProjetSingle);

// EXPORTER LE ROUTER
module.exports = router;