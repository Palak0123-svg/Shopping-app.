const categoryModel = require("../models/categoryModel.js");

const slugify = require("slugify");
const router = require("../routes/categoryRoutes.js");
// POST || create category

exports.createCategoryController = async(req,res)=>{
    try {
        const{name} = req.body;
        if(!name)
        {
            return res.status(401).send({
                success:false,
                message:"name is require"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        
        if(existingCategory)
        {
            return res.status(200).send({
                success:true,
                message:"category is allready existed"
            })
        }

        const category = new categoryModel({name, slug:slugify(name)});
        await category.save();

        return res.status(201).send({
            success:true,
            message:" new category created successfully!!",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while creating category",
            error
        })
    }
}

//PUT || update cotegory controller

exports.updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});

        return res.status(201).send({
            success:true,
            message:"update category succssefully!!",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while updating category",
            error
        })
        
    }
}

// GET || get All Category Controller

exports.getAllCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        
        return res.status(201).send({
            success:true,
            message:"get all category succssefully!!",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while getting all category",
            error
        })
        
    }
}

// GET || single category

exports.getSingleCategoryController = async(req,res) => {
    try {
        const {slug} = req.params;
    
        //const category = await categoryModel.findOne({ slug: req.params.slug });
        const category = await categoryModel.findOne({slug});//chages done by me
        return res.status(201).send({
            success:true,
            message:"get single category succssefully!!",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while getting single category",
            error
        })
    }
}

// DELETE category controller
exports.delteCategoryController = async(req,res)=>{
    try {

        const{id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        return res.status(201).send({
            success:true,
            message:"deleted single category succssefully!!",
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while deleting  category",
            error
        })
    }
}