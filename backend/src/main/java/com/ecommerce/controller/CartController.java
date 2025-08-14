package com.ecommerce.controller;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.entity.Cart;
import com.ecommerce.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        String userEmail = authentication.getName();
        Cart cart = cartService.getCartByUser(userEmail);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@Valid @RequestBody AddToCartRequest request, 
                                         Authentication authentication) {
        String userEmail = authentication.getName();
        Cart cart = cartService.addToCart(userEmail, request);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long itemId, 
                                              @RequestBody AddToCartRequest request,
                                              Authentication authentication) {
        String userEmail = authentication.getName();
        Cart cart = cartService.updateCartItem(userEmail, itemId, request.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable Long itemId, 
                                              Authentication authentication) {
        String userEmail = authentication.getName();
        Cart cart = cartService.removeFromCart(userEmail, itemId);
        return ResponseEntity.ok(cart);
    }
}