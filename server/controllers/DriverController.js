const driver = require("../models/DriverModel");

const getAllDrivers = async(req,res,next) =>{

    let Drivers;

    try{
        Drivers = await driver.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!Drivers){
       return res.status(404).json({message: "Driver not found"});
    }
    //display
    return res.status(200).json({Drivers});
};

//data insert
const addDriver = async (req, res, next) => {
    const {DID, name, licenseNumber, phoneNumber, isAvailable} = req.body;

    let drivers;
     try{
        drivers = new driver ({DID, name, licenseNumber, phoneNumber, isAvailable});
        await drivers.save();
     }catch(err){
        console.log(err);
     }
     //not insert
     if(!drivers){
        return res.status(404).send({message:"unable to add drivers"});
     }
     return res.status(200).json({driver: drivers});
};

const getAvailableDrivers = async (req, res) => {
    try {
        const availableDrivers = await driver.find({ isAvailable: true });
        return res.status(200).json({ drivers: availableDrivers });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server error while retrieving drivers" });
    }
};

const getDriverById = async (req, res) => {
    try {
        const driver = await driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching driver', error });
    }
};





exports.getAllDrivers = getAllDrivers;
exports.addDriver = addDriver;
exports.getAvailableDrivers = getAvailableDrivers;
exports.getDriverById = getDriverById;
