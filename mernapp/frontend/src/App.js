import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Signup from "./screens/Signup";
import MyOrder from "./screens/Order"
import { CartProvider } from "./components/ContextReducer";
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<Signup />} />
          <Route exact path="/myorder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
