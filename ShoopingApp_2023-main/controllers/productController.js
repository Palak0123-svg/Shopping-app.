const  slugify  = require("slugify");
const productModel = require("../models/productModel.js");
const categoryModel = require("../models/categoryModel.js")
const orderModel  = require("../models/orderModel.js")
const fs = require("fs");
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:  process.env.BRAINTREE_MERCHANT_ID,
  publicKey:   process.env.BRAINTREE_PUBLIC_KEY,
  privateKey:  process.env.BRAINTREE_PRIVATE_KEY,
});

exports.createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    // vailidation
    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          error: "name is required",
        })
      case !description:
        return res.status(500).send({
          success: false,
          error: "description is required",
        })
      case !price:
        return res.status(500).send({
          success: false,
          error: "price is required",
        })
      case !category:
        return res.status(500).send({
          success: false,
          error: "category is required",
        })
      case !quantity:
        return res.status(500).send({
          success: false,
          error: "quantity is required",
        })
      case photo && photo.size>1000000:
        return res.status(500).send({
            success: false,
            error: "photo is required and size is less than 1Mb",
         })
    }

    const product = new productModel({...req.fields , slug:slugify(name)})
    if(photo)
    {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "product created succssefully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while creating product",
      error,
    });
  }
};


// GET || get All Product

exports.getAllProduct = async(req,res)=>{
  try {
    const product = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
    return res.status(201).send({
      success: true,
      totalProduct:product.length,
      message: " get all product succssefully!!",
      product,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error getting all product",
      error,
    });
    
  }
}

//GET || get Single Product
exports.getSingleProduct = async(req,res)=>{
  try {
    const{slug} = req.params;
    const product = await productModel.findOne({slug}).select("-photo").populate("category");
    return res.status(201).send({
      success: true,
      message: " get single product succssefully!!",
      product,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error getting single product",
      error,
    });
  }
}

// GET || poduct photo
exports.getProductPhoto = async(req,res)=>{
  try {
    const {pid} = req.params;
    const product = await productModel.findById(pid).select("photo");
    if(product.photo.data)
    {
      res.set("Content-type",product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error   product photo",
      error,
    });
  }
}

// DELETE   delete Product Controller

exports.deleteProductController = async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await productModel.findByIdAndDelete(id);
    return res.status(201).send({
      success: true,
      message: "product deleted succssefully!!",
      product,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while deleteing product ",
      error,
    });
  }
}


// update produtct
exports.updateProductController  = async (req,res)=>{
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    // vailidation
    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          error: "name is required",
        })
      case !description:
        return res.status(500).send({
          success: false,
          error: "description is required",
        })
      case !price:
        return res.status(500).send({
          success: false,
          error: "price is required",
        })
      case !category:
        return res.status(500).send({
          success: false,
          error: "category is required",
        })
      case !quantity:
        return res.status(500).send({
          success: false,
          error: "quantity is required",
        })
      case photo && photo.size>1000000:
        return res.status(500).send({
            success: false,
            error: "photo is required and size is less than 1Mb",
         })
    }

    const product =  await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});

    if(photo)
    {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "product updated succssefully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while updating product",
      error,
    });
  }
};

//product Filter Controller

exports.productFilterController = async(req,res)=>{
  try {
    const{checked , radio} = req.body;
    let args = {};
    if(checked.length>0)
    {
      args.category = checked;
    }
    if(radio.length)
    {
      args.price = {$gte:radio[0] , $lte:radio[1]};
    }
    const products = await productModel.find(args);
    return res.status(200).send({
      success:true,
      totalProduct:products.length,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error while Filltering product",
      error
    })
  }
}

//product Count Controller

exports.productCountController = async(req,res)=>{
  try {
    const totalProduct = await productModel.find({}).estimatedDocumentCount();
    return res.status(200).send({
      success:true,
      totalProduct,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
    message:"error while counting total product",
    error
    })
    
  }
}

//product List Controller
exports.productListController = async(req,res)=>{
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1
    const products = await productModel
    .find({})
    .select("-photo")
    .skip((page-1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1});
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error in per page",
      error
    })
  }
}

// search Product Controller
exports.searchProductController = async(req,res)=>{
  try {
    const {keyword} = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error in seaching product",
      error
    })
  }
} 

exports.relatedProductController = async(req,res)=>{
  try {
    const{pid,cid} = req.params;
    const products = await productModel.find({
      category:cid,
      _id:{$ne:pid}
    }).select("-photo").limit(3).populate("category");
    return res.status(200).send({
      success:true,
      message:"get related product",
      products
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error in getting related product",
      error
    })
  }
}

//product Category Controller
exports.productCategoryController = async(req,res)=>{
  try {
    const {slug} = req.params
    const category = await categoryModel.findOne({slug})
    const products = await productModel.find({category}).populate('category');
    return res.status(200).send({
      success:true,
      category,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error in product Category Controller ",
      error
    })
  }
}

// payment gateway
// token
exports.braintreeTokenController = async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err)
      {
        res.status(500).send(err);
      }
      else
      {
        res.send(response);
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error in braintree Token Controller",
      error
    })
  }
}

// payment
exports.braintreePaymentController = async(req,res)=>{
  try {
    const{cart,nonce} = req.body
    //const{cart} = req.body
    let total = 0;
    cart.map((item)=>{
      total=total+item.price
    });
    let newTranscation = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function(error,result)
    {
      if(result)
      {
        const order = new orderModel({
          products:cart,
          payment:result,
          buyer:req.user._id
        }).save()
        res.json({ok:true})
      }
      else{
        res.status(500).send(error)
      }
    }
    
    )
   
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"error in braintree payment Controller",
      error
    })
  }
}