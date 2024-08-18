package com.iroque.marketplace.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.iroque.marketplace.interfaces.ProductRepository;
import com.iroque.marketplace.models.Product;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void createProduct(Product product) {
        productRepository.save(product);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com o ID: " + id));
    }

    public List<Product> getProductByName(String name) {
        return productRepository.findByName(name);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product updateProduct) {
        Product product = getProduct(id);
        product.setName(updateProduct.getName());
        product.setDescription(updateProduct.getDescription());
        product.setPrice(updateProduct.getPrice());
        product.setQuantity(updateProduct.getQuantity());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new RuntimeException("Produto com ID " + id + " não encontrado.");
        }
        productRepository.deleteById(id);
    }

}
