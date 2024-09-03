import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  // get all product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data?.product);
    } catch (error) {
      // console.log(error);
      alert("somethig went wrong in get all product");
      return;
    }
  };
  // life cycle
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3 ">
            <AdminMenu  />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap ">
            {products?.map((p) => {
              return (
                
                <>
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
                <div className="card m-2" style={{ width: "18rem" }} >
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description}
                      </p>
                      
                    </div>
                  </div>
                </Link>
                  
                </>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
