//import express from 'express'
const express = require('express');
//import registerController from '../controllers/authController.js'
const {registerController,loginController,forgotPasswordController, updateProfileController, getOrderController, getAllOrderController, orderStatusController} = require('../controllers/authController')
const { testController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// routing
//------------- routes.method('path',callback function)


// POST || REGISTER
router.post('/register',registerController)

// POST || Login
router.post("/login",loginController)

//test routes
router.get("/test",requireSignIn,isAdmin ,testController);

// GET || prevent Dashboard
router.get("/user-auth",requireSignIn,(req,res)=>{
    try {
       
        return res.status(200).send({ok:true});
    } catch (error) {
        console.log(error)
    }
    
})

// GET || admin Dashboard
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
// POST || forgot password
router.post("/forgot-password" , forgotPasswordController)

// PUT || update profile 
router.put('/profile',requireSignIn,updateProfileController)

// GET || get orders
router.get('/orders',requireSignIn,getOrderController)

// GET || get orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrderController)

// order status  update
router.put('/order-status',requireSignIn,isAdmin,orderStatusController)
module.exports = router;

