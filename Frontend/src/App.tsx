// App.tsx
import Signup from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import SideBar from "./components/sidebar/sideBar";

function App() {
  const { authUser } = useAuthContext(); // Get loading state
  
  // Show loading indicator while checking authentication
  // if (loading) {
  //   return (
  //     <div className="h-screen bg-black flex items-center justify-center">
  //       <div className="text-white">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <Navigate to="/chat" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/chat" /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/chat" /> : <Login />}
          />
          <Route
            path="/chat"
            element={authUser ? <SideBar /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;