import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookId}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4>Total: ${total.toFixed(2)}</h4>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          Continue Browsing
        </button>
        <button className="btn btn-warning" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartPage;
