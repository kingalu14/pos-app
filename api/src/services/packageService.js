const packagesRepository = require('../repositories/PackagesRepository');

const createPackage = async (data) => {
    return await packagesRepository.create(data);
};

const updatePackage = async (id, data) => {
    const pkg = await getPackageById(id);
    if (pkg) {
        return packagesRepository.update(id, data);
    }
        
};

const getPackages = async () => {
    return await packagesRepository.findAll();
};

const getPackageById = async (id) => {
    if (id === undefined || id === null || id === '') throw new Error('Package not found');
        return await packagesRepository.findFirst(id);
};

const softDeletePackage = async (id) => {
    const pkg = await getPackageById(id);
    if (pkg)
       return await packagesRepository.softDeletePackage(id);
};


module.exports = {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    softDeletePackage
};
