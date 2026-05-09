import LudoBoard from "./ludo-board/LudoBoard";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./dashboard/DashBoard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ludoBoard"
          element={
            <ProtectedRoute>
              <LudoBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default App;
