import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Select } from "antd";
import { Form, useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const[categories,setCategories] = useState([])
  const[photo,setPhoto] = useState("");
  const[name,setName] = useState("");
  const[description,setDescription] = useState("");
  const[price,setPrice] = useState("");
  const[category,setCategory] = useState("");
  const[quantity,setQuantity] = useState("");
  const[shipping,setShipping] = useState("");

  //get all category (copy from create category page)
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-allcategory`
      );
      if (data?.success) {
        // console.log(`here you can see data ${data}`);
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong in getting category");
    }
  };

  // use effect
  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo)
      productData.append("category",category)
      const{data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData)
      if(data?.success)
      {
        alert("product created successfully");
       
      }
      else
      {
        alert(data?.message)
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }

  }

  return (
    <Layout title={"Dashboard-Create product"}>
      <div className="container-fluid m-3 p-3 ">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>Create Product</h1>
          <div className="m-1 w-75">
            <Select 
            
            placeholder="select a category"
            size='large'
            showSearch
            className='form-select mb-3'
            onChange={(value)=>{setCategory(value)}}
            >
              {
                categories?.map(c =>{
                  return<Option key={c._id} value={c._id}>{c.name}</Option>
                })
              }
            </Select>
            <div className="mb-3">
              <label 
              className='btn btn-outline-secondary col-md-12'
              >
              {photo ? photo.name:"upload Photo"}
              <input 
              type="file" 
              name='photo' 
              accept='image/*' 
              onChange={(e) =>setPhoto(e.target.files[0])} 
              hidden />

              </label>

            </div>
            <div className="mb-3">
              {photo && (<div className='text-center'>
                <img src={URL.createObjectURL(photo)} alt="product-photo"
                height={"200px"}
                className='img img-responsive'  />
              </div>)}
            </div>
            <div className="mb-3">
              <input type="text" 
               value={name}
               placeholder='write a name'
               className='form-control'
               onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea type="text" 
               value={description}
               placeholder='write description'
               className='form-control'
               onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input type="number" 
               value={price}
               placeholder='price'
               className='form-control'
               onChange={(e)=>setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input type="number" 
               value={quantity}
               placeholder='Quantity'
               className='form-control'
               onChange={(e)=>setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select 
              // bordered={false}
              placeholder="select shipping"
              size='larger'
              showSearch
              className='form-select mb-3'
              onChange={(value)=>{setShipping(value)}}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
            </div>
          </div>
        </div>
       </div>
      </div>
      
    </Layout>
  )
}

export default CreateProduct