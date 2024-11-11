const express = require('express');
const router = express.Router();
const SalaryController = require('../controllers/SalaryController');


router.post('/', SalaryController.addSalary);
router.get('/', SalaryController.getSalaries);
router.get('/:id', SalaryController.getSalaryById);
router.put('/:id', SalaryController.updateSalary);
router.delete('/:id', SalaryController.deleteSalary);

module.exports = router;
