//import userModel from '../models/userModel'
const userModel = require('../models/userModel')
//import bcrypt from 'bcrypt'
const bcrypt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');
const router = require('../routes/authRoutes');
const orderModel = require('../models/orderModel');

 exports.registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address,answer} = req.body;
        if(!name || !email ||!password || !phone || !address || !answer)
        {
            return res.status(400).send({
                success:false,
                message:"please enter all the fileds!!"
            })
        }
        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:"user is existing alreday"
            })
        }

        //hashed password
        const hashedPassword = await bcrypt.hash(password,6); 
        // pasword:123
        // hashpassward:3403-490

        // save new user
        const user = new userModel({name,phone,address,email,password:hashedPassword,answer})
        await user.save();
        return res.status(201).send({
            success:true,
            message:"use user created",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in register callstack',
            error
        })
    }

} 

// login controller

exports.loginController = async(req,res)=>{
    try {
        const{email,password} = req.body;
        
        if(!email || !password)
        {
            return res.status(201).send({
                success:false,
                message:"please fill all feilds"
            })
        }

        // exisiting user
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(201).send({
                success:false,
                message:"please register yourself"
            })
        }
        //password maching
        // password:123
        //user.password = hashpassward:3403-490
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(201).send({
                success:false,
                message:"Ivalaid password or email"
            })
        }
        // token :- server dega
        const token = await jsonwebtoken.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn: "7d"})

        return res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in login callback",
            error
        })
    }
};

 // forgot password controller

 exports.forgotPasswordController = async (req,res)=>{
    try {
        const { email, answer, newPassword } = req.body;
        if (!email || !answer ||!newPassword) {
          res.status(400).send({ success:false,message: "fill all fileds" });
        }
        
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
          });
        }
        const hashedPassword = await bcrypt.hash(newPassword,6); 
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).send({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
 }

exports.testController = (req, res) => {
    res.send('Protected route accessed successfully');
  };


// update Profile Controller
exports.updateProfileController = async(req,res)=>{
    try {
        const {name,email,password,address,phone} = req.body
        const user = await userModel.findById(req.user._id);
        // password
        if(password && password.lenght<6)
        {
            return res.json({error:'Password is require and 6 chacter long'});
        }
        const hasshedpassword = password? await bcrypt.hash(password,6) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name||user.name,
            password:hasshedpassword || user.password,
            phone:phone || user.phone,
            address:address||user.address},{new:true})
        return res.status(200).send({
            success:true,
            message:"updated successfully",
            updatedUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:true,
            message:"error in update Profile Controller",
            error
        })
    }
}

// get Order Controller
exports.getOrderController = async(req,res)=>{
    try {
       const order = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name") 
       res.json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get Order Controller",
            error
        })
    }
}
 
// get  ALL Order Controller
exports.getAllOrderController = async(req,res)=>{
    try {
       const order = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"})
       res.json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get Order Controller",
            error
        })
    }
}
 
// order Status Controller
exports.orderStatusController=async(req,res)=>{
    try {
        const {orderId} = req.params;
        const{status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in order Status Controller",
            error
        })
    }
}