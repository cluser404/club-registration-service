const express = require('express');
const validate = require('../middlewares/validate');

const {
    createRegistrationSchema,
    updateRegistrationSchema
} = require('../validation/registration.validation')

const {
    createRegistration,
    getAllRegistrations,
    getRegistration,
    updateRegistration,
    deleteRegistration
} = require('../controllers/registration.controller');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       required:
 *         - studentId
 *         - name
 *         - orgEmail
 *       properties:
 *         studentId:
 *           type: string
 *         name:
 *           type: string
 *         semester:
 *           type: string
 *         program:
 *           type: string
 *           enum:
 *             - Applied Physics & Electronics
 *             - Anthropology
 *             - Architecture
 *             - BBA
 *             - Biotechnology
 *             - Computer Science
 *             - Computer Science & Engineering
 *             - Economics
 *             - Electrical & Electronic Engineering
 *             - Electronics & Communication Engineering
 *             - English
 *             - LLB
 *             - Mathematics
 *             - Microbiology
 *             - Pharmacy
 *             - Physics
 *             - Other
 *         personalEmail:
 *           type: string
 *           format: email
 *         orgEmail:
 *           type: string
 *           format: email
 *         mobile:
 *           type: string
 *         address:
 *           type: string
 *         bio:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         residentialSemester:
 *           type: string
 *         preferredDepartments:
 *           type: array
 *           items:
 *             type: string
 *         githubProfileLink:
 *           type: string
 *           format: uri
 *         facebookProfileLink:
 *           type: string
 *           format: uri
 *         linkedInProfileLink:
 *           type: string
 *           format: uri
 *         instragramProfileLink:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Registration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Validation failed or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Validation failed
 */
router.post('/', validate(createRegistrationSchema), createRegistration);

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Get all registrations with filters and pagination
 *     tags: [Registration]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of registrations per page
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female, other]
 *         description: Filter by gender
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name (partial, case-insensitive)
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         description: Filter by student ID (exact match)
 *       - in: query
 *         name: semester
 *         schema:
 *           type: string
 *         description: Filter by semester (exact match)
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: string
 *         description: Filter by mobile number (exact match)
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *           enum:
 *             - Applied Physics & Electronics
 *             - Anthropology
 *             - Architecture
 *             - BBA
 *             - Biotechnology
 *             - Computer Science
 *             - Computer Science & Engineering
 *             - Economics
 *             - Electrical & Electronic Engineering
 *             - Electronics & Communication Engineering
 *             - English
 *             - LLB
 *             - Mathematics
 *             - Microbiology
 *             - Pharmacy
 *             - Physics
 *             - Other
 *         description: Filter by academic program (exact match)
 *       - in: query
 *         name: preferredDepartment
 *         schema:
 *           type: string
 *         description: Comma-separated preferred departments to filter (matches any)
 *       - in: query
 *         name: personalEmail
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter by personal email (exact match)
 *       - in: query
 *         name: orgEmail
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter by organizational email (exact match)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter registrations created on or after this date/time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter registrations created on or before this date/time
 *     responses:
 *       200:
 *         description: List of registrations matching filters with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 filters:
 *                   type: object
 *                   description: The filters applied in this query
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Server error
 */
router.get('/', getAllRegistrations);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Registration found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Registration not found
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID format
 *       500:
 *         description: Server error
 */
router.get('/:id', getRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   patch:
 *     summary: Partially update a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration ID (MongoDB ObjectId)
 *     requestBody:
 *       description: Fields to update (any subset of Registration fields)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Validation failed or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Validation failed
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Registration not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', validate(updateRegistrationSchema), updateRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration deleted successfully
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Registration not found
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID format
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteRegistration);

module.exports = router;