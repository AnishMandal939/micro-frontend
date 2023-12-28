import { createSignal, onMount } from "solid-js";
import axios from "axios";
import "./Product.css"

export default () => {
    const [products, setProducts] = createSignal([]);
    // list of cart products
    const [cartProducts, setCartProducts] = createSignal([]);
    // username state to show in ui
    const [username, setUsername] = createSignal();
    const login = () => {
        axios.post("https://dummyjson.com/auth/login", { username: "kminchelle", password: "0lelplR", expiresInMins: 60 })
            .then(response => {
                console.log("User logged in:", response.data);
                sessionStorage.setItem("userId", response.data.id);
                setUsername(response?.data?.username);
                console.log(response?.data);
                alert("successfully logged in ")
                window.location.reload();
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    }
    // logout 
    const logout = () => {
        axios.post("https://dummyjson.com/auth/logout", { userId: sessionStorage.getItem("userId") })
            .then(response => {
                console.log("User logged out:", response.data);
                sessionStorage.removeItem("userId");
                alert("successfully logged out")
                window.location.reload();
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    }

    onMount(() => {
        axios.get("https://dummyjson.com/products")
            .then(response => {
                setProducts(response.data?.products);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    });

    const addToCart = (productId) => {
        const userId = sessionStorage.getItem("userId");
        // console.log("userId", userId);
        if (userId) {
            axios.post("https://dummyjson.com/carts/add", { products: [productId], userId })
                .then(response => {
                    return axios.get(`https://dummyjson.com/carts/user/${userId}`);
                })
                .then(response => {
                    console.log("Cart of user:", response.data);
                    if(response?.data){
                        response.data?.carts?.map(cart => {
                            console.log(cart, "cart");
                            const productIds = cart.products.map(product => product.id);
                            return axios.get(`https://dummyjson.com/products`)
                                .then(response => {
                                    console.log("Products in cart:", response.data);
                                    alert("Products in cart: " + JSON.stringify(response.data));
                                    setCartProducts(response.data?.products);
                                })
                                .catch(error => {
                                    console.error("Error fetching products:", error);
                                    alert("Error fetching products");
                                });
                        });

                    }
                })
                .catch(error => {
                    console.error("Error adding product to cart:", error);
                    alert("Error adding product to cart");
                });
        } else {
            alert("Please login to add products to cart");
        }
    };

        


    return (
        <div className="content">
      {/* login and logout */}
      <div className="login-logout">
            {
                sessionStorage.getItem("userId") ? <div>User logged in:
                </div> : <div>User not logged in</div>
            }
            {
                sessionStorage.getItem("userId") ? <div>
                    <button className="border-red-200 border-2 bg-red-700 p-1 rounded-md" onClick={logout}>Logout</button>
                </div> : <div>
                    <button className="border-red-200 border-2 bg-red-700 p-1 rounded-md" onClick={login}>Login</button>
                </div>

            }
        </div>
            {/* cart items */}
            <div className="cart-list h-32 overflow-y-auto bg-yellow-600">
                <p>Cart Items</p>
                {
                    cartProducts().map(product => (
                        <div key={product.id} className="cart-list-card-body my-2 rounded-md">
                            <div className="cart-list-card-body-title">{product.title}</div>
                            <div className="cart-list-card-body-title">{product.price}</div>
                            <div className="cart-list-card-body-title">{product.quantity}</div>
                            <div className="image-card overflow-x-auto">
                            <div className="flex">
                                {product?.images?.map((image) => (
                                    <div className="flex-shrink-0">
                                        <img src={image} alt={product.name} className="w-64 h-64 object-cover mx-2 overflow-hidden rounded-md" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>

           
            {products().map(product => (
                <div key={product.id} className="product-card p-2 m-2 bg-blue-900 text-white d-flex">
                    <div>
                        <p className="title">{product.title}</p>
                        <p className="brand_name">Brand: {product.brand}</p>
                        <p className="category_name">Category: {product.category}</p>
                        <p className="description">{product.description}</p>
                        <div className="image-card overflow-x-auto">
                            <div className="flex">
                                {product?.images?.map((image) => (
                                    <div className="flex-shrink-0">
                                        <img src={image} alt={product.name} className="w-64 h-64 object-cover mx-2 overflow-hidden rounded-md" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>{product.name}</div>
                    <div className="price">Price: ${product.price}</div>
                    <div>Rating: {product.rating}</div>
                    <button className="border-red-200 border-2 bg-red-700 p-1 rounded-md" onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};