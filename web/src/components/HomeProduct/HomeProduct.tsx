import React, { useEffect, useState } from "react";
import productsFetch from "../../axios/ProductsFetch";
import s from "./HomeProduct.module.scss";
import ProductModal from "../ProductModal/ProductModal";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image: string;
}

const HomeProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    useEffect(() => {
        productsFetch.get<Product[]>("/products/all").then((response) => {
            setProducts(response.data);
        });
    }, []);

    function deleteById(id: number) {
        if (window.confirm("Deseja realmente excluir este produto?")) {
            productsFetch.delete(`/products/delete/${id}`).then(() => {
                setProducts(products.filter((product) => product.id !== id));
            });
            window.alert("Produto excluído com sucesso!");
        }
    }

    const openModal = (product: Product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };
    
    const saveProduct = (updatedProduct: Product) => {
        productsFetch
            .put(`/products/update/${updatedProduct.id}`, updatedProduct)
            .then(() => {
                setProducts(
                    products.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    )
                );
                closeModal();
            });
    };

    return (
        <div className={s.gridContainer}>
            {products.map((product) => (
                <div key={product.id} className={s.productCard}>
                    <img
                        src={
                            product.image
                                ? `data:image/jpeg;base64,${product.image}`
                                : "src/assets/image.jpeg"
                        }
                        alt=""
                    />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h5>Preço - R$ {product.price}</h5>
                    <h6>Quantidade: {product.quantity}</h6>
                    <div>
                        <button onClick={() => deleteById(product.id)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </button>
                        <button onClick={() => openModal(product)}>
                            <i className="ri-edit-2-line"></i>
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && currentProduct && (
                <ProductModal product={currentProduct} onClose={closeModal} onSave={saveProduct} />
            )}
        </div>
    );
};

export default HomeProduct;
