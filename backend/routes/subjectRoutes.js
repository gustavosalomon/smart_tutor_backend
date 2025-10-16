const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// GET todas las materias
router.get('/', subjectController.getSubjects);

// POST crear materia
router.post('/', subjectController.createSubject);

module.exports = router;
