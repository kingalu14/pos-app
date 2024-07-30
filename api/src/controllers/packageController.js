const packageService = require('../services/packageService');

const createPackage = async (req, res) => {
    try {
        console.log(req.body);
        const pkg = await packageService.createPackage(req.body);
        res.status(201).json(pkg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPackages = async (req, res) => {
    try {
        const packages = await packageService.getPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPackageById = async (req, res) => {
    try {
        const pkg = await packageService.getPackageById(req.params.id);
        if (pkg) {
            res.status(200).json(pkg);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePackage= async (req, res) => {
    try {
        const pkg = await packageService.getPackageById(req.params.id);
        if (pkg) {
            const deletedPkg = await packageService.softDeletePackage(req.params.id);        
            res.status(200).json(deletedPkg);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updatePackage = async (req, res) => {
    try {
        const pkg = await packageService.getPackageById(req.params.id);
        if (pkg) {
           const updatedPackage = await packageService.updatePackage(req.params.id, req.body);
            res.status(200).json(updatedPackage);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage
};
