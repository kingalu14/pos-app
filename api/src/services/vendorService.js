const prisma = require('../config/prisma');
const vendorRepository = require('../repositories/vendorRepository');
const userVendorRepository = require('../repositories/userVendorRepository');

const createVendor =  async (data, userId) => {
    return await prisma.$transaction(async (transaction) => {
        return vendorRepository.createVendorAndUserVendor(data, userId,transaction);
    });
}

const getVendorById = async (vendorId, userId) => {
    const vendor = await vendorRepository.findById(vendorId);
    if (!vendor) {
        return res.status(404).json({ message: 'vendor not found' });
    }

    const userVendor = await userVendorRepository.findVendorByUserAndVendorId(userId, vendorId);

    if (!userVendor) {
        throw new Error('User does not belong to this Vendor');
    }
    return vendor;
};

const getVendors = async (userId) => {
    const activeVendors = await vendorRepository.findVendorsByUserId(userId);
    console.log(activeVendors);
    return activeVendors;
};

const updateVendor = async (vendorId, data, userId) => {
    const userVendor = await userVendorRepository.findFirst(userId,vendorId);
    if (!userVendor) {
        throw new Error('User does not belong to this Vendor');
    }
    return vendorRepository.update(vendorId, data);
};

const deleteVendor = async (vendorId, userId) => {
    const userVendor = await userVendorRepository.findFirst(userId, vendorId);
    if (!userVendor) {
        throw new Error('User does not belong to this Vendor');
    }
    return await prisma.$transaction(async (transaction) => {
        return vendorRepository.softDeleteVendor(vendorId, transaction);
    });

};

module.exports = {
    createVendor,
    getVendorById,
    getVendors,
    updateVendor,
    deleteVendor,
};