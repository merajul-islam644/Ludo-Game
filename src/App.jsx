import { Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ludoBoard" element={<LudoBoard />} />
      </Routes>
      <BaseModal />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default App;
