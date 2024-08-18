import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import s from "./ProductModal.module.scss";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image: string;
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
        image: removePrefix(product?.image) || "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name || "",
                price: product.price || 0,
                description: product.description || "",
                quantity: product.quantity || 0,
                image: removePrefix(product.image) || "",
            });
        }
    }, [product]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === "image" && files && files[0]) {
            const base64 = await convertToBase64(files[0]);
            setFormData({ ...formData, [name]: base64 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    function removePrefix(base64Image: string | null | undefined): string {
        if (base64Image == null) {
            return ''; 
        }
    
        const regex = /^image\/[^;]+;base64,/;
        return base64Image.replace(regex, '');
    }

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
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Imagem:
                    <input type="file" name="image" onChange={handleChange} />
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
