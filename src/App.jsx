import { Routes, Route } from "react-router-dom";

import PostJob from "./components/client/PostJob";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Navbar from "./components/navbar/Navbar";
import { Home } from "lucide-react";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
