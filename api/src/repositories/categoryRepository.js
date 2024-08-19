const prisma = require('../config/prisma');

const createCategory = async (vendorId,name,description,parentId) => {
    const category = await prisma.category.create({
        data: {
            name,
            description,
            vendorId,
            parentId,
            deletedAt: null
        },
    });
    return category;
};

//a function to get a single category for specific userId  
const getCategoriesByVendor = async (vendorId) => {
    const categories = await prisma.category.findMany({
        where: {
            vendorId,
            deletedAt: null
        },
        include: {
            Subcategories: true,
            Product: true
        }
    });
    return categories;
};

const getCategoryById = async (vendorId, categoryId) => {
    const categories = await prisma.category.findFirst({
        where: {
            vendorId,
            id:categoryId,
            deletedAt: null
        },
        include: {
            Subcategories: true,
            Product: true
        }
    });
    return categories;
};

const deleteCategory = async (vendorId, categoryId) => {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
            vendorId,
            deletedAt: null
        }
    });

    if (!category) {
        throw new Error('Category not found or you do not have permission to delete this category');
    }

    const deletedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: { deletedAt: new Date() }
    });

    return deletedCategory;
};

const updateCategory = async (userId, categoryId, updateData) => {
   const userVendor = await prisma.userVendor.findFirst({
       where: { userId }
   });
   if (!userVendor) {
       return res.status(403).json({ message: 'You do not belong to any Vendor' });
   }
   const category = await prisma.category.findFirst({
       where: {
           id: categoryId,
           vendorId: userVendor.vendorId,
           deletedAt: null
       }
   });
   if (!category) {
       throw new Error('Category not found or you do not have permission to update this category');
   }
   const updatedCategory = await prisma.category.update({
       where: { id: categoryId },
       data: { ...updateData, updatedAt: new Date() }
   });
  
    return updatedCategory;
};

module.exports = {
    createCategory,
    getCategoriesByVendor,
    getCategoryById,
    deleteCategory,
    updateCategory,
};