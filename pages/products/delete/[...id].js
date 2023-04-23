import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function DeleteProductPage(){
    const router = useRouter();

    function goBack(){
        router.push('/products');
    }
    
    return(
        <Layout>
            Do you really wanna delete product X ?
            <button>YES</button>
            <button onClick={goBack}>NO</button>
        </Layout>
    )
}