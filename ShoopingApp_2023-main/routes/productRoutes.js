const express  = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getAllProduct, getSingleProduct, getProductPhoto, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } = require("../controllers/productController");
const formidable  =require("express-formidable");
const router = express.Router();

// POST || create product
router.post("/create-product",requireSignIn,isAdmin,formidable(), createProductController)

// GET || get all product
router.get("/get-product",getAllProduct)

// GET || singleproduct
router.get("/get-product/:slug",getSingleProduct)

// GET || singleproduct Photo
router.get("/product-photo/:pid",getProductPhoto)

// DELETE delete product
router.delete("/delete-product/:id",deleteProductController)

// PUT || update poroduct
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(), updateProductController)

// filter product
router.post("/product-filter" , productFilterController)

// product count
router.get("/product-count",productCountController);

// product per page
router.get('/product-list/:page',productListController)

// search product 
router.get('/search/:keyword',searchProductController)

// similar product
router.get('/related-product/:pid/:cid',relatedProductController)

// category wise product
router.get('/product-category/:slug',productCategoryController)

// payment Route
// token
router.get('/braintree/token',braintreeTokenController)

// payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

module.exports = router;