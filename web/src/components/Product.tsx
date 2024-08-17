import React, { useEffect, useState } from "react";
import productsFetch from "../axios/ProductsFetch";

interface Produto {
    id: number;
    nome: string;
    descrição: string;
    preço: number;
    quantidade: number;
    imagem: string; // ou 'byte[]' se você for tratar imagens como strings codificadas em Base64
}

const Product: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsFetch.get<Produto[]>("/products/all");
                console.log(JSON.stringify(response.data));
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
        </>
    );
};

export default Product;
