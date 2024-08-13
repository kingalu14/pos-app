const vendorService = require('../services/vendorService');
const {logInfo,logError} = require('../utils/logger');

const createVendor = async (req, res) => {
    try {
        const { userId } = req.user;
        const vendor = await vendorService.createVendor(req.body, userId);
        logInfo('vendorController->createVendor',`Vendor create :${vendor.id} `);
        res.status(201).json(vendor);
    } catch (error) {
        logError('vendorController->createVendor',error);
        res.status(500).json({ message: error.message });
    }
};

const getVendorById = async (req, res) => {
    try {
        const vendorId= req.params.vendorId;
        const { userId } = req.user;
        const vendor = await vendorService.getVendorById(vendorId, userId);
        if (vendor) {
            logInfo('vendorController->getVendorById',`Vendor :${vendor.id} `);
            res.status(200).json(vendor);
        } else {
            logInfo('vendorController->getVendorById',`vendor not found`);
            res.status(404).json({ message: 'vendor not found' });
        }
    } catch (error) {
        logError('vendorController->getVendorById',error);
        res.status(500).json({ message: error.message });
    }
};

const getVendors = async (req, res) => {
    try {
        const { userId } = req.user;
        const vendors = await vendorService.getVendors(userId);
        if (vendors.length === 0) {
            logInfo('vendorController->getVendors',`vendor not found`);
            res.status(404).json({ message: 'No vendors found' });
            return;
        }
        res.status(200).json(vendors);
    } catch (error) {
        logError('vendorController->getVendors',error);
        res.status(500).json({ message: error.message });
    }
};

const updateVendor = async (req, res) => {
    try {
        const { userId } = req.user;
        const vendor = await vendorService.updateVendor(req.params.vendorId, req.body, userId);
        res.status(200).json(vendor);
    } catch (error) {
        logError('vendorController->updateVendor',error);
        res.status(500).json({ message: error.message });
    }
};

const deleteVendor = async (req, res) => {
    try {
        const { userId } = req.user;
        await vendorService.deleteVendor(req.params.vendorId, userId);
        res.status(204).json();
    } catch (error) {
        logError('vendorController->deleteVendor',error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVendor,
    getVendorById,
    getVendors,
    updateVendor,
    deleteVendor,
};
