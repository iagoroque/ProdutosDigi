import React, { useState, useEffect } from "react";
import productsFetch from "../axios/ProductsFetch";
import "./Home.css";

const Home = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productsFetch.get(
                    `http://localhost:8080/marketplace/products/all`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Erro ao buscar os produtos", error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {/* Header */}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Produtos Digi</h1>
                        <p className="lead fw-normal text-white-50 mb-0">
                            Página Web para Cadastro de Produtos
                        </p>
                    </div>
                </div>
                <button className="btn btn-outline-dark" type="submit" style={{ position: 'absolute', right: '3%' }}>
                    Adicionar Produto +
                </button>
            </header>

            {/* Section */}
            <main class="container">
                <section class="py-5">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
                            {product.map((product, index) => (
                                <article class="col mb-5" key={index}>
                                    <figure class="card h-100">
                                        <img
                                            class="card-img-top rounded-lg"
                                            src={`data:image/jpeg;base64,${product.image}`}
                                            alt={product.name}
                                        />
                                        <figcaption class="card-body p-4 text-center">
                                            <h5 class="fw-bolder">
                                                {product.name}
                                            </h5>
                                            <p>{product.description}</p>
                                            <h6>R$ {product.price}</h6>
                                            <p>
                                                Quantidade: {product.quantity}
                                            </p>
                                        </figcaption>
                                        <footer class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                            <a
                                                class="btn btn-secondary mt-auto"
                                                href="#"
                                            >
                                                Editar
                                            </a>
                                            <a
                                                class="btn btn-secondary mt-auto"
                                                target="_blank"
                                                href="#"
                                            >
                                                Deletar
                                            </a>
                                        </footer>
                                    </figure>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">
                        Copyright &copy; Iago Roque
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
