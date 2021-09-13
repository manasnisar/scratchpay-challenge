const express = require('express');
const { clinicController } = require('../../controllers');

const router = express.Router();

router.post('/getClinics', clinicController.getClinics);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Clinics
 *   description: Get clinics
 */

/**
 * @swagger
 * /clinic:
 *   get:
 *     summary: Get clinics
 *     description: Get clinics based on query
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Clinic name
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Name or code of the state the clinic is in e.g ("CA" or "California")
 *       - in: query
 *         name: availability
 *         schema:
 *           type: string
 *         description: available hours e.g (from:09:00, to:17:00)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Clinic'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
