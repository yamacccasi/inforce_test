// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {IProduct} from "./interfaces/interfaces.ts";
//
//
// const ProductView = () => {
//     const { productId } = useParams<{ productId: string }>();
//     const [product, setProduct] = useState<IProduct | null>(null);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/products/${productId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProduct(data);
//                 } else {
//                     console.error('Product not found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         };
//
//         if (productId) {
//             fetchProduct();
//         }
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div>
//             <h1>{product.name}</h1>
//             <p>{product.description}</p>
//             <img src={product.imageUrl} alt={product.name} />
//             <p>Count: {product.count}</p>
//             <p>Weight: {product.weight}</p>
//             <h3>Comments</h3>
//             <ul>
//                 {product.comments.map((comment, index) => (
//                     <li key={index}>{comment}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
// export default ProductView;
