import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckOutPage";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/contact" element={<ContactPage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/account" element={<AccountPage />}></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
