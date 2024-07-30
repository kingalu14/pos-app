const prisma = require('../config/prisma');

const createCategory = async (companyId,name,description,parentId) => {
    const category = await prisma.category.create({
        data: {
            name,
            description,
            companyId,
            parentId,
            deletedAt: null
        },
    });
    return category;
};

//a function to get a single category for specific userId  
const getCategoriesByCompany = async (companyId) => {
    const categories = await prisma.category.findMany({
        where: {
            companyId,
            deletedAt: null
        },
        include: {
            Subcategories: true,
            Product: true
        }
    });
    return categories;
};

const getCategoryById = async (companyId, categoryId) => {
    const categories = await prisma.category.findFirst({
        where: {
            companyId,
            categoryId,
            deletedAt: null
        },
        include: {
            Subcategories: true,
            Product: true
        }
    });
    return categories;
};

const deleteCategory = async (companyId, categoryId) => {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
            companyId,
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

   if(!categoryId) {
        throw new Error('categoryId is required');
    }

    if(!userId) {
        throw new Error('userId is required');
    }
   const userCompany = await prisma.userCompany.findFirst({
       where: { userId }
   });
  
   if (!userCompany) {
       return res.status(403).json({ message: 'You do not belong to any company' });
   }
  
   const category = await prisma.category.findFirst({
       where: {
           id: categoryId,
           companyId: userCompany.companyId,
           deletedAt: null
       }
   });
    console.log(category);
  
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
    getCategoriesByCompany,
    getCategoryById,
    deleteCategory,
    updateCategory,
};