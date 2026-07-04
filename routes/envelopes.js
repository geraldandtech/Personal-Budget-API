const express = require('express');
const router = express.Router();
const envelopeRoutes = require('../models');
const authenticateToken = require('../middleware/auth');


/**
 * @swagger
 * /envelopes:
 *   post:
 *     summary: Create a new envelope
 *     description: Creates a budget envelope for the authenticated user.
 *     tags:
 *       - Envelopes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - budget
 *             properties:
 *               name:
 *                 type: string
 *                 example: Food
 *               budget:
 *                 type: number
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Envelope created successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.post('/', authenticateToken, async (req, res) => {
    try {
        const envelope = await Envelope.create({...req.body, user_id: req.user.id});
        res.status(201).json(envelope);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /envelopes:
 *   get:
 *     summary: Get all envelopes for the logged in user
 *     description: Returns all budget envelopes that belong to the authenticated user.
 *     tags:
 *       - Envelopes
 *     responses:
 *       200:
 *         description: Successfully retrieved envelopes
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.get('/', authenticateToken, async (req, res) => {
    try {
        const envelopes = await envelopeRoutes.Envelope.findAll({where: {
            user_id: req.user.id
        }});

        res.status(200).json(envelopes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /envelopes/{id}:
 *   get:
 *     summary: Get a specific envelope
 *     description: Returns a single envelope that belongs to the authenticated user.
 *     tags:
 *       - Envelopes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Envelope ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Envelope found
 *       404:
 *         description: Envelope not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */ 
router.get('/:id', authenticateToken, async(req, res) => {
    try {
        const envelope = await Envelope.findOne({where: {
            id: req.params.id,
            user_id: req.user.id
        }})

        if (!envelope) {
            return res.status(404).send('Envelope not found');
        }

        res.status(200).json(envelope);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /envelopes/{id}:
 *   put:
 *     summary: Update an envelope
 *     description: Updates an existing envelope belonging to the authenticated user.
 *     tags:
 *       - Envelopes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Groceries
 *               budget:
 *                 type: number
 *                 example: 3000
 *     responses:
 *       200:
 *         description: Envelope updated successfully
 *       404:
 *         description: Envelope not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.put('/:id', authenticateToken, async(req, res) => {
    try {
        const envelope = await Envelope.findOne({where: {
            id: req.params.id,
            user_id: req.user.id
        }});
        if (!envelope) {
            return res.status(404).send('Envelope not found');
        }

        await envelope.update(req.body);

        res.status(200).json(envelope);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /envelopes/{id}:
 *   delete:
 *     summary: Delete an envelope
 *     description: Deletes an envelope belonging to the authenticated user.
 *     tags:
 *       - Envelopes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Envelope deleted successfully
 *       404:
 *         description: Envelope not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const envelope = await envelope.findOne({where: {
            id: req.params.id,
            user_id: req.user.id
        }});

        if (!envelope) {
            return res.status(404).send('envelope not found');
        }

        await envelope.destroy()

        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;


