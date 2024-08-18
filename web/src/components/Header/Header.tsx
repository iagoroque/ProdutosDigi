import React, { useState } from "react";
import productsFetch from "../../axios/ProductsFetch";
import Modal from "react-modal";
import s from "./Header.module.scss";
import m from "../ProductModal/ProductModal.module.scss";

const Header: React.FC = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const createProduct = async () => {
        const product = {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
        };

        try {
            await productsFetch.post("/products/create", product);
            window.alert("Produto adicionado com sucesso!");
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setName("");
        setPrice(0);
        setDescription("");
        setQuantity(0);
    };

    return (
        <header className={s.header}>
            <h1>PRODUTOS DIGI</h1>
            <button onClick={openModal}>Adicionar Produto +</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Adicionar Produto"
                className={m.modal}
                overlayClassName={m.overlay}
            >
                <h2>Adicionar Novo Produto</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createProduct();
                    }}
                >
                    <label htmlFor="name">
                        Nome:
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="price">
                        Preço:
                        <input
                            id="price"
                            type="number"
                            min={1}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label htmlFor="description">
                        Descrição:
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="quantity">
                        Quantidade:
                        <input
                            id="quantity"
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            required
                        />
                    </label>
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={closeModal}>
                        Fechar
                    </button>
                </form>
            </Modal>
        </header>
    );
};

export default Header;
