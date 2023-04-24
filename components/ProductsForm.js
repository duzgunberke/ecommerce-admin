import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm(
    {   _id,
        title: existingTitle,
        description: existingDescription, 
        price: existingPrice,
        images: existingImages
    }){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data ={
            title,
            description,
            price,
            images
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

    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file',file);
            }
            const res = await axios.post('/api/upload',data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
       }
    }

    function updateImagesOrder(images){
        setImages(images);
    }

    return(
        
            <form onSubmit={saveProduct}>
                {/* Product Name */}
                <label>Product Name</label>
                <input 
                    type="text" 
                    placeholder="Product Name"
                    value={title} 
                    onChange={event => setTitle(event.target.value)} />

                {/* Product Images */}
                <label>Product Photos</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable 
                        list={images} 
                        setList={updateImagesOrder}
                        className="flex flex-wrap gap-1">
                        {!!images?.length > 0 && images.map(link =>(
                            <div key={link}  className="h-24 bg-white p-4 shadow-sm rounded-lg border border-gray-200">
                                <img src={link} className="rounded-lg" />
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24  p-1 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer gap-1 bg-gray-200 rounded-lg text-gray-500 text-center text-sm flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={uploadImages}
                            />
                    </label>
                </div>

                {/* Product Description */}
                <label>Product Description</label>
                <textarea 
                    placeholder="Product Description" 
                    value={description} 
                    onChange={event => setDescription(event.target.value)} />                      

                {/* Product Price */}
                <label>Product Price</label>
                <input 
                    type="number" 
                    placeholder="Product Price"      
                    value={price} 
                    onChange={event => setPrice(event.target.value)} /> 

                <button type="submit" className="btn-primary">Save Product</button>
            </form>
    )
}