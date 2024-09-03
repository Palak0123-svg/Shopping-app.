import Layout from '../components/Layout/Layout';
import React from 'react'
import { useSearch } from '../context/search'
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
const Search = () => {
  const navigate = useNavigate();
    const[values,setValues] = useSearch();
    const [cart,setCart] = useCart();
  return (
    <Layout title={'Search results'}>
        <div className="cantainer">
            <div className="text-center">
                <h1>Search Result</h1>
                <h6>{values?.results.length<1 ? 'no product is found' : `Found ${values?.results.length}`}</h6>
            </div>
            <div className="d-flex flex-wrap mt-4 Mypro-container Myflex " id="Myproduct">
            {/* {console.log("products while maping" + products.length)} */}
            {values?. results.map((p) => {
              return (
                <>
                  <div className="card m-2 Mypro" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="Mytext Myflex">
                        <h5 className="card-title">{p.name}</h5>
                       <p>{p.price}</p>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p>
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
  )
}

export default Search