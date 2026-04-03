import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      className="btn btn-dark position-fixed top-0 end-0 m-3"
      onClick={() => navigate("/cart")}
    >
      Cart <span className="badge text-bg-light ms-1">{count}</span> ${total.toFixed(2)}
    </button>
  );
}

export default CartSummary;
