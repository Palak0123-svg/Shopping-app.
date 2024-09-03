import Layout from "../components/Layout/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

const ProductDetails = () => {
  const navigate = useNavigate();  
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart,setCart] = useCart();
  // initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id)
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-6">
          <img
            
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height={"300px"}
            width={"350px"}
            className="product-detail-img"
          />
        </div>
        <div className="col-md-6 text-center">
            <h1>Product Details</h1>
             <h6>Name : {product.name}</h6>
            <p className="product-detail-description"><b>Description :</b> {product.description}</p>
            <h6>Price : {product.price}</h6>
           
            <h6>Category : {product?.category?.name}</h6>
            <button class="btn btn-primary m-1" onClick={()=>
            {
              setCart([...cart,product])
              localStorage.setItem("cart",JSON.stringify([...cart,product]));
              alert("Item added to cart");
            }}>
              Add to Cart
            </button>
        </div>
      </div>
      <h1 className="text-center">Similar Product</h1>
      <div className="row">
        
        <div className="d-flex flex-wrap m-4 Mypro-container Myflex" id="Myproduct">
            {/* {console.log("products while maping" + products.length)} */}
            {relatedProducts?.map((p) => {
              return (
                <>
                  <div className="card m-2 Mypro" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="Mytext Myflex">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="price">$ {p.price}</p>
                      </div>
                      
                      {/* <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p> */}
                      
                      <div className="Mytext Myflex">
                      <button class="btn btn-primary m-1" onClick={()=>{
                        setCart([...cart,p])
                        localStorage.setItem("cart",JSON.stringify([...cart,p]));
                        alert("Item added to cart");
                      }}>Add to Cart</button>
                      <button
                        class="btn btn-secondary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
