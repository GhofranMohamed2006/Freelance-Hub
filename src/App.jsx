import { Routes, Route } from "react-router-dom";

import PostJob from "./components/client/PostJob";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
function App() {
    return (
        <Routes>
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}/>
        </Routes>
    );
}

export default App;