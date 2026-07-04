const express = require('express');
const router = express.Router();
const {Transaction, Envelope} = require('../models');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     description: Creates a transaction and deducts money from the selected envelope.
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - recipient
 *               - transaction_date
 *               - envelope_id
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 350
 *               recipient:
 *                 type: string
 *                 example: Checkers
 *               transaction_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-04
 *               envelope_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Insufficient funds
 *       404:
 *         description: Envelope not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.post('/', authenticateToken, async(req, res) => {
    try {
        const {
            amount,
            recipient,
            transaction_date,
            envelope_id
        } = req.body;

        const envelope = await Envelope.findOne({where: {
            id: envelope_id,
            user_id: req.user.id
        }});

        if (!envelope) {
           return res.status(404).send('Envelope not found');
        }

        if (amount > envelope.budget) {
            return res.status(400).send('Insufficient funds');
        }

         envelope.budget -= amount;
         await envelope.save();

         const transaction = await Transaction.create({
            amount, recipient, transaction_date, envelope_id
         });

         res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Returns all transactions belonging to the authenticated user.
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.get('/', authenticateToken, async(req, res) => {
    try {
        const transactions = await Transaction.findAll({include: {
            model: Envelope,
            where: {
                user_id: req.user.id
            }
        }});
        res.status(200).json(transactions);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a specific transaction
 *     description: Returns a single transaction belonging to the authenticated user.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.get('/:id', authenticateToken, async(req, res) => {
    try {
        const transaction = await Transaction.findOne({where:{
            id: req.params.id
        },
        include: {
            model: Envelope,
            where: {
                user_id: req.user.id
            }
        }
    });

        if (!transaction) {
        return res.status(404).send('Transaction not found')
    }

    res.status(200).json(transaction);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});


/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Updates an existing transaction belonging to the authenticated user.
 *     tags:
 *       - Transactions
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
 *               amount:
 *                 type: number
 *                 example: 450
 *               recipient:
 *                 type: string
 *                 example: Woolworths
 *               transaction_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-05
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.put('/', authenticateToken, async(req, res) => {
    try {

        const transaction = await Transaction.findOne({where: {
            id: req.params.id
        },
        include: {
            model: Envelope,
            where: {
                user_id: req.user.id
            }
        }
    });

        if (!transaction) {
        return res.status(404).send('Transaction not found');
    }

        const envelope = await Envelope.findOne({where:{
            id: envelope_id,
            user_id: req.user.id
        }});

        const oldAmount = Number(transaction.amount);
        const newAmount = Number(req.body || oldAmount);

        envelope.budget += oldAmount

        if (newAmount > envelope.budget) {
        return res.status(400).send('Insufficient funds')
    }

        envelope.budget -= newAmount;
        envelope.save();

        await transaction.update(req.body);

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Deletes a transaction belonging to the authenticated user.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
router.delete('/:id', authenticateToken, async(req, res) => {
    try {
        const transaction = await Transaction.findOne({where: {
            id: req.params.id
        },
        include: {
            model: Envelope,
            where: {
                user_id: req.user.id
            }
        }
    });

        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        const envelope = await Envelope.findOne({where: {
            id: envelope_id,
            user_id: req.user.id
        }});

        envelope += Number(transaction.amount);
        await envelope.save();

        await transaction.destroy();

        res.status(200).send();
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;