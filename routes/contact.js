const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact');

/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     description: Get contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', controller.getById);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
