import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import { Toaster } from "sonner";
import LudoBoard from "./ludo-board/LudoBoard";
import DashBoard from "./dashboard/DashBoard";
import BaseModal from "./modal/BaseModal";

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
      <BaseModal />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default App;
