import React, { useEffect, useState } from "react";
import productsFetch from "../axios/ProductsFetch";
import s from "./HomeProduct.module.scss";

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
                    <p>Preço - R$ {product.price.toFixed(2)}</p>
                    <p>Quantidade: {product.quantity}</p>
                    <div>
                        <button onClick={() => deleteById(product.id)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </button>
                        <button>
                            <i className="ri-edit-2-line"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeProduct;
