$(document).ready(function() {
    // Function to update cart count
    function updateCartCount() {
        var count = localStorage.getItem("cartCount") || 0;
        $(".cart-number").text(count);
    }

    // Function to update cart items
    function updateCartItems() {
        $(".listCart").empty();
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.forEach(function(item) {
            $(".listCart").append(`<div class="item">
                                        <div class="image">
                                            <img src="${item.img}" alt="${item.name}">
                                        </div>
                                        <div class="name">${item.name}</div>
                                        <div class="totalprice">Rs. ${item.price}</div>
                                        <div class="quantity">
                                            <span class="minus">-</span>
                                            <span>${item.quantity}</span>
                                            <span class="plus">+</span>
                                        </div>
                                    </div>`);
        });

        // Calculate and update total price
        var totalPrice = calculateTotalPrice(cartItems);
        $(".total-price").text("Total: Rs. " + totalPrice);
    }

    // Function to calculate total price
    function calculateTotalPrice(cartItems) {
        var totalPrice = 0;
        cartItems.forEach(function(item) {
            totalPrice += (parseFloat(item.price) * parseInt(item.quantity));
        });
        return totalPrice.toFixed(2); // Limit to 2 decimal places
    }

    // Initialize cart count and items
    updateCartCount();
    updateCartItems();

    $(".header-cart").click(function() {
        $(".cartTab").toggleClass("active");
    });

    $(".Close").click(function() {
        $(".cartTab").removeClass("active");
    });

    $(".dish-add-btn").click(function() {
        var itemName = $(this).attr("data-item");
        var itemPrice = $(this).attr("data-price");
        var itemImg = $(this).attr("data-img");

        // Update cart count
        var count = parseInt(localStorage.getItem("cartCount") || 0);
        count++;
        localStorage.setItem("cartCount", count);
        updateCartCount();

        // Update cart items
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        var found = false;
        cartItems.forEach(function(item) {
            if (item.name === itemName) {
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            cartItems.push({
                name: itemName,
                price: itemPrice,
                img: itemImg,
                quantity: 1
            });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartItems();
    });

    $(document).on("click", ".minus", function() {
        var itemName = $(this).closest(".item").find(".name").text();
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.forEach(function(item, index) {
            if (item.name === itemName) {
                if (item.quantity > 1) {
                    item.quantity--;
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartItems();
                } else {
                    cartItems.splice(index, 1);
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartItems();
                }
            }
        });

        // Update cart count
        var count = parseInt(localStorage.getItem("cartCount") || 0);
        if (count > 0) {
            count--;
            localStorage.setItem("cartCount", count);
            updateCartCount();
        }
    });

    $(document).on("click", ".plus", function() {
        var itemName = $(this).closest(".item").find(".name").text();
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.forEach(function(item) {
            if (item.name === itemName) {
                item.quantity++;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                updateCartItems();
            }
        });

        // Update cart count
        var count = parseInt(localStorage.getItem("cartCount") || 0);
        count++;
        localStorage.setItem("cartCount", count);
        updateCartCount();
    });

    // Define the coupon code and discount percentage
    const couponCode = "JEYAVEL10";
    const discountPercentage = 25; 

    // Function to apply coupon code
    $("#applyCoupon").click(function() {
        // Get the entered coupon code
        const enteredCode = $("#couponCode").val().trim();

        // Check if the entered code matches the predefined coupon code
        if (enteredCode === couponCode) {
            // Get the current cart items
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            
            // Calculate the discount amount
            var cartTotal = calculateTotalPrice(cartItems);
            const discountAmount = (cartTotal * discountPercentage) / 100;

            // Apply the discount
            const discountedTotal = cartTotal - discountAmount;

            // Update the total price display with the discounted total
            $(".total-price").html(`<p>Total: Rs. ${discountedTotal.toFixed(2)} (After ${discountPercentage}% discount applied)</p>`);
        } else {
            // Show an error message for invalid coupon code
            $(".total-price").html("<p>Invalid coupon code</p>");
        }
    });

    // Function to handle checkout
    $(".CheckOut").click(function() {
        // Show a confirmation message
        if (confirm("Are you sure you want to proceed to checkout?")) {
            // Proceed with checkout logic
            // Redirect to checkout page or perform other actions
            alert("Order placed successfully!");
            // Clear the cart after placing the order
            localStorage.removeItem("cartCount");
            localStorage.removeItem("cartItems");
            updateCartCount();
            updateCartItems();
        } else {
            // Cancel checkout
            // Do nothing or provide feedback to the user
            console.log("Checkout canceled");
        }
    });
});
