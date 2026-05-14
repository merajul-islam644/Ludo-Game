import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email) return setError("E-mail is required");
      if (!password) return setError("Password is required");

      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Signup Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);

      setError("Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* BACKGROUND GLOW (same as login) */}
      <div className="absolute top-[-100px] left-[-100px] h-72 w-72 bg-cyan-500/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />

      {/* CARD */}
      <Card className="relative w-full max-w-md border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] rounded-[30px]">
        {/* TOP BAR */}
        <div className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

        {/* TITLE */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-black tracking-[6px] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            SIGN UP
          </CardTitle>

          <p className="text-gray-300 text-sm">Create your Ludo account 🎮</p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-2">
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-cyan-400/20 text-white focus-visible:ring-cyan-400 rounded-xl py-5"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label className="text-gray-300">Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-purple-400/20 text-white focus-visible:ring-purple-400 rounded-xl py-5"
            />
          </div>

          {/* ERROR */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* SIGNUP BUTTON (same style as login button) */}
          <Button
            onClick={handleSignup}
            className="w-full h-14 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            SIGN UP
          </Button>

          {/* LOGIN LINK */}
          <p
            onClick={() => navigate("/")}
            className="text-center text-sm text-cyan-300 hover:underline cursor-pointer"
          >
            Already have an account? Login
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
