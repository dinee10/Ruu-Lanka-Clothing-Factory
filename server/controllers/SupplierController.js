const Supplier = require("../models/SupplierModel");


//Display all suppliers
const getAllSuppliers = async (req, res) => {
    let suppliers;

    try{
        suppliers = await Supplier.find();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching suppliers" });
    }

    //If no suppliers found
    if (!suppliers || suppliers.length === 0) {
        return res.status(404).json({ message: "Supplier not found" });
    }
    //display all suppliers
    return res.status(200).json({ suppliers });
};

//Insert a new supplier
const addSupplier = async (req, res) => {
    const {supplier_id, name, email, item, contact_no} = req.body;
  
    let supplier;

    try{
        supplier = new Supplier({supplier_id, name, email, item, contact_no});
        await supplier.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add supplier" });
    }

    return res.status(201).json({ supplier });
}

//Get an supplier by ID
const getById = async (req, res) => {
    const id = req.params.id;

    let supplier;

    try{
        supplier = await Supplier.findById(id);
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching supplier" });
    }

    //If supplier not found
    if(!supplier){
        return res.status(404).json({message:"Supplier not found"});
    }
    return res.status(200).json({ supplier });

}

//Update an supplier
const updateSupplier = async (req, res) => {
    const id = req.params.id;
    const {supplier_id, name, email, item, contact_no} = req.body;
    
    let supplier;

    try{
        supplier = await Supplier.findById(id);

        // If supplier doesn't exist
        if(!supplier){
            return res.status(404).json({ message: "Supplier not found" });
        }

        supplier = await Supplier.findByIdAndUpdate(id, {supplier_id: supplier_id, name: name, email: email, item: item, contact_no: contact_no}, {new: true});
        supplier = await supplier.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update supplier" });
    }
    
    return res.status(200).json({ supplier });
}

//Delete an supplier
const deleteSupplier = async (req, res) => {
    const id = req.params.id;

    let supplier;

    try {
        supplier = await Supplier.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while deleting supplier" });
    }

    //If supplier not found for deletion
    if(!supplier){
        return res.status(404).json({ message: "Supplier not delete" });
    }
    return res.status(200).json({ message: "Supplier deleted successfully", supplier });
}

module.exports = {
    getAllSuppliers,
    addSupplier,
    getById,
    updateSupplier,
    deleteSupplier,
};