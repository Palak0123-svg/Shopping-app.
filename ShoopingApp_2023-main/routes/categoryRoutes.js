const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createCategoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, delteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

// routes

// POST ||  create category
router.post("/create-category" , requireSignIn , isAdmin , createCategoryController)

// PUT || update category
router.put("/update-category/:id" , requireSignIn,isAdmin,updateCategoryController)

// GET || get all category
router.get("/get-allcategory",getAllCategoryController)

// GET || single category
router.get("/single-category/:slug" , getSingleCategoryController)

// DELETE || delete category
router.delete("/delete-category/:id" , requireSignIn , isAdmin , delteCategoryController)

module.exports = router;

