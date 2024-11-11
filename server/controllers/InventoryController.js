const Inventory = require('../models/InventoryModel');
const Supplier = require('../models/SupplierModel');


// Get all inventory items
exports.getAllInventory = async (req, res) => {
    try {
        const inventories = await Inventory.find().populate('supplier_id');
        res.status(200).json({inventories});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory", error });
    }
};

// Add a new inventory item
exports.createInventory = async (req, res) => {
    const { order_id, material, qty, supplier_id } = req.body;

    try {
        // Check if the supplier exists
        const supplier = await Supplier.findById(supplier_id);
        if (!supplier) {
            return res.status(400).json({ message: "Supplier not found" });
        }

        const newInventory = new Inventory({
            order_id,
            material,
            qty,
            supplier_id
        });

        await newInventory.save();
        res.status(201).json(newInventory);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({ message: "Error creating inventory", error });
    }
};

// Get single inventory item by ID
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id).populate('supplier_id');
        if (!inventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({inventory});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory item", error });
    }
};

// Update an existing inventory item
exports.updateInventory = async (req, res) => {
    const { order_id, material, qty, supplier_id } = req.body;
    
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
            req.params.id,
            { order_id, material, qty, supplier_id },
            { new: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ message: "Error updating inventory", error });
    }
};

// Delete an inventory item
exports.deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({ message: "Inventory item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting inventory", error });
    }
};
