import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import PostJob from "./components/client/PostJob";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/public/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </>
  );
}

export default App;
