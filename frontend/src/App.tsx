import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartPage from "./Pages/CartPage";
import BooksPage from "./Pages/BooksPage";
import AdminBooksPage from "./Pages/AdminBooksPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBooksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
}

export default App;