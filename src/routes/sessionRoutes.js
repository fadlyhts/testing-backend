const express = require('express');
const { body, query } = require('express-validator');
const { sessionController } = require('../controllers');
const { auth } = require('../middleware');
const { validate } = require('../middleware/validation');

const router = express.Router();

// All session routes require authentication
router.use(auth.verifyToken);

/**
 * @route GET /api/session/active
 * @desc Get all active sessions
 * @access Private
 */
router.get('/active', sessionController.getActiveSessions);

/**
 * @route GET /api/session/date
 * @desc Get sessions by date range
 * @access Private (Admin only)
 */
router.get(
    '/date',
    auth.isAdmin,
    validate([
        query('start_date').notEmpty().withMessage('Start date is required'),
        query('end_date').notEmpty().withMessage('End date is required')
    ]),
    sessionController.getSessionsByDateRange
);

/**
 * @route GET /api/session/:id
 * @desc Get session by ID
 * @access Private
 */
router.get('/:id', sessionController.getSessionById);

/**
 * @route POST /api/session/start
 * @desc Start a new driver session (clock in)
 * @access Private (Driver only)
 */
router.post(
    '/start',
    auth.isDriver,
    validate([
        body('driver_id').notEmpty().withMessage('Driver ID is required')
            .isInt().withMessage('Driver ID must be an integer'),
        body('mobil_id').notEmpty().withMessage('Mobil ID is required')
            .isInt().withMessage('Mobil ID must be an integer')
    ]),
    sessionController.startSession
);

/**
 * @route PUT /api/session/:id/end
 * @desc End a driver session (clock out)
 * @access Private (Driver only)
 */
router.put('/:id/end', auth.isDriver, sessionController.endSession);

/**
 * @route GET /api/session/driver/:id
 * @desc Get sessions by driver ID
 * @access Private
 */
router.get('/driver/:id', sessionController.getSessionsByDriverId);

module.exports = router;
