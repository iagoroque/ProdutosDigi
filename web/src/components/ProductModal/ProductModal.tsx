import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import s from "./ProductModal.module.scss";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

const ProductModal: React.FC<{
    product: Product | null;
    onClose: () => void;
    onSave: (product: Product) => void;
}> = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState<Product>({
        id: product?.id || 0,
        name: product?.name || "",
        price: product?.price || 0,
        description: product?.description || "",
        quantity: product?.quantity || 0,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name || "",
                price: product.price || 0,
                description: product.description || "",
                quantity: product.quantity || 0,
            });
        }
    }, [product]);

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={!!product}
            onRequestClose={onClose}
            contentLabel="Edit Product"
            className={s.modal}
        >
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Preço:
                    <input
                        type="number"
                        name="price"
                        min={1}
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Descrição:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Quantidade:
                    <input
                        type="number"
                        name="quantity"
                        min={0}
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>
                    Cancelar
                </button>
            </form>
        </Modal>
    );
};

export default ProductModal;
