const Employee = require("../models/EmployeeModel")

//Display all employee
const getAllEmployee = async (req, res) => {
    let employees;

    try{
        employees = await Employee.find();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching orders" });
    }

    //If no employee found
    if (!employees || employees.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
    }
    //display all employee
    return res.status(200).json({ employees });
};

//Insert a new employee
const addEmployee = async (req, res) => {
    const {emp_id, name, nic, email, age, division, position, contact_no} = req.body;
  
    let employee;

    try{
        employee = new Employee({emp_id, name, nic, email, age, division, position, contact_no});
        await employee.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add employee" });
    }

    return res.status(201).json({ employee });
}

//Get an employee by ID
const getById = async (req, res) => {
    const id = req.params.id;

    let employee;

    try{
        employee = await Employee.findById(id);
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching employee" });
    }

    //If employee not found
    if(!employee){
        return res.status(404).json({message:"employee not found"});
    }
    return res.status(200).json({ employee });

}

//Update an employee
const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const {emp_id, name, nic, email, age, division, position, contact_no} = req.body;
    
    let employee;

    try{
        employee = await Employee.findById(id);

        // If employee doesn't exist
        if(!employee){
            return res.status(404).json({ message: "Employee not found" });
        }

        employee = await Employee.findByIdAndUpdate(id, {emp_id: emp_id, name: name, nic: nic, email: email, age: age, division: division, position: position, contact_no: contact_no}, {new: true});
        employee = await employee.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update employee" });
    }
    
    return res.status(200).json({ employee });
}

//Delete employee
const deleteEmployee = async (req, res) => {
    const id = req.params.id;

    let employee;

    try {
        employee = await Employee.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while deleting employee" });
    }

    //If employee not found for deletion
    if(!employee){
        return res.status(404).json({ message: "Employee not delete" });
    }
    return res.status(200).json({ message: "Employee deleted successfully", employee });
}

module.exports = {
    getAllEmployee,
    addEmployee,
    getById,
    updateEmployee,
    deleteEmployee,
}