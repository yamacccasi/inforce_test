import { useState, useEffect,FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addProduct, deleteProduct, setProducts} from './redux/productSlice';
import Modal from './Modal';

const ProductList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state:any) => state.products.products);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    id: Date.now(),
    name: '',
    description: '',
    count: 0,
    weight: '',
    imageUrl: '',
    comments: [],
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (response.ok) {
        const products = await response.json();

        dispatch(setProducts(products));
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = () => setAddModalOpen(true);

  const confirmAddProduct = async () => {
    if (newProduct.name && newProduct.count) {
      try {
        const response = await fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newProduct.name,
            description: newProduct.description,
            count: newProduct.count,
            weight: newProduct.weight,
            imageUrl: newProduct.imageUrl,
            comments: newProduct.comments,
            size: { height: 0, width: 0 }
          }),
        });

        if (response.ok) {
          const createdProduct = await response.json();
          dispatch(addProduct(createdProduct));
          setAddModalOpen(false);
          setNewProduct({
            id: 0,
            name: '',
            description: '',
            count: 0,
            weight: '',
            imageUrl: '',
            comments: [],
          });
        }
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Oops,error');
      }
    } else {
      alert('Fill up all the fields please.');
    }
  };

  const handleDeleteProduct = (id: number) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (selectedProductId !== null) {
      try {
        console.log('Attempting to delete product with ID:', selectedProductId);
        const response = await fetch(`http://localhost:5000/products/${selectedProductId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          dispatch(deleteProduct(selectedProductId));
          setDeleteModalOpen(false);
        } else {
          console.error('Failed to delete product from server:', response.status);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
      <div className="product-list">
        <h1>Product List</h1>
        <button className="btn-add" onClick={handleAddProduct}>
          Add Product
        </button>
        <ol>
          {products.map((product: any) => (
              <li key={product.id} className="product-item">
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt="There is no image yet"/>
                <p>{product.description}</p>
                <p>Count: {product.count}</p>
                <p>Weight: {product.weight}</p>
                <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </li>
          ))}
        </ol>
        <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
          <h2>Add Product</h2>
          <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
              type="number"
              placeholder="Count"
              value={newProduct.count}
              onChange={(e) => setNewProduct({ ...newProduct, count: +e.target.value })}
          />
          <input
              type="text"
              placeholder="Weight"
              value={newProduct.weight}
              onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
          />
          <button className="btn-confirm" onClick={confirmAddProduct}>
            Confirm
          </button>
        </Modal>
        <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <h2>Are you sure?</h2>
          <button className="btn-confirm" onClick={confirmDeleteProduct}>
            Yes
          </button>
        </Modal>
      </div>
  );
};

export default ProductList;
