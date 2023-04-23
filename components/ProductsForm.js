import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm(
    {   _id,
        title: existingTitle,
        description: existingDescription, 
        price: existingPrice,
    }){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data ={
            title,
            description,
            price
        }
        if(_id){
            // Update Product
            await axios.put('/api/products',{...data,_id});
        }
        else{
            // Create Product
            await axios.post('/api/products',data);
        }
        setGoToProducts(true);
    }

    if(goToProducts){
     router.push('/products');
    }
    return(
        
            <form onSubmit={createProduct}>
                <label>Product Name</label>
                <input 
                    type="text" 
                    placeholder="Product Name"
                    value={title} 
                    onChange={event => setTitle(event.target.value)} />


                <label>Product Description</label>
                <textarea 
                    placeholder="Product Description" 
                    value={description} 
                    onChange={event => setDescription(event.target.value)} />                      


                <label>Product Price</label>
                <input 
                    type="number" 
                    placeholder="Product Price"      
                    value={price} 
                    onChange={event => setPrice(event.target.value)} /> 

                <button type="submit" className="btn-primary">Add Product</button>
            </form>
    )
}