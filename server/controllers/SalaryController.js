const Salary = require('../models/SalaryModel');
const Employee = require('../models/EmployeeModel');

// Create and add new salary data
const addSalary = async (req, res) => {
    try {
        const { name, division, attendance, salaryPerDay } = req.body;

        // Find the employee by ID
        const employee = await Employee.findById(name);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Calculate the total salary
        const totalSalary = attendance * salaryPerDay;

        // Create the salary object
        const newSalary = new Salary({
            name,
            division,
            attendance,
            salaryPerDay
        });

        // Save the salary
        await newSalary.save();

        res.status(201).json({ message: 'Salary added successfully', salary: newSalary, totalSalary });
    } catch (err) {
        res.status(500).json({ message: 'Error adding salary', error: err.message });
    }
};

// Get all salary data
const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('name'); // Populate employee details
        res.status(200).json({ salaries });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching salaries', error: err.message });
    }
};

// Get salary by ID
const getSalaryById = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id).populate('name');
        if (!salary) {
            return res.status(404).json({ message: 'Salary not found' });
        }
        res.status(200).json({ salary });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching salary', error: err.message });
    }
};

// Update salary
const updateSalary = async (req, res) => {
    try {
        const { name, division, attendance, salaryPerDay } = req.body;

        const updatedSalary = await Salary.findByIdAndUpdate(
            req.params.id,
            { name, division, attendance, salaryPerDay },
            { new: true, runValidators: true }
        );

        if (!updatedSalary) {
            return res.status(404).json({ message: 'Salary not found' });
        }

        res.status(200).json({ message: 'Salary updated successfully', updatedSalary });
    } catch (err) {
        res.status(500).json({ message: 'Error updating salary', error: err.message });
    }
};

// Delete salary
const deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndDelete(req.params.id);
        if (!salary) {
            return res.status(404).json({ message: 'Salary not found' });
        }
        res.status(200).json({ message: 'Salary deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting salary', error: err.message });
    }
};

module.exports = {
    addSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary
};
