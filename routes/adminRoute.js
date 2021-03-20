// EXPRESS
const router = require('express').Router();

// ADMIN CONTROLLER
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * /admin:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA LISTE DES PROJETS SUR LA PAGE ADMIN
router.get('/', adminController.getAdmin)

/**
 * @swagger
 * /admin/ajouter-projet:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA PAGE AJOUTER UN PROJET
router.get('/ajouter-projet', adminController.getAjouterProjet)

/**
 * @swagger
 * /admin/ajouter-projet:
 *   post:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AJOUTE UN PROJET
router.post('/ajouter-projet', adminController.postAjouterProjet)

/**
 * @swagger
 * /admin/editer-projet/1:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// AFFICHE LA PAGE EDITER UN PROJET
router.get('/editer-projet/:id', adminController.getEditerProjet)

/**
 * @swagger
 * /admin/editer-projet/:id:
 *   put:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// EDITER/MODIFIER UN PROJET
router.put('/editer-projet/:id', adminController.putEditerProjet)

/**
 * @swagger
 * /admin/supprimer-projet/:id:
 *   delete:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// SUPPRIMER UN PROJET
router.delete('/supprimer-projet/:id', adminController.deleteProjet)

// EXPORTER LE ROUTER
module.exports = router