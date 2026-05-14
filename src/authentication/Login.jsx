import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email) return setError("E-mail is required");
      if (!password) return setError("Password is required");

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError("Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* NEON BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] h-72 w-72 bg-cyan-500/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />

      {/* CARD */}
      <Card className="relative w-full max-w-md border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] rounded-[30px]">
        {/* TOP NEON BAR */}
        <div className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-black tracking-[6px] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            LOGIN
          </CardTitle>

          <p className="text-gray-300 text-sm">
            Access your Ludo battlefield 🎮
          </p>
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

          {/* LOGIN BUTTON */}
          <Button
            onClick={handleLogin}
            className="w-full h-14 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            LOGIN
          </Button>

          {/* DIVIDER */}
          <div className="text-center text-gray-400 text-sm">OR</div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-12 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 cursor-pointer flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              {" "}
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />{" "}
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4c-7.3 0-13.6 4.1-17.7 10.7z"
              />{" "}
              <path
                fill="#4CAF50"
                d="M24 44c5.3 0 10.2-2 13.8-5.2l-6.4-5.3C29.4 35.7 26.9 36 24 36c-5.4 0-9.7-3.3-11.3-8l-6.6 5.1C9.9 40.2 16.4 44 24 44z"
              />{" "}
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3.2 5-6.1 6.3l6.4 5.3C38.9 36.7 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
              />{" "}
            </svg>
            Continue with Google
          </Button>

          {/* SIGNUP */}
          <p
            onClick={() => navigate("/signup")}
            className="text-center text-sm text-cyan-300 hover:underline cursor-pointer"
          >
            Don’t have an account? Signup
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
