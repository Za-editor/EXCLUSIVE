import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
