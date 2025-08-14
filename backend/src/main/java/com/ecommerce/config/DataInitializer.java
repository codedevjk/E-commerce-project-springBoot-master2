package com.ecommerce.config;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            initializeCategories();
        }
        if (productRepository.count() == 0) {
            initializeProducts();
        }
    }

    private void initializeCategories() {
        List<Category> categories = Arrays.asList(
                new Category("Men", "Men's clothing and accessories"),
                new Category("Women", "Women's clothing and accessories"),
                new Category("Kids", "Children's clothing and accessories"),
                new Category("Electronics", "Electronic devices and gadgets"),
                new Category("Home & Living", "Home decor and living essentials"),
                new Category("Sports", "Sports and fitness equipment"),
                new Category("Beauty", "Beauty and personal care products"),
                new Category("Books", "Books and educational materials")
        );

        categoryRepository.saveAll(categories);
    }

    private void initializeProducts() {
        Category menCategory = categoryRepository.findByName("Men").orElse(null);
        Category womenCategory = categoryRepository.findByName("Women").orElse(null);
        Category electronicsCategory = categoryRepository.findByName("Electronics").orElse(null);

        if (menCategory != null && womenCategory != null && electronicsCategory != null) {
            List<Product> products = Arrays.asList(
                    createProduct("Men's Classic T-Shirt", "Comfortable cotton t-shirt for everyday wear", 
                            new BigDecimal("29.99"), new BigDecimal("24.99"), 17, 100, "Nike", "Blue", "M", 
                            "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg", menCategory),
                    
                    createProduct("Women's Summer Dress", "Elegant summer dress perfect for any occasion", 
                            new BigDecimal("79.99"), new BigDecimal("59.99"), 25, 50, "Zara", "Red", "S", 
                            "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg", womenCategory),
                    
                    createProduct("Wireless Bluetooth Headphones", "High-quality wireless headphones with noise cancellation", 
                            new BigDecimal("199.99"), new BigDecimal("149.99"), 25, 30, "Sony", "Black", "One Size", 
                            "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", electronicsCategory),
                    
                    createProduct("Men's Denim Jeans", "Classic fit denim jeans with premium quality", 
                            new BigDecimal("89.99"), new BigDecimal("69.99"), 22, 75, "Levi's", "Dark Blue", "32", 
                            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg", menCategory),
                    
                    createProduct("Women's Leather Handbag", "Stylish leather handbag with multiple compartments", 
                            new BigDecimal("149.99"), new BigDecimal("119.99"), 20, 25, "Coach", "Brown", "Medium", 
                            "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", womenCategory),
                    
                    createProduct("Smartphone", "Latest smartphone with advanced camera and features", 
                            new BigDecimal("899.99"), new BigDecimal("799.99"), 11, 20, "Samsung", "Black", "128GB", 
                            "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg", electronicsCategory),
                    
                    createProduct("Men's Running Shoes", "Comfortable running shoes for athletic performance", 
                            new BigDecimal("129.99"), new BigDecimal("99.99"), 23, 60, "Adidas", "White", "10", 
                            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", menCategory),
                    
                    createProduct("Women's Yoga Pants", "Flexible and comfortable yoga pants for workouts", 
                            new BigDecimal("49.99"), new BigDecimal("39.99"), 20, 80, "Lululemon", "Black", "M", 
                            "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg", womenCategory)
            );

            productRepository.saveAll(products);
        }
    }

    private Product createProduct(String title, String description, BigDecimal price, BigDecimal discountedPrice,
                                 Integer discountPercent, Integer quantity, String brand, String color, 
                                 String size, String imageUrl, Category category) {
        Product product = new Product();
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        product.setDiscountedPrice(discountedPrice);
        product.setDiscountPercent(discountPercent);
        product.setQuantity(quantity);
        product.setBrand(brand);
        product.setColor(color);
        product.setSize(size);
        product.setImageUrl(imageUrl);
        product.setCategory(category);
        return product;
    }
}