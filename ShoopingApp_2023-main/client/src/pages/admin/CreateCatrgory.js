import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import {Modal} from 'antd'

const CreateCatrgory = () => {
  const [categories, setCategory] = useState([]); // beacuse of multiple value we use array
  const[name,setName] = useState("");
  const[visible,setVisible] = useState(false);
  const[selected,setSelected] = useState(null);
  const[updatedName , setUpdatedName] = useState("")

  // handle submit || create category
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(`no of category${categories.length}`)
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data?.success)
      {
        alert(` category ${name} is created`)
        getAllCategory();

      }
      else{
        alert(data.message)
      }
    } catch (error) {
      // console.log(error);
      alert("something went wrong in submit handle")
      return;
    }
  }
  
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-allcategory`
      );
      if (data?.success) {
        // console.log(`here you can see data ${data}`);
        setCategory(data?.category);
      }
    } catch (error) {
      // console.log(error);
      alert("something went wrong in getting category");
      return;
    }
  };
  // update category
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success)
      {
        alert(` ${updatedName}is updated to `);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
      else{
        alert(data.message);
      }

    } catch (error) {
      alert("something went wrong");
      
    }
  }

  // delete category
  const handledelete = async(pid)=>{
    
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)
      if(data.success)
      {
        alert(` ${name}is deleted to `);
        getAllCategory();
      }
      else{
        alert(data.message);
      }

    } catch (error) {
      alert("something went wrong");
      
    }
  }

  // use effect
  useEffect(() => {
    getAllCategory();
  }, []);

  // update handle update



  // return 
  return (
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1  className="text-center">Manage Category</h1>
            <div className="p-3">
              {/* value={name} setValue={setName}  no significat in the code*/}
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" >Name</th>
                    <th scope="col" >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c=>{
                    return <>
                    <tr >
                    <td key={c._id}>{c.name}</td>
                    <td >
                      <button className="btn btn-primary " onClick={()=>{setVisible(true); setUpdatedName(c.name);
                      setSelected(c)}}>
                        Edit
                      </button>
                    </td>
                    <td >
                      <button className="btn btn-danger ms-4" onClick={()=>handledelete(c._id)} >Delete</button>
                    </td>
                    </tr>
                    </>
                  })}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCatrgory;
