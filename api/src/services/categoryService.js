
const categoryRepository = require('../repositories/categoryRepository');

const createCategory = async (vendorId,name,description,parentId) => {
    try{
        if(!vendorId) {
            throw new Error('vendor information required');
        }   
        if(!name) {
            throw new Error('category name required');
        }
        return await categoryRepository.createCategory(vendorId,name,description,parentId);
    }catch(error){
        logError('createService->createCategory',error);  
    } 
};

const getCategoriesByVendor = async (vendorId) => {
    try{
        if(!vendorId) {
            throw new Error('vendor information required');
        }
        return await categoryRepository.getCategoriesByVendor(vendorId);
    }catch(error){
        logError('createService->getCategoriesByVendor',error);  
    }
};

const getCategoryById = async (vendorId, categoryId) => {
    try{
        if(!categoryId) {
            throw new Error('category is required');
        }
        if(!vendorId) {
            throw new Error('vendor information required');
        }
        return await categoryRepository.getCategoryById(vendorId, categoryId);
    }catch(error){
        logError('createService->getCategoryById',error);  
    }
};

const deleteCategory = async (vendorId, categoryId) => {
    try{
        if(!categoryId) {
            throw new Error('category is required');
        }
        if(!vendorId) {
            throw new Error('vendor information required');
        }
        return await categoryRepository.deletedCategory(vendorId, categoryId);
    }catch(error){
        logError('createService->deleteCategory',error);  
    }
};

const updateCategory = async (userId, categoryId, updateData) => {
    try{ 
        if(!categoryId) {
             throw new Error('categoryId is required');
         }
         if(!userId) {
             throw new Error('userId is required');
         }
         return await categoryRepository.updateCategory(userId, categoryId, updateData);
    }catch(error){
        logError('createService->updateCategory',error);  
    }
};

module.exports = {
    createCategory,
    getCategoriesByVendor,
    getCategoryById,
    deleteCategory,
    updateCategory,
};