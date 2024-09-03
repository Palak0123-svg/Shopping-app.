import { useState,useEffect
 } from "react";
 import axios from "axios";

export default function useCategory()
{
    const[categories,setCategories] = useState([]);

    // get category
    const  getCategory = async(req,res)=>{
        try {
            const {data} = await axios
            .get(`${process.env.REACT_APP_API}/api/v1/category/get-allcategory`);
            setCategories(data?.category);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getCategory();
    },[])
    return categories;
}

